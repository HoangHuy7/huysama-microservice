import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  CreateAxiosDefaults,
  Cancel,
} from 'axios';

export interface RequestCancel extends Cancel {
  data: object;
  response: {
    status: number;
    data: {
      code?: number;
      message?: string;
    }
  }
}

export interface RequestInterceptors<T> {
  // Yêu cầu giao diện chặn
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: RequestCancel) => void
  // Yêu cầu giao diện chặn phản hồi
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: RequestCancel) => void
}

// Tham số tùy chỉnh
export interface CreateRequestConfig<T = AxiosResponse>
  extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>
}

// Dữ liệu phản hồi giao diện
export interface ServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}