import type { TabPaneProps } from 'antd';
import type { NavData } from '@/menus/utils/helper';
import type { AliveController } from 'react-activation';
import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TabsData extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
  labelZh: React.ReactNode;
  labelEn: React.ReactNode;
  nav: NavData[];
}

interface TabsGoNext {
  key: string,
  nextPath: string;
  dropScope: AliveController['dropScope']
}

interface TabsState {
  isCloseTabsLock: boolean;
  isMaximize: boolean;
  activeKey: string;
  nav: NavData[];
  tabs: TabsData[];
  toggleCloseTabsLock: (isCloseTabsLock: boolean) => void;
  toggleMaximize: (isMaximize: boolean) => void;
  setActiveKey: (key: string) => void;
  setNav: (nav: NavData[]) => void;
  switchTabsLang: (label: string) => void;
  addTabs: (payload: TabsData) => void;
  closeTabs: (payload: string, dropScope: AliveController['dropScope']) => void;
  closeTabGoNext: (payload: TabsGoNext) => void;
  closeLeft: (payload: string, dropScope: AliveController['dropScope']) => void;
  closeRight: (payload: string, dropScope: AliveController['dropScope']) => void;
  closeOther: (payload: string, dropScope: AliveController['dropScope']) => void;
  closeAllTab: () => void;
}

export const useTabsStore = create<TabsState>()(
  devtools(
    persist(
      (set) => ({
        isCloseTabsLock: false,
        isMaximize: false,
        activeKey: '',
        nav: [],
        tabs: [],
        toggleCloseTabsLock: (isCloseTabsLock) => set({ isCloseTabsLock }),
        toggleMaximize: (isMaximize) => set({ isMaximize }),
        setActiveKey: (key) => set({ activeKey: key }),
        setNav: (nav) => set({ nav }),
        switchTabsLang: (label) => set((state) => {
          const { tabs } = state;
          for (let i = 0; i < tabs?.length; i++) {
            const item = tabs[i];
            item.label = label === 'en' ? item.labelEn : item.labelZh;
          }
          return { tabs };
        }),
        addTabs: (payload) => set((state) => {
          const { tabs } = state;
          const has = tabs.find(item => item.key === payload.key);
          if (!has) tabs.push(payload);

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          return { tabs };
        }),
        closeTabs: (payload, dropScope) => set((state) => {
          const { tabs } = state;
          const index = tabs.findIndex(item => item.key === payload);
          if (index >= 0) tabs.splice(index, 1);

          if (payload === state.activeKey) {
            let target = '';
            if (index < tabs.length) {
              target = tabs?.[index]?.key || '';
            } else {
              target = tabs[index - 1]?.key || '';
            }
            set({ activeKey: target, isCloseTabsLock: true });
          }

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          // Xóa bộ nhớ cache của thẻ hiện tại
          dropScope(payload);

          return { tabs };
        }),
        closeTabGoNext: (payload) => set((state) => {
          const { tabs } = state;
          const { key, nextPath, dropScope } = payload;
          const index = tabs.findIndex(item => item.key === key);
          if (index >= 0) tabs.splice(index, 1);

          if (key === state.activeKey) {
            set({ activeKey: nextPath, isCloseTabsLock: true });
          }

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          // Xóa bộ nhớ cache của thẻ hiện tại
          dropScope(key);

          return { tabs };
        }),
        closeLeft: (payload, dropScope) => set((state) => {
          const { tabs, activeKey } = state;
          const index = tabs.findIndex(item => item.key === payload);
          if (index >= 0) tabs.splice(0, index);
          set({ activeKey: tabs[0]?.key || '' });

          // Nếu thẻ hiện tại không phải là thẻ đóng thì chuyển đến thẻ đóng
          if (activeKey !== payload) {
            set({ isCloseTabsLock: true });
          }

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          // Xóa bộ nhớ cache của thẻ hiện tại
          for (let i = 0; i < tabs?.length; i++) {
            const item = tabs[i];
            if (item.key !== payload) {
              dropScope(item.key);
            }
          }

          return { tabs };
        }),
        closeRight: (payload, dropScope) => set((state) => {
          const { tabs, activeKey } = state;

          // Xóa bộ nhớ cache của thẻ hiện tại
          for (let i = 0; i < tabs?.length; i++) {
            const item = tabs[i];
            if (item.key !== payload) {
              dropScope(item.key);
            }
          }

          const index = tabs.findIndex(item => item.key === payload);
          if (index >= 0) tabs.splice(index + 1, tabs.length - index - 1);
          set({ activeKey: tabs[tabs.length - 1]?.key || '' });

          // Nếu thẻ hiện tại không phải là thẻ đóng thì chuyển đến thẻ đóng
          if (activeKey !== payload) {
            set({ isCloseTabsLock: true });
          }

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          return { tabs };
        }),
        closeOther: (payload, dropScope) => set((state) => {
          const { tabs, activeKey } = state;
          // Giữ lại thẻ hiện tại, đóng các thẻ khác
          const filteredTabs: TabsData[] = [];

          for (let i = 0; i < tabs?.length; i++) {
            const item = tabs[i];

            // Nếu thẻ hiện tại không phải là thẻ đóng thì giữ lại
            if (item.key === payload) {
              filteredTabs.push(item);
            } else {
              // Xóa bộ nhớ cache của thẻ hiện tại
              dropScope(item.key);
            }
          }

          tabs.filter((item) => item.key === payload);

          // Nếu thẻ hiện tại không phải là thẻ đóng thì chuyển đến thẻ đóng
          if (activeKey !== payload) {
            set({ isCloseTabsLock: true });
          }

          set({ tabs: filteredTabs, activeKey: payload });

          if (filteredTabs.length) filteredTabs[0].closable = filteredTabs.length > 1;

          return {
            tabs: filteredTabs,
            activeKey: payload
          };
        }),
        closeAllTab: () => {
          set({ tabs: [], activeKey: '' });

          return {
            tabs: [],
            activeKey: '',
          };
        }
      }),
      {
        name: 'tabs-storage', // Tên dự án trong bộ nhớ cache, phải là duy nhất
        storage: createJSONStorage(() => localStorage), // Sử dụng sessionStorage làm bộ nhớ cache
      },
    ),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'tabsStore'
    }
  )
);
