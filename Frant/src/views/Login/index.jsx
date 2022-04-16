import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import './index.css'
import axios from 'axios';
export default function Login() {
  let navigate = useNavigate()
  const onFinish = (values) => {
    axios.post('/api/userVerify', values).then((res) => {
      if (res.data.code === 200) {
        localStorage.setItem('token', JSON.stringify(res.data.user))
        navigate('/home')
      } else {
        message.error(res.data.msg)
      }
    })
  };
  return (
    <div style={{ background: 'rgba(35,39,65)', height: "100%" }}>
      <div className='formContainer'>
        <div className='login-title'>全球新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
