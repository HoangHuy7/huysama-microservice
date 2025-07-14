import ReactDOM from 'react-dom/client';
import Router from './router';
import '@/assets/css/public.less';
import '@/assets/fonts/font.less';

// Style
import {StyleProvider, legacyLogicalPropertiesTransformer} from '@ant-design/cssinjs'; // Tương thích với trình duyệt phiên bản thấp
import 'uno.css';
import 'nprogress/nprogress.css';
import '@/assets/css/scrollbar.less';
import '@/assets/css/theme-color.less';

// Đa ngôn ngữ i18n
import './locales/config';

// antd
import '@ant-design/v5-patch-for-react-19';
import '@/assets/css/antd.less';

import dayjs from 'dayjs';
import 'dayjs/locale/vi.js';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyleProvider
    hashPriority='high'
    transformers={[legacyLogicalPropertiesTransformer]}
  >
    <Router/>
  </StyleProvider>
);

// Tắt loading
const firstElement = document.getElementById('first');
if (firstElement && firstElement.style?.display !== 'none') {
  firstElement.style.display = 'none';
}
