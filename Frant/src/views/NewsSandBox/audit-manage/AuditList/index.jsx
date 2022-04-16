import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table, notification, Tag } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function AuditList() {
  let navigate = useNavigate()
  const { username } = JSON.parse(localStorage.getItem('token'))
  let [news, setNews] = useState([])
  const auditStateMap = {
    1: ['审核中', 'orange'],
    2: ['已通过', 'green'],
    3: ['未通过', 'red']
  }
  const buttonMap = {
    1: '撤销',
    2: '发布',
    3: '修改',
  }
  useEffect(() => {
    axios.get('/api/getNewsByAuthor', { params: { author: username } }).then((res) => {
      setNews(res.data)
    })
  }, [username])
  const columns = [
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
      dataIndex: 'author'
    },
    {
      title: '新闻分类',
      dataIndex: 'categoryName'
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        return <Tag color={auditStateMap[auditState][1]}>{auditStateMap[auditState][0]}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        const publish = () => {
          axios.post('/api/updatePublishState', { id: item.id, publishState: 2, publishTime: Date.now() }).then(() => {
            notification.info({
              message: '发布成功！',
              placement: 'topRight',
            });
            setNews(news.filter((data) => data.id !== item.id))
          })
        }
        const edit = () => {
          navigate(`/news-manage/update/${item.id}`, { state: item })
        }
        const backout = () => {
          confirm({
            title: '确定要撤销吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
              axios.post('/api/updateNews', { ...item, auditState: 0 }).then(() => {
                notification.info({
                  message: '撤销成功，已放入草稿箱！',
                  placement: 'topRight',
                });
                setNews(news.filter((data) => data.id !== item.id))
              })
            },
          });
        }
        switch (item.auditState) {
          case 1:
            return <Button type='danger' onClick={backout}>{buttonMap[1]}</Button>
          case 2:
            return <Button danger onClick={publish}>{buttonMap[2]}</Button>
          case 3:
            return <Button type='primary' onClick={edit}>{buttonMap[3]}</Button>
          default:
            return <Tag>未知错误</Tag>
        }
      }
    }
  ]
  return (
    <Table dataSource={news} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 5 }}></Table>
  )
}