import { forwardRef, useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select
const UserForm = forwardRef((props, ref) => {
    const [isDisable, setIsDisable] = useState(false)

    const { item, regions, roles } = props
    const { roleId, region } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        setIsDisable(roleId === 1 ? false : true)
        if (ref) { ref.current.setFieldsValue(item) }
        if (!item) { ref.current.setFieldsValue({ region }) }
    }, [item, ref, roleId, region])

    const checkAdduserRoleTypeRights = (id) => {
        if (roleId === 1) return false
        else {
            if (roleId < id) return false
            else return true
        }
    }
    return (
        <Form layout='vertical' ref={ref}>
            <Form.Item name='username' label='用户名' rules={[{ required: true }]} >
                <Input></Input>
            </Form.Item>
            <Form.Item name='password' label='密码' rules={[{ required: true }]} >
                <Input ></Input>
            </Form.Item>
            <Form.Item name='region' label='地区' rules={isDisable ? [] : [{ required: true }]} >
                <Select disabled={isDisable} >
                    {regions.map((item) => {
                        return <Option value={item.value} key={item.id}> {item.title}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item name='roleId' label='角色' rules={[{ required: true }]} >
                <Select onChange={(value) => {
                    if (value === 1) {
                        setIsDisable(true)
                        ref.current.setFieldsValue({ region: '' })
                    }
                    else {
                        if (roleId !== 1) setIsDisable(true)
                        else setIsDisable(false)
                    }
                }}>
                    {roles.map((item) => {
                        return <Option value={item.roleType} key={item.id} disabled={checkAdduserRoleTypeRights(item.roleType)}>
                            {item.roleName}
                        </Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
    )
})
export default UserForm

