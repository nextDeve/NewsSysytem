import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { Button, Switch, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../../components/UserForm'
const { confirm } = Modal
export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [roles, setRoles] = useState([])
  const [regions, setRegions] = useState([])
  const [currentItem, setCurrentItem] = useState({})
  const AddRef = React.createRef()
  const EditRef = React.createRef()
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      },
      filters: [{
        text: '全球',
        value: ''
      }, ...regions.map((item) => ({
        text: item.title,
        value: item.value
      }))],
      onFilter: (value, item) => item.region === value
    },
    {
      title: '角色名称',
      dataIndex: 'roleType'
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        const changeState = (checked) => {
          let list = dataSource.filter((data) => data.id === item.id)
          list[0].roleState = checked
          axios.post('/api/changeUserState', { id: item.id, value: checked }).then(() => setDataSource([...dataSource]))
        }
        return <Switch checked={roleState} disabled={item.default} onChange={changeState}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        const deleteUser = () => {
          confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
              axios.post('/api/deleteUser', { id: item.id }).then(() => {
                setDataSource(dataSource.filter(data => data.id !== item.id))
              }).catch(() => console.log('Delete role failed'))
            },
          });
        }
        const editUser = () => {
          setIsEditVisible(true)
          setCurrentItem({ ...item })
        }
        return <div>
          <Button type='primary' icon={<EditOutlined />}
            style={{ marginRight: '10px' }}
            disabled={item.default}
            onClick={editUser}
          >
          </Button>
          <Button type='danger' icon={<DeleteOutlined />} onClick={deleteUser} disabled={item.default}></Button>
        </div>
      }
    }
  ]

  const { roleId, region } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.post('/api/getUserInfo', { roleId: roleId, region: region }).then(res => setDataSource(res.data))
    axios.get('/api/getRoleList').then(res => setRoles(res.data))
    axios.get('/api/getRegionInfo').then(res => setRegions(res.data))
  }, [roleId, region])
  const handleAddOk = () => {
    AddRef.current.validateFields().then(res => {
      setIsAddVisible(false)
      let newUser = { ...res, id: nanoid(), roleState: true, default: false }
      axios.post('/api/addUser', newUser)
      let roleType = roles.filter(data => data.id === newUser.roleId)[0].roleName
      setDataSource([...dataSource, { ...newUser, roleType }])
    }).catch(error => console.log(error))
  }
  const handleAddCancel = () => {
    setIsAddVisible(false)
  }
  const handleEditOk = () => {
    EditRef.current.validateFields().then((value) => {
      let newUser = { ...currentItem, ...value }
      setDataSource(dataSource.map((item) => {
        if (item.id === currentItem.id) return newUser;
        else return item
      }))
      setIsEditVisible(false)
      axios.post('/api/updateUser', newUser)
    })
  }
  const handleEditCancel = () => setIsEditVisible(false)
  return (
    <div>
      <Button type='primary' style={{ marginBottom: '10px' }} onClick={() => setIsAddVisible(true)}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 5 }}></Table>

      <Modal title="添加用户" visible={isAddVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
        <UserForm roles={roles} regions={regions} ref={AddRef}></UserForm>
      </Modal>

      <Modal title="修改用户" visible={isEditVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
        <UserForm roles={roles} regions={regions} ref={EditRef} item={currentItem}></UserForm>
      </Modal>
    </div>
  )
}
