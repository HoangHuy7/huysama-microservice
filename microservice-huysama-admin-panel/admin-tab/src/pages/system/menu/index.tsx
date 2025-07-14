import type { BaseFormData } from '#/form';
import type { PagePermission } from '#/public';
import { type FormInstance, message } from 'antd';
import { searchList, createList, tableColumns } from './model';
import {
  getMenuPage,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from '@/servers/system/menu';

// Dữ liệu dòng hiện tại
interface RowData {
  id: string;
}

// Khởi tạo dữ liệu thêm mới
const initCreate = {
  status: 1
};

function Page() {
  const { t } = useTranslation();
  const createFormRef = useRef<FormInstance>(null);
  const columns = tableColumns(t, optionRender);
  const [isFetch, setFetch] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCreateLoading, setCreateLoading] = useState(false);
  const [createTitle, setCreateTitle] = useState(ADD_TITLE(t));
  const [createId, setCreateId] = useState('');
  const [createData, setCreateData] = useState<BaseFormData>(initCreate);
  const [searchData, setSearchData] = useState<BaseFormData>({});
  const [page, setPage] = useState(INIT_PAGINATION.page);
  const [pageSize, setPageSize] = useState(INIT_PAGINATION.pageSize);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<BaseFormData[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { permissions } = useCommonStore();

  // Tiền tố quyền hạn
  const permissionPrefix = '/authority/menu';

  // Quyền hạn
  const pagePermission: PagePermission = {
    page: checkPermission(`${permissionPrefix}/index`, permissions),
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
    delete: checkPermission(`${permissionPrefix}/delete`, permissions)
  };

  /** Lấy dữ liệu bảng */
  const getPage = useCallback(async () => {
    const params = { ...searchData, page, pageSize };

    try {
      setLoading(true);
      const res = await getMenuPage(params);
      const { code, data } = res;
      if (Number(code) !== 200) return;
      const { items, total } = data;
      setTotal(total || 0);
      setTableData(items || []);
    } finally {
      setFetch(false);
      setLoading(false);
    }
  }, [page, pageSize, searchData]);

  useEffect(() => {
    if (isFetch) getPage();
  }, [getPage, isFetch]);

  /**
   * Nhấn tìm kiếm
   * @param values - Dữ liệu trả về từ form
   */
  const onSearch = (values: BaseFormData) => {
    setPage(1);
    setSearchData(values);
    setFetch(true);
  };

  // Tự động tải dữ liệu khi vào trang lần đầu
  useEffect(() => {
    if (pagePermission.page) getPage();
    // TODO: Kiểm tra gọi lặp lại, có thể xóa
    if (pagePermission.page) getPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePermission.page]);

  /** Nhấn thêm mới */
  const onCreate = () => {
    setCreateOpen(true);
    setCreateTitle(ADD_TITLE(t));
    setCreateId('');
    setCreateData(initCreate);
  };

  /**
   * Nhấn chỉnh sửa
   * @param id - Giá trị duy nhất
   */
  const onUpdate = async (id: string) => {
    try {
      setCreateOpen(true);
      setCreateTitle(EDIT_TITLE(t, id));
      setCreateId(id);
      setCreateLoading(true);
      const { code, data } = await getMenuById(id);
      if (Number(code) !== 200) return;
      setCreateData(data);
    } finally {
      setCreateLoading(false);
    }
  };

  /** Gửi form */
  const createSubmit = () => {
    createFormRef?.current?.submit();
  };

  /** Đóng popup thêm/sửa */
  const closeCreate = () => {
    setCreateOpen(false);
  };

  /**
   * Gửi thêm mới/chỉnh sửa
   * @param values - Dữ liệu trả về từ form
   */
  const handleCreate = async (values: BaseFormData) => {
    try {
      setCreateLoading(true);
      const functions = () => createId ? updateMenu(createId, values) : createMenu(values);
      const { code, message } = await functions();
      if (Number(code) !== 200) return;
      messageApi.success(message || t('public.successfulOperation'));
      setCreateOpen(false);
      getPage();
    } finally {
      setCreateLoading(false);
    }
  };

  /**
   * Nhấn xóa
   * @param id - Giá trị duy nhất
   */
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const { code, message } = await deleteMenu(id);
      if (Number(code) === 200) {
        messageApi.success(message || t('public.successfullyDeleted'));
        getPage();
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xử lý phân trang
   * @param page - Trang hiện tại
   * @param pageSize - Số dòng mỗi trang
   */
  const onChangePagination = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    setFetch(true);
  }, []);

  /**
   * Render thao tác
   * @param _ - Giá trị hiện tại
   * @param record - Tham số dòng hiện tại
   */
  function optionRender(_: unknown, record: object) {
    return <>
      {
        pagePermission.update === true &&
        <UpdateBtn
          className='mr-5px'
          onClick={() => onUpdate((record as RowData).id)}
        />
      }
      {
        pagePermission.delete === true &&
        <DeleteBtn
          className='mr-5px'
          handleDelete={() => onDelete((record as RowData).id)}
        />
      }
    </>;
  }

  return (
    <BaseContent isPermission={pagePermission.page}>
      { contextHolder }
      <BaseCard>
        <BaseSearch
          list={searchList(t)}
          data={searchData}
          isLoading={isLoading}
          handleFinish={onSearch}
        />
      </BaseCard>

      <BaseCard className='mt-10px'>
        <BaseTable
          isLoading={isLoading}
          isCreate={pagePermission.create}
          columns={columns}
          dataSource={tableData}
          getPage={getPage}
          onCreate={onCreate}
        />

        <BasePagination
          disabled={isLoading}
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onChangePagination}
        />
      </BaseCard>

      <BaseModal
        width={600}
        title={createTitle}
        open={isCreateOpen}
        confirmLoading={isCreateLoading}
        onOk={createSubmit}
        onCancel={closeCreate}
      >
        <BaseForm
          ref={createFormRef}
          list={createList(t, createId)}
          data={createData}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          handleFinish={handleCreate}
        />
      </BaseModal>
    </BaseContent>
  );
}

export default Page;
