import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, notification } from 'antd'
import axios from 'axios';
import { DeleteOutlined, EditOutlined, ToTopOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
const { confirm } = Modal
export default function NewsDraft() {
    let [dataSource, setDataSource] = useState([])
    let navigate = useNavigate()
    const { username } = JSON.parse(localStorage.getItem('token'))
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
                const deleteNew = () => {
                    confirm({
                        title: '确定要删除吗？',
                        icon: <ExclamationCircleOutlined />,
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            axios.post('/api/deleteNewsById', { id: item.id }).then(() => {
                                setDataSource(dataSource.filter(data => data.id !== item.id))
                                notification.info({
                                    message: '删除成功！',
                                    placement: 'topRight',
                                });
                            })
                        },
                    });
                }
                const publish = () => {
                    axios.post('/api/updateNews', { ...item, auditState: 1 }).then(() => {
                        setDataSource(dataSource.filter(data => data.id !== item.id))
                        notification.info({
                            message: '发布成功，等待审核！',
                            placement: 'topRight',
                        });
                    })
                }
                const goEdit = () => {
                    navigate(`/news-manage/update/${item.id}`, { state: item })
                }
                return <div>
                    <Button type='primary' icon={<EditOutlined />}
                        style={{ marginRight: '10px' }} onClick={goEdit}>
                    </Button>
                    <Button type='danger' icon={<DeleteOutlined />}
                        style={{ marginRight: '10px' }} onClick={deleteNew}
                    >
                    </Button>
                    <Button type='primary' onClick={publish} icon={<ToTopOutlined />}></Button>
                </div>
            }
        }
    ];
    useEffect(() => {
        axios.post('/api/getState0NewsByAuthor', { author: username }).then((res) => {
            setDataSource(res.data)
        })
    }, [username])
    return (
        <div>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} rowKey='id' />
        </div>)
}
