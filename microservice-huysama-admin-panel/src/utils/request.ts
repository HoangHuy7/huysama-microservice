import { TOKEN } from '@/utils/config';
import { creteRequest } from '@south/request';

// URL cơ sở cho môi trường sản xuất
const prefixUrl = import.meta.env.VITE_BASE_URL as string;
const baseURL = process.env.NODE_ENV !== 'development' ? prefixUrl : '/api';

// Cấu hình request
export const request = creteRequest(baseURL, TOKEN);

// Tạo nhiều request
// export const newRequest = creteRequest('/test', TOKEN);

/**
 * Hủy request
 * @param url - đường dẫn
 */
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

/** Hủy tất cả request */
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};
