import type {
  InputProps,
  InputNumberProps,
  SelectProps,
  TreeSelectProps,
  RadioProps,
  DatePickerProps,
  TimePickerProps,
  UploadProps,
  RateProps,
  CheckboxProps,
  SliderSingleProps,
  TimeRangePickerProps,
  TransferProps,
  FormItemProps,
} from "antd";
import type {Key, ReactNode} from "react";
import type {RangePickerProps} from 'antd/lib/date-picker';
import type {DefaultOptionType} from 'antd/lib/select';
import type {RuleObject} from 'antd/lib/form';
import type {ServerResult} from "@south/request";
import type {BusinessComponents} from '@/components/Business';
import type {EditorProps} from '@/components/WangEditor';

// Kiểu dữ liệu
export type BaseFormData = Record<string, unknown>

// Component dữ liệu cơ bản
type DefaultDataComponents = 'Input' |
  'InputNumber' |
  'TextArea' |
  'InputPassword' |
  'AutoComplete' |
  'customize'

// Component dropdown
type SelectComponents = 'Select' | 'TreeSelect' | 'ApiSelect' | 'ApiTreeSelect'

// Component checkbox
type CheckboxComponents = 'Checkbox' | 'CheckboxGroup'

// Component radio
type RadioComponents = 'RadioGroup' | 'Switch'

// Component thời gian
type TimeComponents = 'DatePicker' | 'RangePicker' | 'TimePicker' | 'TimeRangePicker'

// Component upload
type UploadComponents = 'Upload'

// Component đánh giá sao
type RateComponents = 'Rate'

// Component truyền
type TransferComponents = 'Transfer'

// Component thanh trượt
type SliderComponents = 'Slider'

// Component tùy chỉnh
type CustomizeComponents = 'Customize'

// Component soạn thảo văn bản
type EditorComponents = 'RichEditor'

// Component độ mạnh mật khẩu
type PasswordStrength = 'PasswordStrength'

// Tập hợp component
export type ComponentType = DefaultDataComponents |
  SelectComponents |
  CheckboxComponents |
  TimeComponents |
  RadioComponents |
  CustomizeComponents |
  UploadComponents |
  RateComponents |
  SliderComponents |
  EditorComponents |
  PasswordStrength |
  TransferComponents |
  BusinessComponents

export interface ApiResult extends Omit<DefaultOptionType, 'value'> {
  label: ReactNode;
  title?: ReactNode;
  key?: Key;
  value?: string | number;
}

export type ApiFn = {
  <T extends unknown[]>(...params: T): Promise<ServerResult<unknown>>;
}

// Tham số api
interface ApiParam {
  api?: ApiFn;
  params?: object | unknown[];
  apiResultKey?: string;
}

// ApiSelect
export type ApiSelectProps = ApiParam & SelectProps

// ApiTreeSelect
export type ApiTreeSelectProps = ApiParam & TreeSelectProps

// Tham số component
export type ComponentProps = InputProps |
  InputNumberProps |
  SelectProps |
  TreeSelectProps |
  CheckboxProps |
  RadioProps |
  DatePickerProps |
  TimePickerProps |
  UploadProps |
  RateProps |
  SliderSingleProps |
  TimeRangePickerProps |
  TransferProps |
  RangePickerProps |
  ApiSelectProps |
  ApiTreeSelectProps |
  EditorProps

// Tham số component
export type RenderComponentProps = InputProps &
  InputNumberProps &
  SelectProps &
  TreeSelectProps &
  CheckboxProps &
  RadioProps &
  DatePickerProps &
  TimePickerProps &
  UploadProps &
  RateProps &
  SliderSingleProps &
  TimeRangePickerProps &
  TransferProps &
  RangePickerProps &
  ApiSelectProps &
  ApiTreeSelectProps &
  EditorProps

// Quy tắc form
export type FormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
}

// Dữ liệu form
export interface BaseFormList extends FormItemProps {
  name: string | string[]; // Trường form
  label: string; // Nhãn
  placeholder?: string; // Placeholder
  hidden?: boolean; // Ẩn/hiện
  unit?: string; // Đơn vị, không thể hiển thị cùng với extra
  rules?: FormRule[]; // Quy tắc
  labelWidth?: number; // Độ rộng label
  wrapperWidth?: number; // Độ rộng nội dung
  component: ComponentType; // Component
  componentProps?: ComponentProps; // Tham số component
  render?: (props: RenderComponentProps) => ReactNode; // Tùy chỉnh render
}

// Dữ liệu tìm kiếm
export interface BaseSearchList extends BaseFormList {
  labelWidth?: number; // Sử dụng tạm thời
  // TODO...
}
