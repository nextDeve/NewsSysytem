import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import axios from 'axios';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function RightList() {
  let [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      render: (title) => {
        return <Tag color="#87d068">{title}</Tag>
      }
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color='geekblue'>{key}</Tag>
      }
    },
    {
      title: '是否可用',
      dataIndex: 'pagepermisson',
      render: (pagepermisson) => {
        return pagepermisson === 1 ? <Tag color='green'>True</Tag> : <Tag color='volcano'>False</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        const deleteRight = () => {
          confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
              axios.post('/api/deleteRightList', { id: item.id })
              if (item.grade === 1) {
                setDataSource(dataSource.filter(data => data.id !== item.id))
              } else {
                let list = dataSource.filter(data => data.id === item.rightId)
                list[0].children = list[0].children.filter(data => data.id !== item.id)
                setDataSource([...dataSource])
              }
            },
          });
        }
        const changePagePermisson = () => {
          axios.post('/api/changePermission', { id: item.id, value: item.pagepermisson === 1 ? 0 : 1 })
          if (item.grade === 1) {
            setDataSource(dataSource.map(data => {
              if (data.id === item.id) {
                data.pagepermisson = item.pagepermisson === 1 ? 0 : 1
              }
              return data
            }))
          } else {
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].children = list[0].children.map(data => {
              if (data.id === item.id) {
                data.pagepermisson = item.pagepermisson === 1 ? 0 : 1
              }
              return data
            })
            setDataSource([...dataSource])
          }
        }
        return <div>
          <Popover content={<div style={{ textAlign: 'center' }}>
            <Switch checked={item.pagepermisson} onChange={changePagePermisson} /></div>
          } title="页面配置项" trigger={item.pagepermisson === undefined ? '' : 'click'} >
            <Button type='primary' icon={<EditOutlined />}
              style={{ marginRight: '10px' }}
              disabled={item.pagepermisson === undefined}>
            </Button>
          </Popover>
          <Button type='danger' icon={<DeleteOutlined />} onClick={deleteRight}></Button>
        </div>
      }
    }
  ];
  useEffect(() => {
    axios.get('/api/getMenuList').then((response) => {
      setDataSource(response.data)
    }).catch((error) => {
      console.log('get rights info fail', error);
    })
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
    </div>
  )
}
