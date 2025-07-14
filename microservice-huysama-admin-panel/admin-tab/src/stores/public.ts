import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ThemeType = 'dark' | 'light'

interface PublicState {
  theme: ThemeType; // Chủ đề
  isFullscreen: boolean; // Có phải toàn màn hình không
  isRefresh: boolean; // Có phải tải lại không
  isRefreshPage: boolean; // Có phải tải lại trang không
  /** Thiết lập chủ đề */
  setThemeValue: (theme: ThemeType) => void;
  /** Thiết lập toàn màn hình */
  setFullscreen: (isFullscreen: boolean) => void;
  /** Thiết lập tải lại */
  setRefresh: (isRefresh: boolean) => void;
  /** Thiết lập tải lại trang */
  setRefreshPage: (isRefreshPage: boolean) => void;
}

export const usePublicStore = create<PublicState>()(
  devtools(
    (set) => ({
      theme: 'light',
      isFullscreen: false,
      isRefresh: false,
      isRefreshPage: false,
      setThemeValue: (theme: ThemeType) => set({ theme }),
      setFullscreen: (isFullscreen: boolean) => set({ isFullscreen }),
      setRefresh: (isRefresh: boolean) => set({ isRefresh }),
      setRefreshPage: (isRefreshPage: boolean) => set({ isRefreshPage })
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'publicStore'
    }
  )
);
