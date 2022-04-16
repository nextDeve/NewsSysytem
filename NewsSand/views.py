from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
import json

with open('data.json', encoding='utf-8') as f:
    data = json.load(f)


def index(request):
    return render(request, 'index.html')


# 获取菜单列表
def getMenuList(request):
    rights = data['rights']
    for index, right in enumerate(rights):
        child = []
        for c in data['children']:
            if c['rightId'] == right['id'] and c['key']:
                child.append(c)
        if len(child) > 0:
            rights[index]['children'] = child
    return JsonResponse(rights, safe=False)


# 根据角色ID获取相应菜单
def getMenuByRoleId(request):
    id = json.loads(request.body)['id']
    role_rights = None
    for role in data['roles']:
        if int(role['roleType']) == int(id):
            role_rights = role['rights']
            break
    rights = data['rights']
    for index, right in enumerate(rights):
        child = []
        for c in data['children']:
            if c['rightId'] == right['id'] and c['key'] in role_rights:
                child.append(c)
        if len(child) > 0:
            rights[index]['children'] = child
    resRights = []
    for right in rights:
        if right['key'] in role_rights:
            resRights.append(right)
    return JsonResponse(resRights, safe=False)


# 更新权限列表
def deleteRightList(request):
    id = json.loads(request.body)['id']
    rights = data['rights']
    children = data['children']
    new_right, new_children = [], []
    for right in rights:
        if int(right['id']) != int(id):
            new_right.append(right)
    for c in children:
        if int(c['id']) != int(id):
            new_children.append(c)
    data['rights'], data['children'] = new_right, new_children
    return JsonResponse({'id': id}, safe=False)


# 更新权限是否可用
def changePermission(request):
    id = json.loads(request.body)['id']
    value = json.loads(request.body)['value']
    for index, r in enumerate(data['rights']):
        if int(r['id']) == id:
            data['rights'][index]['pagepermisson'] = value
            return JsonResponse({'id': id}, safe=False)
    for index, c in enumerate(data['children']):
        if int(c['id']) == id:
            data['children'][index]['pagepermisson'] = value
            return JsonResponse({'id': id}, safe=False)
    return JsonResponse({'ok': False}, safe=False)


# 获取全部角色信息
def getRoleList(request):
    return JsonResponse(data['roles'], safe=False)


# 删除角色
def deleteRole(request):
    id = json.loads(request.body)['id']
    new_Role = []
    for role in data['roles']:
        if role['id'] == id:
            continue
        new_Role.append(role)
    data['roles'] = new_Role
    return JsonResponse({'ok': True}, safe=False)


# 更新角色权限
def changeRoleRights(request):
    id = json.loads(request.body)['id']
    rights = json.loads(request.body)['rights']
    for index, role in enumerate(data['roles']):
        if role['id'] == id:
            data['roles'][index]['rights'] = rights
            break
    return JsonResponse({'ok': True}, safe=False)


# 获取用户信息，根据校色ID返回自己的信息以及其管理区域的用户列表
def getUserInfo(request):
    fileData = json.loads(request.body)
    roleId, region = fileData['roleId'], fileData['region']
    users = data['users']
    for i, user in enumerate(users):
        for role in data['roles']:
            if user['roleId'] == role['id']:
                users[i]['roleType'] = role['roleName']
                break
            else:
                continue
    if roleId == 1:
        return JsonResponse(users, safe=False)
    newUsers = []
    for user in users:
        if (user['roleId']) > int(roleId) and user['region'] == region:
            newUsers.append(user)
        else:
            if (user['roleId']) == int(roleId) and user['region'] == region:
                newUsers.append(user)
            else:
                continue
    return JsonResponse(newUsers, safe=False)


# 删除用户
def deleteUser(request):
    id = json.loads(request.body)['id']
    new_users = []
    for user in data['users']:
        if user['id'] == id:
            continue
        else:
            new_users.append(user)
    data['users'] = new_users
    return JsonResponse({'ok': True}, safe=False)


