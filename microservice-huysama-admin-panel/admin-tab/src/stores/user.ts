import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  permissions: string[];
  userInfo: UserInfo;
  setPermissions: (permissions: string[]) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  clearInfo: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      permissions: [],
      userInfo: {
        id: 0,
        username: '',
        email: '',
        phone: ''
      },
      /** Thiết lập thông tin người dùng */
      setPermissions: (permissions) => set({ permissions }),
      /** Thiết lập quyền hạn */
      setUserInfo: (userInfo) => set({ userInfo }),
      /** Xóa thông tin người dùng */
      clearInfo: () => set({
        userInfo: { id: 0, username: '', email: '', phone: '' }
      })
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'userStore'
    }
  )
);
