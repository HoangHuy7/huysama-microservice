import { searchList, tableColumns } from './model';
import { message } from 'antd';
import { getArticlePage, deleteArticle } from '@/servers/content/article';

// Dữ liệu dòng hiện tại
interface RowData {
  id: string;
}

function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { permissions } = useCommonStore();
  const [isFetch, setFetch] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<BaseFormData>({});
  const [page, setPage] = useState(INIT_PAGINATION.page);
  const [pageSize, setPageSize] = useState(INIT_PAGINATION.pageSize);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<BaseFormData[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const setRefreshPage = usePublicStore(state => state.setRefreshPage);
  const isRefreshPage = usePublicStore(state => state.isRefreshPage);

  // Tiền tố quyền hạn
  const permissionPrefix = '/content/article';

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
      const { code, data } = await getArticlePage(params);

      if (Number(code) === 200) {
        const { items, total } = data;
        setTotal(total);
        setTableData(items);
      }
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
    if (pagePermission.page && !isRefreshPage) getPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePermission.page]);

  // Nếu thêm mới hoặc chỉnh sửa thành công thì tải lại trang
  useEffect(() => {
    if (isRefreshPage) {
     setRefreshPage(false);
      getPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshPage]);

  /** Nhấn thêm mới */
  const onCreate = () => {
    navigate('/content/article/option?type=create');
  };

  /**
   * Nhấn chỉnh sửa
   * @param id - Giá trị duy nhất
   */
  const onUpdate = (id: string) => {
    navigate(`/content/article/option?type=update&id=${id}`);
  };

  /**
   * Nhấn xóa
   * @param id - Giá trị duy nhất
   */
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const { code, message } = await deleteArticle(id);
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
   * Render thao tác
   * @param _ - Giá trị hi
   */
  const optionRender: TableOptions<object> = (_, record) => (
    <>
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
    </>
  );

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
          columns={tableColumns(t, optionRender)}
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
    </BaseContent>
  );
}

export default Page;
