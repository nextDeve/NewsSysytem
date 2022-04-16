import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd';
import { Link } from 'react-router-dom'
export default function News() {
    let [news, setNews] = useState([])
    let [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('/api/getPublishNews').then((res) => {
            setNews(res.data)
        })
        axios.get('/api/getCategories').then((res) => {
            setCategory(res.data)
        })
    }, [])
    return (
        <div>
            <PageHeader
                title="全球大新闻"
                subTitle="查看新闻"
            />
            <Row gutter={[16, 16]}>
                {
                    category.map((item) => {
                        return <Col span={8} key={item.id}>
                            <Card title={item.value} bordered={true} hoverable={true} >
                                {
                                    <List
                                        dataSource={news.filter(data => data.categoryId === item.id)}
                                        renderItem={data => (
                                            <List.Item>
                                                <Link to={`/news/detail/${data.id}`}>{data.title}</Link>
                                            </List.Item>
                                        )}
                                        pagination={{ pageSize: 3 }}
                                        style={{ height: '200px' }}
                                    />
                                }
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </div>
    )
}
