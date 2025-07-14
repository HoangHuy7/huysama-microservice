import type { RouteObject } from 'react-router-dom';
import type { DefaultComponent } from "@loadable/component";
import { Skeleton } from 'antd';
import { ROUTER_EXCLUDE } from './config';
import loadable from '@loadable/component';

/**
 * Thêm layout
 * @param routes - 路由数据
 */
export function layoutRoutes(routes: RouteObject[]): RouteObject[] {
  const layouts: RouteObject[] = []; // layout nội bộ

  for (let i = 0; i < routes.length; i++) {
    const { path } = routes[i];
    // Nếu đường dẫn là trang đăng nhập thì không thêm layout
    if (path !== 'login') {
      layouts.push(routes[i]);
    }
  }

  return layouts;
}

/**
 * Xử lý đường dẫn
 * @param routes - Dữ liệu đường dẫn
 */
export function handleRoutes(routes: Record<string, () => Promise<DefaultComponent<unknown>>>): RouteObject[] {
  const layouts: RouteObject[] = []; // layout nội bộ

  for (const key in routes) {
    // Có phải trong danh sách loại trừ không
    const isExclude = handleRouterExclude(key);
    if (isExclude) continue;

    const path = getRouterPage(key);
    if (path === '/login') continue;

    const ComponentNode = loadable(routes[key], {
      fallback: <Skeleton
        active
        className='p-30px'
        paragraph={{ rows: 10 }}
       />
    });

    layouts.push({
      path,
      element: <ComponentNode />
    });
  }

  return layouts;
}

// Tiền xử lý biểu thức chính quy, tránh tạo lại
const ROUTER_EXCLUDE_REGEX = new RegExp(
  ROUTER_EXCLUDE.map((item) => (!item.includes('.') ? `/${item}/` : item)).join('|'),
  'i'
);

/**
 * Kiểm tra đường dẫn có phải trong danh sách loại trừ không
 * @param path - Đường dẫn
 */
function handleRouterExclude(path: string): boolean {
  return ROUTER_EXCLUDE_REGEX.test(path);
}

/**
 * Xử lý đường dẫn có tham số
 * @param path - Đường dẫn
 */
const handleRouterDynamic = (path: string): string => {
  path = path.replace(/\[/g, ':');
  path = path.replace(/\]/g, '');

  return path;
};

/**
 * Lấy đường dẫn trang
 * @param path - Đường dẫn
 */
function getRouterPage(path: string): string {
  // Lấy dữ liệu trang sau
  const pageIndex = path.indexOf('pages') + 5;
  // Phần mở rộng
  const lastIndex = path.lastIndexOf('.');
  // Xóa pages và phần mở rộng
  let result = path.substring(pageIndex, lastIndex);

  // Nếu là trang chủ thì trả về /
  if (result === '/index') return '/';

  // Nếu kết thúc là index thì xóa
  if (result.includes('index')) {
    const indexIdx = result.lastIndexOf('index') + 5;
    if (indexIdx === result.length) {
      result = result.substring(0, result.length - 6);
    }
  }

  // Nếu là đường dẫn có tham số
  if (result.includes('[') && result.includes(']')) {
    result = handleRouterDynamic(result);
  }

  return result;
}
