import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table, notification } from 'antd'
export default function Audit() {
  const { region, roleId } = JSON.parse(localStorage.getItem('token'))
  let [news, setNews] = useState([])
  useEffect(() => {
    axios.get('/api/getNewsToAudit', { params: { roleId, region } }).then((res) => {
      setNews(res.data)
      console.log(res);
    })
  }, [region, roleId])
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
      title: '操作',
      render: (item) => {
        const handelUpdate = (state) => {
          let publishState = state === 2 ? 1 : 0
          axios.post('./api/updateNews', { ...item, auditState: state, publishState }).then(() => {
            notification.info({
              message: '审核成功！',
              placement: 'topRight',
            });
            setNews(news.filter((data) => data.id !== item.id))
          })
        }
        return <div>
          <Button type='danger' style={{ marginRight: '10px' }} onClick={() => handelUpdate(3)}>驳回</Button>
          <Button type='primary' onClick={() => handelUpdate(2)}>通过</Button>
        </div>
      }
    }
  ]
  return (
    <Table dataSource={news} columns={columns} rowKey={item => item.title} pagination={{ pageSize: 5 }}></Table>
  )
}
