import type {Key} from 'react';
import type {DataNode} from 'antd/es/tree';
import {request} from '@/utils/request';
import {defaultMenus} from "@/menus";
import {ServerResult} from "@south/request";

enum API {
  URL = '/authority/menu'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getMenuPage(data: Partial<BaseFormData> & PaginationData) {
  return request.get<PageServerResult<BaseFormData[]>>(
    `${API.URL}/page`,
    {params: data}
  );
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getMenuById(id: string) {
  return request.get<BaseFormData>(`${API.URL}/detail?id=${id}`);
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createMenu(data: BaseFormData) {
  return request.post(API.URL, data);
}

export function updateMenu(id: string, data: BaseFormData) {
  return request.put(`${API.URL}/${id}`, data);
}

export function deleteMenu(id: string) {
  return request.delete(`${API.URL}/${id}`);
}

interface PermissionResult {
  treeData: DataNode[];
  defaultCheckedKeys: Key[];
}

export function getPermission(data: object) {
  return request.get<PermissionResult>(`${API.URL}/tree`, {params: data});
}

export function savePermission(data: object) {
  return request.put(`${API.URL}/authorize/save`, data);
}

export function getMenuList() {
  // return request.get<SideMenu[]>(`/menu/list`);
  return new Promise<ServerResult<SideMenu[]>>((resolve) => {
    resolve({
      message: "",
      code: 200,
      data: defaultMenus as SideMenu[]
    });
  });
}
