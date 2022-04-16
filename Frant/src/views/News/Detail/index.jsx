import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions, Tag } from 'antd';
import { useParams, useNavigate } from 'react-router';
import moment from 'moment'
import axios from 'axios';
import { HeartTwoTone } from '@ant-design/icons';

export default function Detail() {
    const { id } = useParams()
    const navigate = useNavigate()
    let [newInfo, setNewInfo] = useState()
    let [liked, setLiked] = useState(false)
    const colors = ['#eb2f96', '#C0C0C0']
    useEffect(() => {
        axios.get('/api/getNewsById', { params: { id } }).then((res) => setNewInfo(res.data))
    }, [id])
    const like = () => {
        if (liked) {
            setLiked(false)
            setNewInfo({ ...newInfo, star: newInfo.star - 1 })
            axios.post('/api/updateNews', { ...newInfo, star: newInfo.star - 1 })
        } else {
            setLiked(true)
            setNewInfo({ ...newInfo, star: newInfo.star + 1 })
            axios.post('/api/updateNews', { ...newInfo, star: newInfo.star + 1 })
        }
    }
    return (
        newInfo ?
            <div style={{ width: '95%', margin: 'auto' }}>
                <PageHeader
                    ghost={false}
                    onBack={() => navigate(-1)}
                    title={newInfo.title}
                    subTitle={
                        <div>
                            <Tag color='cyan'>{newInfo.categoryName}</Tag>
                            <HeartTwoTone twoToneColor={liked ? colors[0] : colors[1]} onClick={like} />
                        </div>
                    }
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="创建者">{newInfo.author}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{moment(newInfo.createTime).format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                        <Descriptions.Item label="发布时间">{newInfo.publishTime === 0 ? '-' : moment(newInfo.publishTime).format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                        <Descriptions.Item label="区域">{newInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="访问数量">{newInfo.view}</Descriptions.Item>
                        <Descriptions.Item label="点赞数量">{newInfo.star}</Descriptions.Item>
                        <Descriptions.Item label="评论数量">{0}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                <div dangerouslySetInnerHTML={{ __html: newInfo.content }} style={{ backgroundColor: 'aliceblue' }}></div>
            </div> : <div></div>
    )
}
