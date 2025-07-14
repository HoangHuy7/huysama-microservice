import { request } from '@/utils/request';

enum API {
  URL = '/authority/user'
}

/**
 * Lấy dữ liệu phân trang
 * @param data - Dữ liệu yêu cầu
 */
export function getUserPage(data: Partial<BaseFormData> & PaginationData) {
  return request.get<PageServerResult<BaseFormData[]>>(
    `${API.URL}/page`,
    { params: data }
  );
}

/**
 * Lấy dữ liệu theo ID
 * @param id - ID
 */
export function getUserById(id: string) {
  return request.get<BaseFormData>(`${API.URL}/detail?id=${id}`);
}

/**
 * Thêm dữ liệu mới
 * @param data - Dữ liệu yêu cầu
 */
export function createUser(data: BaseFormData) {
  return request.post(API.URL, data);
}

/**
 * Cập nhật dữ liệu
 * @param id - ID cần cập nhật
 * @param data - Dữ liệu yêu cầu
 */
export function updateUser(id: string, data: BaseFormData) {
  return request.put(`${API.URL}/${id}`, data);
}

/**
 * Xóa
 * @param id - ID cần xóa
 */
export function deleteUser(id: string) {
  return request.delete(`${API.URL}/${id}`);
}

/**
 * Xóa hàng loạt
 * @param data - Dữ liệu yêu cầu
 */
export function batchDeleteUser(data: BaseFormData) {
  return request.post(`${API.URL}/batchDelete`, data);
}

