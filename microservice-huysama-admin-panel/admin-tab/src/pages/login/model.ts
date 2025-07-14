// Dữ liệu truyền vào từ API
export interface LoginData {
  username: string;
  password: string;
}

// Dữ liệu người dùng
interface User {
  id: number;
  username: string;
  phone: string;
  email: string;
}

// Dữ liệu quyền của người dùng
interface Roles {
  id: string;
}

// Dữ liệu trả về từ API
export interface LoginResult {
  token: string;
  user: User;
  permissions: string[];
  roles: Roles[];
}