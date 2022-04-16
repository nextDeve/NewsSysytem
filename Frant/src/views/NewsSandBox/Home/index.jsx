import React, { useEffect, useState, Fragment, createRef } from 'react'
import { Row, Col, Card, Avatar, List, Drawer, Tag } from 'antd'
import { EditOutlined, EllipsisOutlined, BarChartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom'
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
const { Meta } = Card;
echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer, TitleComponent, PieChart, LabelLayout, LegendComponent]);

export default function Home() {
    const { username, roleType, region } = JSON.parse(localStorage.getItem('token'))
    let [viewList, setViewList] = useState([])
    let [likeList, setLikeList] = useState([])
    let [visible, setVisible] = useState(false);
    let [countInfo, setConuntInfo] = useState([])
    let [pieInfo, setPieInfo] = useState([])
    let [myChart, setMyChart] = useState()
    let [pieChart, setPieChart] = useState()
    const barDemo = createRef()
    const PieDemo = createRef()
    useEffect(() => {
        axios.get('/api/getNewsBySortType', { params: { sortType: 1 } }).then((res) => {
            setViewList(res.data)
        })
        axios.get('/api/getNewsBySortType', { params: { sortType: 2 } }).then((res) => {
            setLikeList(res.data)
        })
        axios.get('/api/getCountInfo').then((res) => {
            setConuntInfo(res.data)
        })
        axios.get('/api/getCountInfoByAuthor', { params: { author: username } }).then((res) => {
            setPieInfo(res.data)
        })
    }, [username])
    useEffect(() => {
        const option = {
            title: {
                text: '新闻分类图示'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    name: '类别',
                    data: countInfo.x,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '数量/篇',
                    minInterval: 1
                }
            ],
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    barWidth: '60%',
                    data: countInfo.y
                }
            ]
        };
        if (myChart === undefined) {
            setMyChart(echarts.init(barDemo.current))
        }
        if (myChart) myChart.setOption(option, true);
    }, [countInfo, barDemo, myChart])
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    window.onresize = () => {
        myChart.resize()
    }
    const showPie = () => {
        let Chart;
        const option = {
            title: {
                text: '当前用户新闻分类图示',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '发布数量',
                    type: 'pie',
                    radius: '50%',
                    data: pieInfo,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        if (pieChart === undefined) {
            Chart = echarts.init(PieDemo.current)
            setPieChart(Chart)
        }
        if (Chart) Chart.setOption(option, true)
    }
    return (
        <Fragment>
            <Row gutter={10}>
                <Col span={8} >
                    <Card title="用户最常浏览" >
                        <List
                            dataSource={viewList}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={`/news-manage/preview/${item.id}`} state={item}>{item.title}</Link>
                                    <Tag color='cyan'>{item.view}</Tag>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" >
                        <List
                            dataSource={likeList}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={`/news-manage/preview/${item.id}`} state={item}>{item.title}</Link>
                                    <Tag color='purple'>{item.star}</Tag>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <BarChartOutlined key="setting" onClick={showDrawer} />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={username}
                            description={`${region === '' ? '全球' : region}  ${roleType}`} />
                    </Card>,
                </Col>
            </Row>
            <div style={{ height: '500px', width: '100%' }} ref={barDemo}></div>
            <Drawer title="统计信息" placement="right" onClose={onClose} visible={visible} width={600} afterVisibleChange={showPie}>
                <div style={{ height: '100%', width: '100%' }} ref={PieDemo}></div>
            </Drawer>
        </Fragment>
    )
}