# 获取地理信息
def getRegionInfo(request):
    return JsonResponse(data['regions'], safe=False)


# 更新角色状态
def changeUserState(request):
    id = json.loads(request.body)['id']
    value = json.loads(request.body)['value']
    for i, user in enumerate(data['users']):
        if id == user['id']:
            data['users'][i]['roleState'] = value
            break
    return JsonResponse({'ok': True}, safe=False)


# 添加角色
def addUser(request):
    userInfo = json.loads(request.body)
    data['users'].append(userInfo)
    return JsonResponse({'ok': True}, safe=False)


# 更新角色
def updateUser(request):
    userInfo = json.loads(request.body)
    for i, user in enumerate(data['users']):
        if userInfo['id'] == user['id']:
            data['users'][i] = userInfo
            break
    return JsonResponse({'ok': True}, safe=False)


# 用户登录验证
def userVerify(request):
    userInfo = json.loads(request.body)
    username = userInfo['username']
    password = userInfo['password']
    users = data['users']
    for user in users:
        if user['username'] == username:
            if user['password'] == password:
                if user['roleState']:
                    return JsonResponse({'code': 200, 'user': user},
                                        safe=False)
                else:
                    return JsonResponse({'code': 201, 'msg': '此用户被限制登录，请联系管理员！'}, safe=False)
            else:
                return JsonResponse({'code': 202, 'msg': '密码错误！'}, safe=False)
    return JsonResponse({'code': 203, 'msg': '无此用户！'}, safe=False)


# 获取全部路由信息
def getAllRoute(request):
    routes = data['children'] + data['rights']
    return JsonResponse(routes, safe=False)


# 获取校色权限
def getUserRightsById(request):
    id = json.loads(request.body)['id']
    for role in data['roles']:
        if int(role['roleType']) == int(id):
            return JsonResponse(role['rights'], safe=False)
    return JsonResponse({'ok': False}, safe=False)


# 获取文章类别
def getCategories(request):
    return JsonResponse(data['categories'], safe=False)


# 上传文章
def addNews(request):
    news = json.loads(request.body)
    data['news'].append(news)
    return JsonResponse({'ok': True}, safe=False)


# 获取草稿箱中的新闻
def getState0NewsByAuthor(request):
    author = json.loads(request.body)['author']
    news = []
    for new in data['news']:
        if new['author'] == author and new['auditState'] == 0:
            news.append(new)
    for i, new in enumerate(news):
        for category in data['categories']:
            if new['categoryId'] == category['id']:
                news[i]['categoryName'] = category['value']
                break
    return JsonResponse(news, safe=False)


# 删除新闻
def deleteNewsById(request):
    id = json.loads(request.body)['id']
    newNews = []
    for new in data['news']:
        if str(new['id']) == id:
            continue
        newNews.append(new)
    data['news'] = newNews
    return JsonResponse({'ok': True}, safe=False)


# 更新新闻
def updateNews(request):
    newNew = json.loads(request.body)
    for i, new in enumerate(data['news']):
        if str(new['id']) == str(newNew['id']):
            data['news'][i] = newNew
            break
    return JsonResponse({'ok': True}, safe=False)


# 获取新闻By作者
def getNewsByAuthor(request):
    author = request.GET.get('author')
    news = []
    for new in data['news']:
        if new['author'] == author and int(new['auditState']) != 0 and int(new['publishState']) <= 1:
            news.append(new)
    for i, new in enumerate(news):
        for category in data['categories']:
            if new['categoryId'] == category['id']:
                news[i]['categoryName'] = category['value']
                break
    return JsonResponse(news, safe=False)


# 更新新闻发布状态
def updatePublishState(request):
    id = json.loads(request.body)['id']
    publishState = json.loads(request.body)['publishState']
    for i, new in enumerate(data['news']):
        if str(new['id']) == str(id):
            data['news'][i]['publishState'] = int(publishState)
            break
    return JsonResponse({'ok': True}, safe=False)


