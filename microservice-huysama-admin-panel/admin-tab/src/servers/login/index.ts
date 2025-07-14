import type {LoginData, LoginResult} from '@/pages/login/model';
import {request} from '@/utils/request';
import {ServerResult} from "@south/request";
import {data_permission} from "@/defaults";

/**
 * Đăng nhập
 * @param data - Dữ liệu yêu cầu
 */
export function login(data: LoginData) {
  // return request.post<LoginResult>('/user/login', data);

  return new Promise<ServerResult<LoginResult>>((resolve) => {
    resolve({
      "code": 200,
      data: data_permission
    })
  })
}

/**
 * Cập nhật mật khẩu
 * @param data - Dữ liệu yêu cầu
 */
export function updatePassword(data: object) {
  return request.post('/update-password', data);
}

/**
 * Quên mật khẩu
 * @param data - Dữ liệu yêu cầu
 */
export function forgetPassword(data: object) {
  return request.post('/forget-password', data);
}
