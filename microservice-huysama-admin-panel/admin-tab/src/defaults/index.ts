import {LoginResult} from "@/pages/login/model";


export const data_permission: LoginResult = {
  "token": "mock_token_123456",
  "user": {
    "id": 1,
    "username": "huysama",
    "email": "1275093225@qq.com",
    "phone": "123456789"
  },
  "permissions": [
    "/dashboard",
    "/demo",
    "/demo/copy",
    "/demo/editor",
    "/demo/wangEditor",
    "/demo/virtualScroll",
    "/demo/watermark",
    "/demo/dynamic",
    "/demo/huy",
    "/demo/level",
    "/authority/user",
    "/authority/user/index",
    "/authority/user/create",
    "/authority/user/update",
    "/authority/user/view",
    "/authority/user/delete",
    "/authority/user/authority",
    "/authority/role",
    "/authority/role/index",
    "/authority/role/create",
    "/authority/role/update",
    "/authority/role/view",
    "/authority/role/delete",
    "/authority/menu",
    "/authority/menu/index",
    "/authority/menu/create",
    "/authority/menu/update",
    "/authority/menu/view",
    "/authority/menu/delete",
    "/content/article",
    "/content/article/index",
    "/content/article/create",
    "/content/article/update",
    "/content/article/view",
    "/content/article/delete"
  ],
  roles: []
}
