import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom';
import {connect} from 'react-redux'
import './index.css'
const { Sider } = Layout
const { Item, SubMenu } = Menu
function SideMenu(props) {
    let navigate = useNavigate()
    let location = useLocation()
    let [munu, setMenu] = useState([])
    let { roleId } = JSON.parse(localStorage.getItem('token'))
    const go = (event) => {
        navigate(event.key)
    }
    const checkPermission = (item) => {
        return item.pagepermisson === 1
    }
    useEffect(() => {
        axios.post('/api/getMenuByRoleId', { id: roleId }).then((response) => {
            setMenu(response.data)
        })
    }, [roleId])
    const renderMenu = (menuList) => {
        return menuList.map((item) => {
            if (item.children) {
                return <SubMenu key={item.key} title={item.title} icon={item.icon}>
                    {
                        item.children.map((child) => {
                            if (checkPermission(child)) {
                                return <Item key={child.key} onClick={go}>
                                    {child.title}
                                </Item>
                            }else return null;
                        })
                    }
                </SubMenu>
            } else {
                return <Item key={item.key} icon={item.icon} onClick={go}>{item.title}</Item>
            }
        })
    }
    return (
        <Sider trigger={null} collapsible collapsed={props.isClose}>
            <div style={{ display: 'flex', height: '100%', "flexDirection": 'column' }}>
                <div className="logo" >全球新闻发布系统</div>
                <div style={{ flex: 1, 'overflow': 'auto' }}>
                    <Menu theme="dark" mode="inline"
                        selectedKeys={[location.pathname]}
                        defaultOpenKeys={[`/${location.pathname.split('/')[1]}`]}>
                        {renderMenu(munu)}
                    </Menu>
                </div>
            </div>
        </Sider>
    )
}
const mapStateToProps=(state)=>({isClose:state.newsBox.isClose})
export default connect(mapStateToProps)(SideMenu)
