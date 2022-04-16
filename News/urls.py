"""News URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from NewsSand import views

urlpatterns = [

    path('', views.index),
    path('api/getMenuList', views.getMenuList),
    path('api/deleteRightList', views.deleteRightList),
    path('api/changePermission', views.changePermission),
    path('api/getRoleList', views.getRoleList),
    path('api/deleteRole', views.deleteRole),
    path('api/changeRoleRights', views.changeRoleRights),
    path('api/getUserInfo', views.getUserInfo),
    path('api/deleteUser', views.deleteUser),
    path('api/getRegionInfo', views.getRegionInfo),
    path('api/changeUserState', views.changeUserState),
    path('api/addUser', views.addUser),
    path('api/updateUser', views.updateUser),
    path('api/userVerify', views.userVerify),
    path('api/getMenuByRoleId', views.getMenuByRoleId),
    path('api/getAllRoute', views.getAllRoute),
    path('api/getUserRightsById', views.getUserRightsById),
    path('api/getCategories', views.getCategories),
    path('api/addNews', views.addNews),
    path('api/getState0NewsByAuthor', views.getState0NewsByAuthor),
    path('api/deleteNewsById', views.deleteNewsById),
    path('api/updateNews', views.updateNews),
    path('api/getNewsByAuthor', views.getNewsByAuthor),
    path('api/updatePublishState', views.updatePublishState),
    path('api/getNewsToAudit', views.getNewsToAudit),
    path('api/updateCategory', views.updateCategory),
    path('api/deleteCategory', views.deleteCategory),
    path('api/getNewsByStateAndRight', views.getNewsByStateAndRight),
    path('api/getNewsBySortType', views.getNewsBySortType),
    path('api/getCountInfo', views.getCountInfo),
    path('api/getCountInfoByAuthor', views.getCountInfoByAuthor),
    path('api/getPublishNews', views.getPublishNews),
    path('api/getNewsById', views.getNewsById),
]
