import type { SideMenu } from '#/public';
import type { Langs } from '@/components/I18n';
import { cloneDeep } from 'lodash';
import { LANG } from '@/utils/config';

/**
 * Lấy mảng menu mở rộng dựa trên route
 * @param router - route
 */
export function getOpenMenuByRouter(router: string): string[] {
  const arr = splitPath(router), result: string[] = [];

  // Lấy từ đầu tiên viết hoa làm key menu mở rộng mới
  if (arr.length > 0) result.push(`/${arr[0]}`);

  // Khi route nằm trong thư mục nhiều cấp
  if (arr.length > 2) {
    let str = '/' + arr[0];
    for (let i = 1; i < arr.length - 1; i++) {
      str += '/' + arr[i];
      result.push(str);
    }
  }

  return result;
}

/**
 * Khớp các trường trong đường dẫn
 * @param path - đường dẫn
 * @param arr - mảng đường dẫn đã đi qua
 */
function matchPath(lang: Langs,path: string, arr: MenuPath[]): string[] {
  const result: string[] = [];

  // Tách đường dẫn
  const pathArr = splitPath(path);
  let left = 0;
  const right = pathArr.length;

  for (let i = 0; i < arr.length; i++) {
    const { path } = arr[i];
    if (path?.[left] === pathArr[left]) {
      result.push(lang === 'en' ? arr[i].labelEn : arr[i].label);
      if (left < right - 1) left++;
    }
    if (left === right) return result;
  }

  return result;
}

/**
 * Tách đường dẫn và loại bỏ chuỗi đầu tiên
 * @param path - đường dẫn
 */
export function splitPath(path: string): string[] {
  // Trả về mảng rỗng nếu đường dẫn trống hoặc không phải định dạng chuỗi
  if (!path || typeof path !== 'string') return [];
  // Tách đường dẫn
  const result = path?.split('/') || [];
  // Loại bỏ chuỗi rỗng đầu tiên
  if (result?.[0] === '') result.shift();
  return result;
}

/**
 * Tìm kiếm giá trị menu tương ứng
 * @param menus - menu
 * @param permissions - danh sách quyền
 * @param value - giá trị cần khớp
 * @param currentPath - đường dẫn hiện tại
 * @param result - giá trị trả về
 */

interface MenuPath {
  label: string;
  labelZh: string;
  labelEn: string;
  path: string[];
}
interface SearchMenuProps {
  menus: SideMenu[] | undefined,
  permissions: string[],
  value: string,
  currentPath?: MenuPath[],
  result?: SideMenu[]
}

/**
 * Tìm kiếm dữ liệu menu
 * @param data - dữ liệu menu, quyền và giá trị tìm kiếm
 */
export function searchMenuValue(data: SearchMenuProps): SideMenu[] {
  const { menus, permissions, value } = data;
  let { currentPath, result } = data;
  if (!menus?.length || !value) return [];
  if (!currentPath) currentPath = [];
  if (!result) result = [];
  const lang = localStorage.getItem(LANG);

  for (let i = 0; i < menus.length; i++) {
    const {
      key,
      label,
      labelZh,
      labelEn,
      children
    } = menus[i];
    // Nếu có mảng con thì đệ quy
    if (hasChildren(menus[i])) {
      currentPath.push({
        label,
        labelZh: labelZh || label,
        labelEn,
        path: splitPath(key)
      });

      // Đệ quy mảng con, trả về kết quả
      const childrenData = {
        menus: children,
        permissions,
        value,
        currentPath,
        result
      };
      const childResult = searchMenuValue(childrenData);

      // Khi mảng con trả về giá trị thì hợp nhất mảng
      if (childResult.length) {
        result.concat(childResult);
      } else {
        currentPath.pop();
      }
    } else if (
      (
        lang === 'en' && menus[i]?.labelEn?.toLocaleUpperCase()?.includes(value?.toLocaleUpperCase()) ||
        lang !== 'en' && (menus[i]?.labelZh?.includes(value) || menus[i]?.label?.includes(value))
      ) && hasPermission(menus[i], permissions)
    ) {
      // Thêm vào result khi khớp với giá trị value
      const { label, labelZh, labelEn, key } = menus[i];
      currentPath.push({
        label: label,
        labelZh: labelZh || label,
        labelEn: labelEn,
        path: splitPath(key)
      });
      const nav = matchPath(lang as Langs, key, currentPath);
      result.push({ label, labelZh, labelEn, key, nav });
    }
  }

  return result;
}

export interface NavData {
  label: string;
  labelZh: string;
  labelEn: string;
}
interface GetMenuByKeyResult {
  label: string;
  labelZh: string;
  labelEn: string;
  key: string;
  nav: NavData[];
}
interface GetMenuByKeyProps {
  menus: SideMenu[] | undefined,
  permissions: string[],
  key: string,
  fatherNav?: NavData[],
  result?: GetMenuByKeyResult
}

/**
 * Lấy giá trị menu hiện tại theo key
 * @param menus - menu
 * @param permissions - danh sách quyền
 * @param key - giá trị route
 * @param fatherNav - breadcrumb cấp cha
 * @param result - giá trị trả về
 */
