# Dự Án Microservice Huysama

Một hệ thống microservices hiện đại, chuẩn sản xuất, được thiết kế tối ưu cho khả năng mở rộng, bảo mật và dễ bảo trì. Dự án này thể hiện năng lực thiết kế hệ thống, DevOps và full-stack chuyên nghiệp, lý tưởng để làm nổi bật trong CV cá nhân.

---

## 🚀 Tổng Quan

**Microservice Huysama** là nền tảng microservices toàn diện với các thành phần:
- Trang quản trị (admin panel) mạnh mẽ, giao diện hiện đại (React + Vite + TypeScript)
- Dịch vụ xác thực & phân quyền bảo mật (Spring Boot, Java)
- Hạ tầng vững chắc: Traefik, Pomerium, Docker, Kubernetes (Minikube)
- CI/CD tự động hóa, thực hành DevOps hiện đại

---

## 🏗️ Kiến Trúc Hệ Thống

Hệ thống được chia module độc lập, mỗi dịch vụ phụ trách một domain riêng biệt. Giao tiếp giữa các dịch vụ được bảo mật và quản lý qua API gateway, service mesh. Sơ đồ tổng thể:

![Kiến trúc hệ thống](./imgs/architecture_system.png)

**Thành phần chính:**
- **Admin Panel:** Giao diện quản trị hiện đại, responsive
- **Authentication Service:** Xác thực, phân quyền tập trung, bảo mật
- **API Gateway & Routing:** Traefik, Pomerium đảm bảo ingress an toàn, SSO, service discovery
- **Hạ tầng:** Docker hóa, sẵn sàng Kubernetes, Nginx phục vụ tĩnh
- **CI/CD:** Pipeline tự động build, test, deploy

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React, Vite, TypeScript, Ant Design
- **Backend:** Spring Boot, Java
- **Hạ tầng:** Docker, Docker Compose, Kubernetes (Minikube), Nginx
- **Mạng & Bảo mật:** Traefik, Pomerium (Zero Trust, SSO)
- **DevOps:** CI/CD (thư mục `cicd/`), container hóa, orchestration

---

## ⚡ Khởi Động Nhanh

### Yêu cầu môi trường
- Docker & Docker Compose
- Minikube (Kubernetes local)
- Java (JDK 11+)
- Node.js & pnpm

### Cài đặt

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd microservice-huysama
   ```
2. **Cài đặt Backend (Spring Boot):**
   ```bash
   cd springbootmca
   mvn clean install
   cd ..
   ```
3. **Cài đặt Frontend (Admin Panel):**
   ```bash
   cd microservice-huysama-admin-panel
   pnpm install
   cd ..
   ```
4. **Khởi động toàn bộ dịch vụ (Docker Compose):**
   ```bash
   docker-compose up -d
   ```

---

## 🌐 Sử Dụng

- **Trang Quản Trị:** [http://localhost:<admin-port>](http://localhost:<admin-port>)
- **API Gateway:** [http://localhost:<traefik-port>](http://localhost:<traefik-port>)

> Tham khảo `docker-compose.yml` và cấu hình dịch vụ để biết chi tiết cổng.

---

## 📦 Cấu Trúc Dự Án

- `microservice-huysama-admin-panel/` – Frontend admin panel (React, Vite, TypeScript)
- `springbootmca/` – Backend microservices (Spring Boot, Java)
- `microservice-huysama-authentication-service/` – Dịch vụ xác thực độc lập
- `microservice-huysama-pomerium/` – Pomerium SSO & định tuyến bảo mật
- `microservice-huysama-traefik/` – Traefik ingress controller
- `cicd/` – Cấu hình CI/CD pipeline
- `minikube/` – Manifest Kubernetes cho phát triển local
- `docker-compose.yml` – Orchestration đa dịch vụ

---

## 💡 Điểm Nổi Bật

- **Mở rộng & Dễ bảo trì:** Kiến trúc module hóa, dễ mở rộng
- **Bảo mật tối đa:** Zero Trust, SSO, xác thực tập trung
- **Sẵn sàng DevOps:** CI/CD, container hóa, hỗ trợ Kubernetes
- **UI/UX hiện đại:** Admin panel responsive, thân thiện
- **Chuẩn sản xuất:** Mô hình triển khai thực tế

---

## 👤 Tác giả & Đóng góp

Phát triển bởi Huysama – Kỹ sư Full-stack & DevOps

---

## 📄 Giấy phép

Dự án sử dụng giấy phép MIT.

---

*English version available at [`README.md`](./README.md)*