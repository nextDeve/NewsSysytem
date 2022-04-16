import axios from 'axios'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd';
import { connect } from 'react-redux'
const Home = lazy(() => import('../../views/NewsSandBox/Home'))
const UserList = lazy(() => import('../../views/NewsSandBox/user-manage/UserList'))
const RoleList = lazy(() => import('../../views/NewsSandBox/right-manage/RoleList'))
const RightList = lazy(() => import('../../views/NewsSandBox/right-manage/RightList'))
const NoPermission = lazy(() => import('../../views/NewsSandBox/NoPermission'))
const NewsAdd = lazy(() => import('../../views/NewsSandBox/news-manage/NewsAdd'))
const NewsDraft = lazy(() => import('../../views/NewsSandBox/news-manage/NewsDraft'))
const NewsCategory = lazy(() => import('../../views/NewsSandBox/news-manage/NewsCategory'))
const Audit = lazy(() => import('../../views/NewsSandBox/audit-manage/Audit'))
const AuditList = lazy(() => import('../../views/NewsSandBox/audit-manage/AuditList'))
const Unpublished = lazy(() => import('../../views/NewsSandBox/publish-manage/Unpublished'))
const Published = lazy(() => import('../../views/NewsSandBox/publish-manage/Published'))
const Sunset = lazy(() => import('../../views/NewsSandBox/publish-manage/Sunset'))
const NewsPreview = lazy(() => import('../../views/NewsSandBox/news-manage/NewsPreview'))
const NewsUpdate = lazy(() => import('../../views/NewsSandBox/news-manage/NewsUpdate'))
const LocalRouterMap = {
    '/home': <Home></Home>,
    '/user-manage/list': <UserList></UserList>,
    '/right-manage/role/list': <RoleList></RoleList>,
    '/right-manage/right/list': <RightList></RightList>,
    "/news-manage/add": <NewsAdd></NewsAdd>,
    "/news-manage/draft": <NewsDraft></NewsDraft>,
    "/news-manage/category": <NewsCategory></NewsCategory>,
    "/news-manage/preview/:id": <NewsPreview></NewsPreview>,
    '/news-manage/update/:id': <NewsUpdate></NewsUpdate>,
    "/audit-manage/audit": <Audit></Audit>,
    "/audit-manage/list": <AuditList></AuditList>,
    "/publish-manage/unpublished": <Unpublished></Unpublished>,
    "/publish-manage/published": <Published></Published>,
    "/publish-manage/sunset": <Sunset></Sunset>,
}
function NewsRouter(props) {
    let [routeList, setRouteList] = useState([])
    let [rightList, setRightList] = useState([])
    let { roleId } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get('/api/getAllRoute').then((res) => {
            setRouteList(res.data)
        })
        axios.post('/api/getUserRightsById', { id: roleId }).then((res) => {
            setRightList(res.data)
        })
    }, [roleId])
    const checkRouter = (item) => {
        return LocalRouterMap.hasOwnProperty(item.key) && (item.pagepermisson || item.routepermisson)
    }
    const checkPermission = (item) => {
        return rightList.includes(item.key)
    }
    return (
        <Suspense>
            <Spin spinning={props.isLoding}>
                <Routes>
                    {
                        routeList.map((route) => {
                            if (checkRouter(route) && checkPermission(route))
                                return <Route path={route.key} element={LocalRouterMap[route.key]} key={route.key}></Route>;
                            else return null;
                        })
                    }
                    <Route path='/' element={<Navigate to='/home' />}></Route>
                    <Route path='*' element={<NoPermission />}></Route>
                </Routes>
            </Spin>
        </Suspense>
    )
}
const mapStateToProps = (state) => ({ isLoding: state.newsBox.isLoding })
export default connect(mapStateToProps)(NewsRouter)