def getNewsToAudit(request):
    roleId = request.GET.get('roleId')
    region = request.GET.get('region')
    if int(roleId) == 1:
        news = []
        for new in data['news']:
            if new['auditState'] == 1:
                news.append(new)
        return JsonResponse(news, safe=False)
    elif int(roleId) == 2:
        news = []
        for new in data['news']:
            if new['auditState'] == 1 and new['region'] == region:
                news.append(new)
        return JsonResponse(news, safe=False)
    return JsonResponse([], safe=False)


# 修改文章类别
def updateCategory(request):
    category = json.loads(request.body)
    for i, c in enumerate(data['categories']):
        if str(c['id']) == str(category['id']):
            data['categories'][i] = category
            break
    return JsonResponse({'ok': True}, safe=False)


# 删除类别
def deleteCategory(request):
    id = json.loads(request.body)['id']
    newCategory = []
    for c in data['categories']:
        if str(c['id']) == str(id):
            continue
        newCategory.append(c)
    data['categories'] = newCategory
    return JsonResponse({'ok': True}, safe=False)


# 发布管理
# 根据权限获取新闻
def getNewsByStateAndRight(request):
    bodyInfo = json.loads(request.body)
    username, region, roleId = bodyInfo['username'], bodyInfo['region'], bodyInfo['roleId']
    publishState = bodyInfo['publishState']
    if int(roleId) == 1:
        res = []
        for new in data['news']:
            if int(new['publishState']) == publishState:
                res.append(new)
    elif int(roleId) == 2:
        res = []
        for new in data['news']:
            if int(new['publishState']) == publishState and new['region'] == region:
                res.append(new)
    else:
        res = []
        for new in data['news']:
            if int(new['publishState']) == publishState and new['author'] == username:
                res.append(new)
    for i, new in enumerate(res):
        for category in data['categories']:
            if new['categoryId'] == category['id']:
                res[i]['categoryName'] = category['value']
                break
    return JsonResponse(res, safe=False)


# 获取排序后的新闻
def getNewsBySortType(request):
    sortType = int(request.GET.get('sortType'))
    news = []
    for new in data['news']:
        if new['publishState'] == 2:
            news.append(new)
    if sortType == 1:
        news = sorted(news, key=lambda n: n['view'], reverse=True)
    else:
        news = sorted(news, key=lambda n: n['star'], reverse=True)
    return JsonResponse(news[:5], safe=False)


# 获取新闻统计信息
def getCountInfo(request):
    news = data['news']
    for i, new in enumerate(news):
        for category in data['categories']:
            if new['categoryId'] == category['id']:
                news[i]['categoryName'] = category['value']
                break
    res = {}
    for new in news:
        if new['categoryName'] in res.keys():
            res[new['categoryName']] += 1
        else:
            res[new['categoryName']] = 1

    return JsonResponse({'x': list(res.keys()), 'y': list(res.values())}, safe=False)


def getCountInfoByAuthor(request):
    author = request.GET.get('author')
    res = {}
    for c in data['categories']:
        res[c['value']] = 0
    newNews = []
    for new in data['news']:
        if new['author'] == author:
            newNews.append(new)

    for i, new in enumerate(newNews):
        for category in data['categories']:
            if new['categoryId'] == category['id']:
                newNews[i]['categoryName'] = category['value']
                break

    for new in newNews:
        res[new['categoryName']] += 1
    response = []
    for k, v in res.items():
        response.append({'value': v, 'name': k})
    return JsonResponse(response, safe=False)


# 获取已发表新闻
def getPublishNews(request):
    news = []
    for new in data['news']:
        if new['publishState'] == 2:
            news.append(new)
    return JsonResponse(news, safe=False)


# 获取新闻By ID
def getNewsById(request):
    id = request.GET.get('id')
    for i, new in enumerate(data['news']):
        if str(new['id']) == str(id):
            data['news'][i]['view'] += 1
            for category in data['categories']:
                if new['categoryId'] == category['id']:
                    data['news'][i]['categoryName'] = category['value']
                    break
            return JsonResponse(data['news'][i], safe=False)
    return JsonResponse({'ok': False}, safe=False)
