import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, notification } from 'antd'
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
const { confirm } = Modal


export default function UpdateNewsPublishState(props) {
    let [dataSource, setDataSource] = useState([])
    const { username, region, roleId } = JSON.parse(localStorage.getItem('token'))
    const stateMap = {
        2: '下线',
        1: '发布',
        3: '上线'
    }
    useEffect(() => {
        axios.post('/api/getNewsByStateAndRight', { username, region, roleId, publishState: props.publishState }).then((res) => {
            setDataSource(res.data)
        })
    }, [username, region, roleId, props.publishState])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 240,
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            width: 480,
            render: (title, item) => {
                return <Link to={`/news-manage/preview/${item.id}`} state={item}>{title}</Link>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '分类',
            dataIndex: 'categoryName',
        },
        {
            title: '操作',
            render: (item) => {
                const updateNew = () => {
                    confirm({
                        title: `确定要${stateMap[props.publishState]}吗？`,
                        icon: <ExclamationCircleOutlined />,
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            let newState = props.publishState === 2 ? { publishState: 3 } : { publishState: 2, publishTime: Date.now() }
                            axios.post('/api/updateNews', { ...item, ...newState }).then(() => {
                                setDataSource(dataSource.filter(data => data.id !== item.id))
                                notification.info({
                                    message: `${stateMap[props.publishState]}成功！`,
                                    placement: 'topRight',
                                });
                            })
                        },
                    });
                }

                return <div>
                    <Button type='primary' style={{ marginRight: '10px' }} onClick={updateNew}>
                        {stateMap[props.publishState]}
                    </Button>
                </div>
            }
        }
    ];
    return (
        <div>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} rowKey='id' />
        </div>)
}
