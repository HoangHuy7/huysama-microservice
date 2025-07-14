import { useEffect } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { HashRouter as Router } from 'react-router-dom';
import nprogress from 'nprogress';
import RouterPage from './components/Router';
import StaticMessage from '@south/message';

// keepalive
import { AliveScope } from 'react-activation';

// antd
import { theme, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

// Tắt hiển thị loading trên thanh tiến trình
nprogress.configure({ showSpinner: false });

// Chủ đề antd
const { defaultAlgorithm, darkAlgorithm } = theme;

import { useCommonStore } from '@/hooks/useCommonStore';

function Page() {
  const { i18n } = useTranslation();
  const { theme } = useCommonStore();
  // Lấy ngôn ngữ hiện tại
  const currentLanguage = i18n.language;

  useEffect(() => {
    // Tắt loading
    const firstElement = document.getElementById('first');
    if (firstElement && firstElement.style?.display !== 'none') {
      firstElement.style.display = 'none';
    }
  }, []);

  return (
    <Router>
      <ConfigProvider
        locale={currentLanguage === 'en' ? enUS : zhCN}
        theme={{
          algorithm: [theme === 'dark' ? darkAlgorithm : defaultAlgorithm]
        }}
      >
        <App>
          <StaticMessage />
          <AliveScope>
            <RouterPage />
          </AliveScope>
        </App>
      </ConfigProvider>
    </Router>
  );
}

export default Page;