export function getMenuByKey(data: GetMenuByKeyProps): GetMenuByKeyResult | undefined {
  const { menus, permissions, key } = data;
  const lang = localStorage.getItem(LANG);
  let { fatherNav, result } = data;
  if (!menus?.length) return result;
  if (!fatherNav) fatherNav = [];
  if (!result?.key) result = {
    key: '',
    label: '',
    labelZh: '',
    labelEn: '',
    nav: []
  };

  for (let i = 0; i < menus.length; i++) {
    if (!key || (result as GetMenuByKeyResult).key) return result;

    const { label, labelZh, labelEn, children } = menus[i];
    const currentLabel = lang === 'en' ? labelEn : labelZh || label;

    // Lọc giá trị trong dữ liệu con
    if (hasChildren(menus[i])) {
      fatherNav.push({
        label: currentLabel,
        labelZh: labelZh || label,
        labelEn,
      });

      // Đệ quy mảng con, trả về kết quả
      const childProps = {
        menus: children,
        permissions,
        key,
        fatherNav,
        result
      };
      const childResult = getMenuByKey(childProps);

      // Khi mảng con trả về giá trị
      if (childResult?.key) {
        result = childResult;
      } else {
        // Xóa đường dẫn sai của breadcrumb trước khi đệ quy tiếp
        fatherNav.pop();
      }
    } else if (
      menus[i]?.key === key &&
      hasPermission(menus[i], permissions)
    ) {
      const { key } = menus[i];
      fatherNav.push({
        label: currentLabel,
        labelZh: labelZh || label,
        labelEn,
      });
      if (key) result = {
        label,
        labelZh: labelZh || label,
        labelEn,
        key,
        nav: fatherNav
      };
    }
  }

  return result;
}

/**
 * Lấy tên menu
 * @param list - danh sách menu
 * @param path - đường dẫn
 * @param lang - ngôn ngữ
 */
export const getMenuName = (list: SideMenu[], path: string, lang: string) => {
  let result = '';

  const deepData = (list: SideMenu[], path: string) => {
    if (result) return result;

    for (let i = 0; i < list?.length; i++) {
      const item = list[i];

      if (item.key === path) {
        result = lang === 'en' ? item.labelEn : item.labelZh || item.label;
        return result;
      }

      if (item.children?.length) {
        const childResult = deepData(item.children, path);
        if (childResult) {
          result = childResult;
          return result;
        }
      }
    }

    return result;
  };
  deepData(list, path);

  return result;
};

/**
 * Lọc menu theo quyền
 * @param menus - menu
 * @param permissions - danh sách quyền
 */
export function filterMenus(
  menus: SideMenu[],
  permissions: string[]
): SideMenu[] {
  const result: SideMenu[] = [];
  const newMenus = cloneDeep(menus);
  const lang = localStorage.getItem(LANG);

  for (let i = 0; i < newMenus.length; i++) {
    const item = newMenus[i];
    // Xử lý mảng con
    if (hasChildren(item)) {
      const result = filterMenus(
        item.children as SideMenu[],
        permissions
      );

      // Giữ lại nếu có dữ liệu quyền con
      item.children = result?.length ? result : undefined;
    }

    // Thêm vào nếu có quyền hoặc có dữ liệu con
    if (
      hasPermission(item, permissions) ||
      hasChildren(item)
    ) {
      if (lang === 'en') {
        item.labelZh = item.labelZh || item.label;
        item.label = item.labelEn;
      }
      result.push(item);
    }
  }

  return result;
}

/**
 * Lấy route có quyền đầu tiên
 * @param menus - menu
 * @param permissions - quyền
 */
export function getFirstMenu(
 menus: SideMenu[],
 permissions: string[],
 result = ''
): string {
  // Trả về ngay nếu có cấu trúc
  if (result) return result;

  for (let i = 0; i < menus.length; i++) {
    // Xử lý mảng con
    if (hasChildren(menus[i]) && !result) {
      const childResult = getFirstMenu(
        menus[i].children as SideMenu[],
        permissions,
        result
      );

      // Gán giá trị nếu có kết quả
      if (childResult) {
        result = childResult;
        return result;
      }
    }

    // Có quyền và không có dữ liệu con
    if (
      hasPermission(menus[i], permissions) &&
      !hasChildren(menus[i]) &&
      !result
    ) result = menus[i].key;
  }

  return result;
}

/**
 * Lấy key của dữ liệu con
 * @param menus - dữ liệu menu
 * @param level - cấp độ
 */
function getChildrenKey(menus: SideMenu[] | undefined, level: number) {
  if (!menus?.length) return 'none';
  let result = '';

  const deep = (menus: SideMenu[], level: number) => {
    if (result) return result;
    const newLevel = level + 1;

    for (let i = 0; i < menus?.length; i++) {
      const item = menus[i];
      if (item.key) {
        const arr = item.key.split('/');
        for (let j = 1; j < arr?.length && j <= newLevel; j++) {
          const key = arr[j];
          result += `/${key}`;
        }
        return result;
      }

      if (item.children) {
        deep(item.children, newLevel);
      }
    }
  };
  deep(menus, level);

  return result;
}

/**
 * Xử lý dữ liệu menu - loại bỏ các trường thừa
 * @param menus - dữ liệu menu
 * @param level - cấp độ
 */
export function handleFilterMenus(menus: SideMenu[], level = 0): SideMenu[] {
  const currentItem: SideMenu[] = [];

  for (let i = 0; i < menus?.length; i++) {
    const item = menus[i];
    let children: SideMenu[] = [];

    if (item.children?.length) {
      const newLevel = level + 1;
      children = handleFilterMenus(item.children, newLevel);
    }

    const data: Partial<SideMenu> = { ...item };
    if (children?.length) (data as SideMenu).children = children;
    if (!data.key) data.key = getChildrenKey(data.children, level);
    delete data.labelZh;
    delete data.labelEn;

    currentItem.push(data as SideMenu);
  }

  return currentItem;
}

/**
 * Kiểm tra route có quyền không
 * @param route - route
 * @param permissions - quyền
 */
function hasPermission(route: SideMenu, permissions: string[]): boolean {
  return permissions?.includes(route?.rule || '');
}

/**
 * Kiểm tra có route con không
 * @param route - route
 */
function hasChildren(route: SideMenu): boolean {
  return Boolean(route.children?.length);
}
