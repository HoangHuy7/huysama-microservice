import type { SideMenu } from '#/public';
import { demo } from './demo';

/**
 * Đã ngừng sử dụng, chuyển sang lấy menu động. Nếu cần menu tĩnh, hãy thay đổi menuList trong useCommonStore trong file /src/hooks/useCommonStore.ts thành defaultMenus
 * import { defaultMenus } from '@/menus';
 * // Dữ liệu menu
 * const menuList = defaultMenus;
 */
export const defaultMenus: SideMenu[] = [
  {
    label: 'Bảng điều khiển',
    labelEn: 'Dashboard',
    icon: 'la:tachometer-alt',
    key: '/dashboard',
    rule: '/dashboard'
  },
  ...demo as SideMenu[],
];
