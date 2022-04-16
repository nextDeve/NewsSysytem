import React, { useEffect, useState, createRef } from 'react'
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import NewsEditer from '../../../../components/NewsEditer';
const { Step } = Steps;
const { Option } = Select
export default function NewsUpdate() {
    let [current, setCurrent] = useState(0);
    let location = useLocation()
    let [categories, setCategories] = useState([]);
    let [news, setNews] = useState(location.state)
    let form1Ref = createRef()
    let navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/getCategories').then((res) => {
            setCategories(res.data)
        })
    }, [])

    const handleNext = () => {
        if (current === 0) {
            form1Ref.current.validateFields().then((value) => {
                setNews({ ...news, ...value })
                setCurrent(current + 1)
            }).catch(() => { console.log('error') })
        } else {
            if (news.content === '' || news.content.trim() === '<p></p>') {
                message.error('新闻内容不能为空！')
            }
            else setCurrent(current + 1)
        }
    }
    const handlePrevious = () => {
        setCurrent(current - 1)
    }
    const handleSave = (state) => {
        axios.post('/api/updateNews', { ...news, auditState: state }).then(() => {
            notification.info({
                message: '提交/保存成功！',
                placement: 'topRight',
            });
            navigate(state === 0 ? '/news-manage/draft' : '/audit-manage/list')
        })
    }
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
    };
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻主体" description="新闻主题内容" />
                <Step title="新闻提交" description="保存草稿或提交审核" />
            </Steps>
            <div style={{ display: current === 0 ? 'block' : 'none', marginTop: '20px' }}>
                <Form {...layout} ref={form1Ref} initialValues={news}>
                    <Form.Item label="新闻标题" name="title" rules={[{ required: true, message: '请输入标题！' }]} >
                        <Input />
                    </Form.Item>

                    <Form.Item label="新闻分类" name="categoryId" rules={[{ required: true, message: '请选择新闻分类' }]}>
                        <Select >
                            {categories.map((item) => <Option value={item.id} key={item.id}>{item.title}</Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ display: current === 1 ? 'block' : 'none', marginTop: '20px', height: '350px' }}>
                <NewsEditer getContent={(value) => { setNews({ ...news, content: value }) }}
                    content={news.content}
                >
                </NewsEditer>
            </div>
            <div style={{ display: current === 2 ? 'block' : 'none' }}></div>
            <div style={{ marginTop: '80px', }}>
                {
                    current < 2 && <Button type='primary' onClick={handleNext}>下一步</Button>
                }
                {
                    current === 2 && <Button type='primary' onClick={() => { handleSave(0) }}>保存草稿</Button>
                }
                {
                    current === 2 && <Button type='danger' onClick={() => { handleSave(1) }}>提交审核</Button>
                }
                {
                    current > 0 && <Button onClick={handlePrevious}>上一步</Button>
                }
            </div>
        </div>
    )
}