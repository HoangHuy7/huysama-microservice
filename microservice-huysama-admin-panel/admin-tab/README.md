Dưới đây là toàn bộ phần chữ Trung được dịch sang tiếng Việt:

<div align="center">
	<h1>React Admin</h1>
</div>

[![Giấy phép](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

Nếu bạn thấy dự án này hữu ích hoặc bạn yêu thích dự án của chúng tôi, hãy tặng chúng tôi một ⭐️ trên GitHub. Nếu bạn có ý định cải tiến hoặc thêm tính năng mới, rất hoan nghênh gửi vấn đề (issues). Cảm ơn sự hỗ trợ của bạn!

## ✨ Giới thiệu

Dự án frontend quản trị trung/hậu trường (admin dashboard) sẵn sàng sử dụng, được phát triển bằng các công nghệ chính thống như `React`, `Typescript`, `Vite`, `Antd`, với `Vite` hỗ trợ tự động tạo định tuyến (routing), hỗ trợ chức năng `KeepAlive`, quản lý trạng thái với `zustand`, hỗ trợ bảng cuộn ảo (virtual scrolling table), và `UnoCss` để phát triển kiểu dáng (styles).

## 🚀 Demo dự án
[Địa chỉ demo](https://southliu.github.io/)

![01.gif](https://github.com/southliu/github-static/blob/main/react-admin/01.gif)

![02.gif](https://github.com/southliu/github-static/blob/main/react-admin/02.gif)

| ![03.gif](https://github.com/southliu/github-static/blob/main/react-admin/03.gif) | ![04.gif](https://github.com/southliu/github-static/blob/main/react-admin/04.gif) |
| --- | --- |

## 💻 Cài đặt và Sử dụng

- Lấy mã nguồn dự án

```bash
git clone https://github.com/southliu/react-admin.git
```

- Chọn thư mục

```bash
cd react-admin
```

- Cài đặt dependency toàn cục, bỏ qua nếu đã tồn tại

```bash
npm i -g pnpm
```

- Cài đặt dependency
```bash
pnpm install -w
```
##### Nếu gặp vấn đề cài đặt lỗi khi sử dụng pnpm, vui lòng dùng VPN/proxy, cài đặt bằng yarn hoặc chuyển sang nguồn Taobao (registry).
```bash
pnpm config set registry https://registry.npmmirror.com
```

- Chạy

```bash
pnpm dev
```

- Đóng gói (Build)

```bash
pnpm build
```

## 📁 Cấu trúc dự án

```tree
react-admin
├── build                     # Cấu hình liên quan đến Build
│   ├── utils                 # Hàm tiện ích Build
│   └── vite                  # Cấu hình Vite
├── packages                  # Sub-package của Monorepo
│   ├── message               # Module tin nhắn
│   ├── request               # Module request
│   ├── stylelintConfig      # Cấu hình Stylelint
│   └── utils                 # Hàm tiện ích
├── public                    # Tài nguyên tĩnh
├── src                       # Mã nguồn
│   ├── assets                # Tài nguyên tĩnh
│   │   ├── css               # Tập tin CSS
│   │   └── fonts             # Tập tin font
│   ├── components            # Component dùng chung
│   │   ├── Form              # Component Form
│   │   └── Table             # Component Table
│   ├── layouts               # Component Layout
│   │   └── components        # Component con của Layout
│   ├── locales               # Cấu hình quốc tế hóa (i18n)
│   ├── menus                 # Cấu hình Menu
│   ├── pages                 # Trang (Pages)
│   │   ├── content           # Quản lý nội dung
│   │   └── system            # Quản lý hệ thống
│   ├── router                # Cấu hình định tuyến (Router)
│   ├── servers               # Giao diện API
│   ├── stores                # Quản lý trạng thái
│   └── utils                 # Hàm tiện ích
├── types                     # Định nghĩa kiểu TS
├── .eslintrc.cjs             # Cấu hình ESLint
├── .gitignore                # Tập tin bỏ qua của Git (.gitignore)
├── index.html                # Mẫu HTML
├── package.json              # Dependency của dự án
├── tsconfig.json             # Cấu hình TypeScript
└── vite.config.ts            # Cấu hình Vite
```

## 🧩 Biểu tượng (Iconify)

- Tham khảo [địa chỉ chính thức của Iconify](https://icon-sets.iconify.design/)
- Cài đặt Iconify IntelliSense cho VS Code - Hiển thị biểu tượng nội tuyến và tự động hoàn thành.

## 🎗️ Ví dụ commit Git
Việc commit Git không đúng quy cách có thể dẫn đến không thể commit. Từ khóa `feat` có thể được thay thế theo `Quy ước commit đóng góp Git` dưới đây.
```
git add .
git commit -m "feat: Thêm tính năng mới"
git push
```
Nếu vẫn không thể commit code theo quy ước trên, vui lòng chạy lệnh `npx husky install` trong terminal rồi commit lại.

## 🎯 Quy ước commit đóng góp Git

- Tham khảo quy ước [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)

  - `feat` Thêm tính năng mới
  - `fix` Sửa lỗi/BUG
  - `style` Liên quan đến phong cách code, không ảnh hưởng đến kết quả chạy
  - `perf` Tối ưu/Cải thiện hiệu suất
  - `refactor` Tái cấu trúc (Refactor)
  - `revert` Hoàn tác thay đổi
  - `test` Liên quan đến kiểm thử (test)
  - `docs` Tài liệu/Chú thích
  - `chore` Cập nhật dependency/Thay đổi cấu hình boilerplate (project setup)
  - `workflow` Cải thiện quy trình làm việc (workflow)
  - `ci` Tích hợp liên tục (CI - Continuous Integration)
  - `types` Thay đổi tập tin định nghĩa kiểu (type definition)
  - `wip` Đang phát triển (Work In Progress)

## 🐵 Về việc đóng gói lại (Encapsulation)
1. Mở rộng chức năng: Mở rộng dựa trên các API hiện có.
2. Tích hợp chức năng: Gộp API của hai hoặc nhiều component trở lên.
3. Thống nhất kiểu dáng: Tránh việc thay đổi kiểu dáng sau này gây ảnh hưởng đến toàn bộ hệ thống.
4. Các component dùng chung được đóng gói lại (second encapsulation) hoặc các component thường dùng bắt đầu bằng **Base** để dễ phân biệt.

## 📕 Q&A Câu hỏi thường gặp
#### 1. Cấu hình quyền truy cập trang như thế nào?
1. Lấy dữ liệu quyền `permissions` thông qua API đăng nhập (`/user/login`) hoặc API ủy quyền lại (`/user/refresh-permissions`).
2. Lấy dữ liệu quyền `rule` từ trường `data` qua API menu (`/menu/list`). Dữ liệu `rule` này ảnh hưởng đến việc hiển thị menu; nếu không trả về `rule` thì menu sẽ luôn hiển thị.
3. Quyền truy cập trong trang tham khảo dữ liệu `pagePermission` trong tập tin `src/pages/system/menu.index.tsx`. `pagePermission.page` là quyền hiển thị trang, được so khớp dựa trên `permissions` trả về từ điểm thứ nhất.

#### 2. Cấu hình định tuyến (routing) như thế nào?
Định tuyến (routing) được tự động tạo dựa trên đường dẫn thư mục. Các đường dẫn chứa tên tập tin hoặc tên thư mục sau đây sẽ không được tạo:

* login
* forget
* components
* utils
* lib
* hooks
* model.tsx
* 404.tsx

Bạn có thể tự điều chỉnh quy tắc tạo định tuyến trong tập tin `src/router/utils/config.ts`.

#### 3. Cấu hình menu như thế nào?
Có hai cách để cấu hình menu:
1. Menu động: Lấy dữ liệu menu thông qua API menu (`/menu/list`).
2. Menu tĩnh: Nếu cần menu tĩnh, hãy thay đổi `menuList` trong `useCommonStore` tại tập tin `/src/hooks/useCommonStore.ts` thành `defaultMenus`.
```js
// src/hooks/useCommonStore.ts
import { defaultMenus } from '@/menus';

// const menuList = useMenuStore(state => state.menuList);
// Dữ liệu menu
const menuList = defaultMenus;
```

#### 4. Xem dependency @south/xxx ở đâu?
Kiểm tra mã nguồn của các tập tin `xxx` trong thư mục gốc `packages` để sửa đổi.

#### 5. Lỗi khi cài đặt dependency mới?
Khi cài đặt dependency mới trong dự án monorepo, bạn cần thêm `-w` hoặc `--workspace` vào sau lệnh, nếu không sẽ xảy ra lỗi. Ví dụ: `pnpm i mobx -w`.

## 🧡 Quyên góp
Nếu bạn thấy dự án này hữu ích, bạn có thể mời tác giả một ly cà phê để ủng hộ!

| WeChat | Alipay |
| --- | --- |
| <img src="https://github.com/southliu/github-static/blob/main/pay/wechat.jpg" width="250" alt="wechat"> | <img src="https://github.com/southliu/github-static/blob/main/pay/alipay.jpg" width="250" alt="alipay">  |
