import type { DataNode } from 'antd/es/tree';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import { type FormInstance, Button, message } from 'antd';
import { createList, searchList, tableColumns } from './model';
import { getPermission, savePermission } from '@/servers/system/menu';
import {
  batchDeleteUser,
  createUser,
  deleteUser,
  getUserById,
  getUserPage,
  updateUser
} from '@/servers/system/user';
import PermissionDrawer from './components/PermissionDrawer';

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
  const [messageApi, contextHolder] = message.useMessage();
  const [isFetch, setFetch] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCreateLoading, setCreateLoading] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState(ADD_TITLE(t));
  const [createId, setCreateId] = useState('');
  const [createData, setCreateData] = useState<BaseFormData>(initCreate);
  const [searchData, setSearchData] = useState<BaseFormData>({});
  const [page, setPage] = useState(INIT_PAGINATION.page);
  const [pageSize, setPageSize] = useState(INIT_PAGINATION.pageSize);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<BaseFormData[]>([]);

  const [promiseId, setPromiseId] = useState('');
  const [isPromiseVisible, setPromiseVisible] = useState(false);
  const [promiseCheckedKeys, setPromiseCheckedKeys] = useState<Key[]>([]);
  const [promiseTreeData, setPromiseTreeData] = useState<DataNode[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { permissions } = useCommonStore();

  // Tiền tố quyền hạn
  const permissionPrefix = '/authority/user';

  // Quyền hạn
  const pagePermission: PagePermission = {
    page: checkPermission(`${permissionPrefix}/index`, permissions),
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
    delete: checkPermission(`${permissionPrefix}/delete`, permissions),
    permission: checkPermission(`${permissionPrefix}/authority`, permissions)
  };

  /** Lấy dữ liệu bảng */
  const getPage = useCallback(async () => {
    const params = { ...searchData, page, pageSize };

    try {
      setLoading(true);
      const { code, data } = await getUserPage(params);
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

  // Tự động tải dữ liệu khi vào lần đầu
  useEffect(() => {
    if (pagePermission.page) getPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePermission.page]);

  /** Mở quyền hạn */
  const openPermission = async (id: string) => {
    try {
      setLoading(true);
      const params = { userId: id };
      const { code, data } = await getPermission(params);
      if (Number(code) !== 200) return;
      const { defaultCheckedKeys, treeData } = data;
      setPromiseId(id);
      setPromiseTreeData(treeData);
      setPromiseCheckedKeys(defaultCheckedKeys);
      setPromiseVisible(true);
    } finally {
      setLoading(false);
    }
  };

  /** Đóng quyền hạn */
  const closePermission = () => {
    setPromiseVisible(false);
  };

  /**
   * Gửi quyền hạn
   */
  const permissionSubmit = async (checked: Key[]) => {
    try {
      setLoading(true);
      const params = {
        menuIds: checked,
        userId: promiseId
      };
      const { code, message } = await savePermission(params);
      if (Number(code) !== 200) return;
      messageApi.success(message || t('system.authorizationSuccessful'));
      setPromiseVisible(false);
    } finally {
      setLoading(false);
    }
  };

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
      const { code, data } = await getUserById(id);
      if (Number(code) !== 200) return;
      setCreateData(data);
    } finally {
      setCreateLoading(false);
    }
  };

  /** Gửi bảng */
  const createSubmit = () => {
    createFormRef.current?.submit();
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
      const functions = () => createId ? updateUser(createId, values) : createUser(values);
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
      const { code, message } = await deleteUser(id);
      if (Number(code) === 200) {
        messageApi.success(message || t('public.successfullyDeleted'));
        getPage();
      }
    } finally {
      setLoading(false);
    }
  };

  /** Xử lý xóa hàng loạt */
  const handleBatchDelete = async () => {
    try {
      if (!selectedRowKeys.length) {
        return messageApi.warning({
          content: t('public.tableSelectWarning'),
          key: 'pleaseSelect',
        });
      }
      setLoading(true);
      const params = { ids: selectedRowKeys };
      const { code, message } = await batchDeleteUser(params);
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
   * @param pageSize - Số lượng mỗi trang
   */
  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    setFetch(true);
  };

  /**
   * Lắng nghe thay đổi chọn nhiều dòng bảng
   * @param newSelectedRowKeys - Giá trị đã chọn
   */
  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  /** Bảng chọn nhiều dòng  */
  const rowSelection: TableRowSelection<object> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  /**
   * Render thao tác
   * @param _ - Giá trị hiện tại
   * @param record - Tham số dòng hiện tại
   */
  function optionRender(_: unknown, record: object) {
    return <>
      {
        pagePermission.permission === true &&
        <Button
          className='mr-2 small-btn'
          onClick={() => openPermission((record as RowData).id)}
        >
          { t('system.permissions') }
        </Button>
      }
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

  /** Render bên trái */
  const leftContentRender = (
    <DeleteBtn
      isIcon
      isLoading={isLoading}
      name={t('public.batchDelete')}
      handleDelete={handleBatchDelete}
    />
  );

  return (
    <BaseContent isPermission={pagePermission.page}>
      { contextHolder }
      <BaseCard>
        <BaseSearch
          list={searchList(t)}
          data={searchData}
          type='grid'
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
          rowSelection={rowSelection}
          leftContent={leftContentRender}
          rightContent={<div>demo</div>}
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
        title={createTitle}
        open={isCreateOpen}
        confirmLoading={isCreateLoading}
        onOk={createSubmit}
        onCancel={closeCreate}
      >
        <BaseForm
          ref={createFormRef}
          list={createList(t)}
          data={createData}
          labelCol={{ span: 6 }}
          handleFinish={handleCreate}
        />
      </BaseModal>

      <PermissionDrawer
        isVisible={isPromiseVisible}
        treeData={promiseTreeData}
        checkedKeys={promiseCheckedKeys}
        onClose={closePermission}
        onSubmit={permissionSubmit}
      />
    </BaseContent>
  );
}

export default Page;
