import axios from 'axios';
import type {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios';
import type {
  RequestInterceptors,
  CreateRequestConfig,
  ServerResult
} from './types';

class AxiosRequest {
  // Axios instance
  instance: AxiosInstance;
  // Bộ lọc đối tượngInterceptor object
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  // Lưu trữ bộ điều khiển hủy yêu cầuMap
  abortControllerMap: Map<string, AbortController>;

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config);
    // Khởi tạo lưu trữ bộ điều khiển hủy yêu cầu
    this.abortControllerMap = new Map();
    this.interceptorsObj = config.interceptors;
    // Thứ tự thực thi bộ lọc Yêu cầu giao diện -> Yêu cầu giao diện -> Yêu cầu giao diện -> Yêu cầu giao diện -> Yêu cầu giao diện -> Yêu cầu giao diện
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        const controller = new AbortController();
        let url = res.method || '';
        res.signal = controller.signal;

        if (res.url) url += `^${res.url}`;

        // Nếu có tham số
        if (res.params) {
          for (const key in res.params) {
            url += `&${key}=${res.params[key]}`;
          }
        }

        // Nếu có dữ liệu post
        if (res.data && res.data?.[0] === '{' && res.data?.[res.data?.length - 1] === '}') {
          const obj = JSON.parse(res.data);
          for (const key in obj) {
            url += `#${key}=${obj[key]}`;
          }
        } 

        // Nếu có thì xóa yêu cầu
        if (this.abortControllerMap.get(url)) {
          console.warn('Hủy yêu cầu lặp lại:', url);
          this.cancelRequest(url);
        } else {
          this.abortControllerMap.set(url, controller);
        }
        
        return res;
      },
      (err: object) => err,
    );

    // Sử dụng bộ lọc giao diện
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    );
    // Bộ lọc giao diện chặn phản hồi đảm bảo thực thi cuối cùng
    this.instance.interceptors.response.use(
      // Vì dữ liệu của chúng tôi đều nằm trong res.data, nên chúng tôi trả về res.data trực tiếp
      (res: AxiosResponse) => {
        const url = res.config.url || '';
        this.abortControllerMap.delete(url);
        return res.data;
      },
      (err: object) => err,
    );
  }
  /**
   * Hủy tất cả yêu cầu
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }
  /**
   * Hủy yêu cầu cụ thể
   * @param url - Đường dẫn yêu cầu cần hủy
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }
  /**
   * Yêu cầu get
   * @param url - Đường dẫn
   * @param options - Tham số
   */
  get<T = object>(url: string, options = {}) {
    return this.instance.get(url, options) as Promise<ServerResult<T>>;
  }
  /**
   * Yêu cầu post
   * @param url - Đường dẫn
   * @param options - Tham số
   */
  
  post<T = object>(url: string, options = {}, config?: AxiosRequestConfig<object>) {
    return this.instance.post(url, options, config) as Promise<ServerResult<T>>;
  }
  /**
   * Yêu cầu put
   * @param url - Đường dẫn
   * @param options - Tham số
   */
  put<T = object>(url: string, options = {}, config?: AxiosRequestConfig<object>) {
    return this.instance.put(url, options, config) as Promise<ServerResult<T>>;
  }
  /**
   * Yêu cầu xóa
   * @param url - Đường dẫn
   * @param options - Tham số
   */
  delete<T = object>(url: string, options = {}) {
    return this.instance.delete(url, options) as Promise<ServerResult<T>>;
  }
}

export default AxiosRequest;