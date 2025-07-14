import type { SideMenu } from '#/public';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MenuState {
  isPhone: boolean;
  isCollapsed: boolean;
  selectedKeys: string; // Giá trị chọn menu
  openKeys: string[]; // Menu mở
  menuList: SideMenu[]; // Danh sách menu
  toggleCollapsed: (isCollapsed: boolean) => void;
  togglePhone: (isPhone: boolean) => void;
  setSelectedKeys: (selectedKeys: string) => void;
  setOpenKeys: (openKeys: string[]) => void;
  setMenuList: (menuList: SideMenu[]) => void;
}

export const useMenuStore = create<MenuState>()(
  devtools(
    (set) => ({
      isPhone: false,
      isCollapsed: false,
      selectedKeys: 'dashboard', // Giá trị chọn menu
      openKeys: ['Dashboard'], // Menu mở
      menuList: [], // Danh sách menu
      toggleCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
      togglePhone: (isPhone: boolean) => set({ isPhone }),
      setSelectedKeys: (selectedKeys: string) => set({ selectedKeys }),
      setOpenKeys: (openKeys: string[]) => set({ openKeys }),
      setMenuList: (menuList: SideMenu[]) => set({ menuList }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'menuStore'
    }
  )
);
