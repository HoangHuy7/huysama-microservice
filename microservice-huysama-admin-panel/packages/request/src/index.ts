import { message } from '@south/message';
import { getLocalInfo, removeLocalInfo } from '@south/utils';
import axios from 'axios';
import AxiosRequest from './request';

/**
 * Tạo yêu cầu
 * @param url - Đường dẫn liên kết
 * @param tokenKey - Giá trị key lưu token
 */
function creteRequest(url: string, tokenKey: string) {
  return new AxiosRequest({
    baseURL: url,
    timeout: 180 * 1000,
    interceptors: {
      // Yêu cầu giao diện chặn
      requestInterceptors(res) {
        const tokenLocal = getLocalInfo(tokenKey) || '';
        if (res?.headers && tokenLocal) {
          res.headers.Authorization = tokenLocal as string;
        }
        return res;
      },
      // Yêu cầu giao diện chặn thời gian chờ
      requestInterceptorsCatch(err) {
        message.error('请求超时！');
        return err;
      },
      // Yêu cầu giao diện chặn phản hồi
      responseInterceptors(res) {
        const { data } = res;
        // Quyền hạn không đủ
        if (data?.code === 401) {
          const lang = localStorage.getItem('lang');
          const enMsg = 'Insufficient permissions, please log in again!';
          const zhMsg = 'Quyền hạn không đủ, vui lòng đăng nhập lại!';
          const msg = lang === 'en' ? enMsg : zhMsg;
          removeLocalInfo(tokenKey);
          message.error({
            content: msg,
            key: 'error'
          });
          console.error('错误信息:', data?.message || msg);
          
          // Chuyển hướng đăng nhập
          const url = window.location.href;
          if (url.includes('#')) {
            window.location.hash = '/login';
          } else {
            // window.location.href跳转会出现message无法显示情况，所以需要延时Chuyển hướng sẽ không hiển thị message, vì vậy cần delay
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          }
          return res;
        }

        // 错误处理
        if (data?.code !== 200) {
          handleError(data?.message);
          return res;
        }

        return res;
      },
      responseInterceptorsCatch(err) {
        // Nếu hủy yêu cầu lặp lại thì không báo lỗi
        if(axios.isCancel(err)) {
          err.data = err.data || {};
          return err;
        }

        handleError('Lỗi máy chủ!');
        return err;
      }
    }
  });
}

/**
 * Xử lý lỗi
 * @param error - Thông tin lỗi
 * @param content - Nội dung tùy chỉnh
 */
const handleError = (error: string, content?: string) => {
  console.error('Thông tin lỗi:', error);
  message.error({
    content: content || error || 'Lỗi máy chủ',
    key: 'error'
  });
};

export { creteRequest };
export type * from './types';
