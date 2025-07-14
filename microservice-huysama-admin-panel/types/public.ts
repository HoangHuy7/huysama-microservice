import type {ReactNode} from 'react';
import type {TableProps} from 'antd';
import type {ColumnType} from 'antd/es/table';
import type {ItemType} from 'antd/es/menu/interface';

// Mảng
export type ArrayData = string[] | number[] | boolean[]

// Giá trị rỗng
export type EmptyData = null | undefined

// Dữ liệu phản hồi API phân trang
export interface PageServerResult<T = unknown> {
  items: T,
  total: number
}

// Dữ liệu phân trang bảng
export interface PaginationData {
  page?: number;
  pageSize?: number;
}

// Menu bên
export interface SideMenu extends Omit<ItemType, 'children' | 'label' | 'icon'> {
  label: string;
  labelZh?: string;
  labelEn: string;
  key: string;
  icon?: React.ReactNode | string;
  rule?: string; // Quyền định tuyến
  nav?: string[]; // Đường dẫn breadcrumb
  children?: SideMenu[];
}

// Quyền trang
export interface PagePermission {
  page?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;

  [key: string]: boolean | undefined;
}

// Enum cột bảng
export interface ColumnsEnum {
  label: string;
  value: unknown;
  color?: string;
}

// Dữ liệu cột bảng
export interface TableColumn<T = object> extends ColumnType<T> {
  enum?: ColumnsEnum[] | Record<string, unknown>;
  children?: TableColumn<T>[];
  isKeepFixed?: boolean; // Tắt fixed mặc định trên thiết bị di động, thuộc tính này bật fixed
}

// Tham số bảng
export interface BaseTableProps extends Omit<TableProps, 'columns' | 'rowKey'> {
  rowKey?: string;
  columns: TableColumn[];
}

// Thao tác bảng
export type TableOptions<T = object> = (value: unknown, record: T, index?: number) => ReactNode;
