import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import NewsSandBox from '../views/NewsSandBox'
import News from '../views/News'
import Detail from '../views/News/Detail'
export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/news/detail/:id' element={<Detail />}></Route>
        <Route path='/*' element={
          localStorage.getItem('token') ? <NewsSandBox /> : <Navigate to='/login' />
        }></Route>
      </Routes>
    </HashRouter>
  )
}

