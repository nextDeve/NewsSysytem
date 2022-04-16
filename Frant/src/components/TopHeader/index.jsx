import React from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import {connect} from 'react-redux'
import {changeMenuState} from '../../redux/actions/newsbox'
import { MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons';
const { Header } = Layout
function TopHeader(props) {
    let { username, roleType } = JSON.parse(localStorage.getItem('token'))
    const toggle = () => {
        props.changeState(!props.isClose)
    };
    let navigate = useNavigate()
    const exit = () => {
        localStorage.clear()
        navigate('/login')
    }
    const menu = (
        <Menu>
            <Menu.Item key={1}>
                <span>{roleType}</span>
            </Menu.Item>
            <Menu.Item danger key={2} onClick={exit}>退出</Menu.Item>
        </Menu>
    );
    return (
        <Header className="site-layout-background" style={{ padding: '0px 24px' }}>
            {
                props.isClose ? <MenuUnfoldOutlined onClick={toggle} /> : <MenuFoldOutlined onClick={toggle} />
            }
            <span style={{ marginLeft: '20px' }}>首页</span>
            <div style={{ float: 'right' }}>
                <span style={{ marginRight: '10px' }}>欢迎{username}回来</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" src="https://joeschmoe.io/api/v1/random"/>
                </Dropdown>
            </div>
        </Header>
    )
}
const mapStateToProps=state=>({isClose:state.newsBox.isClose})
const mapDispatchToProps=dispatch=>({
    changeState:(isClose)=>dispatch(changeMenuState(isClose))
})
export default connect(mapStateToProps,mapDispatchToProps)(TopHeader)
