import type {LoginResult} from '@/pages/login/model';
import {request} from '@/utils/request';
import {ServerResult} from "@south/request";
import {data_permission} from "@/defaults";

/**
 * 权限
 * @param data - 请求数据
 */
export function getPermissions(data: object) {
  // return request.get<LoginResult>(
  //   '/user/refresh-permissions',
  //   { params: data }
  // );

  return new Promise<ServerResult<LoginResult>>((resolve) => {
    resolve({
      "code": 200,
      data: data_permission
    })
  })

}
