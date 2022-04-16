import React, { useEffect } from 'react'
import { PageHeader, Descriptions, Tag } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment'
export default function NewsPreview() {
    let location = useLocation()
    let navigate = useNavigate()
    let { state } = location
    useEffect(() => {
        if (!state) navigate('/home')
    }, [state,navigate])
    const auditStateMap = {
        0: '未审核',
        1: '审核中',
        2: '已通过',
        3: '未通过'
    }
    const publishStateMap = {
        0: '未发布',
        1: '待发布',
        2: '已上线',
        3: '已下线'
    }
    return (state ? <div>
        <PageHeader
            ghost={false}
            onBack={() => navigate(-1)}
            title={state.title}
        >
            <Descriptions size="small" column={3}>
                <Descriptions.Item label="创建者">{state.author}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{moment(state.createTime).format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{state.publishTime === 0 ? '-' : moment(state.publishTime).format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>

                <Descriptions.Item label="区域">{state.region}</Descriptions.Item>
                <Descriptions.Item label="审核状态" style={{ color: 'red' }}>
                    <Tag color="red">  {auditStateMap[state.auditState]}</Tag>

                </Descriptions.Item>
                <Descriptions.Item label="发布状态" style={{ color: 'red' }}>
                    <Tag color="red">  {publishStateMap[state.publishState]}</Tag>

                </Descriptions.Item>

                <Descriptions.Item label="访问数量">{state.view}</Descriptions.Item>
                <Descriptions.Item label="点赞数量">{state.star}</Descriptions.Item>
                <Descriptions.Item label="评论数量">{0}</Descriptions.Item>
            </Descriptions>
        </PageHeader>
        <div dangerouslySetInnerHTML={{ __html: state.content }} style={{backgroundColor:'aliceblue' }}></div>
    </div>
        : <div></div>
    )
}
