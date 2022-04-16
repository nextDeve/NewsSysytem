import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
let { confirm } = Modal
export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [current, setCurrent] = useState([])
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    axios.get('/api/getRoleList').then((response) => {
      setDataSource(response.data)
    }).catch(() => console.log('Get roleList failed'))

    axios.get('/api/getMenuList').then((response) => {
      setTreeData(response.data)
    }).catch(error => console.log('get rights info fail', error))
  }, [])
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '操作',
      render: (item) => {
        const deleteRole = () => {
          confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
              axios.post('/api/deleteRole', { id: item.id }).then(() => {
                setDataSource(dataSource.filter(data => data.id !== item.id))
              }).catch(() => console.log('Delete role failed'))
            },
          });
        }
        const handleOk = () => {
          setIsShow(false)
          let list = dataSource.filter(data => data.id === currentId)
          list[0].rights = current
          setDataSource([...dataSource])
          axios.post('/api/changeRoleRights', { id: currentId, rights: current })
            .catch(error => console.log('change role rights failed'))
        }
        const handleCancel = () => {
          setIsShow(false)
        }
        const onCheck = (keys) => {
          setCurrent(keys.checked)
        }
        return <div>
          <Button type='primary' icon={<EditOutlined />}
            style={{ marginRight: '10px' }}
            onClick={() => {
              setIsShow(true)
              setCurrent(item.rights)
              setCurrentId(item.id)
            }}>
          </Button>
          <Button type='danger' icon={<DeleteOutlined />} onClick={deleteRole}></Button>
          <Modal title="权限分配" visible={isShow} onOk={handleOk} onCancel={handleCancel}>
            <Tree treeData={treeData} checkable checkedKeys={current} onCheck={onCheck} checkStrictly></Tree>
          </Modal>
        </div>
      }
    }
  ]
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id}></Table>
    </div>
  )
}
