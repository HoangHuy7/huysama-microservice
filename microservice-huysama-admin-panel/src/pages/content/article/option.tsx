import { type FormInstance, message, Spin } from 'antd';
import { createList } from './model';
import { getUrlParam } from '@/utils/helper';
import { useAliveController } from 'react-activation';
import {
  getArticleById,
  createArticle,
  updateArticle,
} from '@/servers/content/article';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

// Khởi tạo dữ liệu thêm mới
const initCreate = {
  content: '<h4>初始化内容</h4>',
  transfer: initialTargetKeys
};

// Đường dẫn cha
const fatherPath = '/content/article';

function Page() {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const uri = pathname + search;
  const id = getUrlParam(search, 'id');
  const createFormRef = useRef<FormInstance>(null);
  const [isLoading, setLoading] = useState(false);
  const [createId, setCreateId] = useState('');
  const [createData, setCreateData] = useState<BaseFormData>(initCreate);
  const [messageApi, contextHolder] = message.useMessage();
  const { permissions } = useCommonStore();
  const { dropScope } = useAliveController();
  const closeTabGoNext = useTabsStore(state => state.closeTabGoNext);
  const setRefreshPage = usePublicStore(state => state.setRefreshPage);
  useSingleTab({
    fatherPath,
    zhTitle: id ? '编辑文章管理' : '新增文章管理',
    enTitle: id ? 'Edit Article Management' : 'Add Article Management',
  });

  // Tiền tố quyền hạn
  const permissionPrefix = '/content/article';

  // Quyền hạn
  const pagePermission: PagePermission = {
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
  };

  useEffect(() => {
    if (id) {
      handleUpdate(id);
    } else {
      handleCreate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Thêm thành phần văn bản phức tạp
  useLayoutEffect(() => {
    addComponent('RichEditor', WangEditor);
  }, []);

  /** Xử lý thêm mới */
  const handleCreate = () => {
    setCreateId('');
    setCreateData(initCreate);
  };

  /**
   * Xử lý chỉnh sửa
   * @param id - Giá trị duy nhất
   */
   const handleUpdate = async (id: string) => {
    try {
      setCreateId(id);
      setLoading(true);
      const { code, data } = await getArticleById(id);
      if (Number(code) !== 200) return;
      setCreateData(data);
    } finally {
      setLoading(false);
    }
  };

  /** Gửi bảng */
  const handleSubmit = () => {
    createFormRef.current?.submit();
  };

  /**
   * Quay về trang chủ
   * @param isRefresh - Trang có được tải lại không
   */
  const goBack = (isRefresh?: boolean) => {
    createFormRef.current?.resetFields();
    if (isRefresh) setRefreshPage(true);
    closeTabGoNext({
      key: uri,
      nextPath: fatherPath,
      dropScope
    });
  };

  /**
   * Gửi thêm mới/chỉnh sửa
   * @param values - Dữ liệu trả về từ form
   */
  const handleFinish = async (values: BaseFormData) => {
    try {
      setLoading(true);
      const functions = () => createId ? updateArticle(createId, values) : createArticle(values);
      const { code, message } = await functions();
      if (Number(code) !== 200) return;
      messageApi.success(message || t('public.successfulOperation'));
      createFormRef.current?.resetFields();
      goBack(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseContent isPermission={id ? pagePermission.update : pagePermission.create}>
      { contextHolder }
      <div className='!h-[calc(100vh-98px)] '>
        <BaseCard>
          <div className='mb-50px'>
            <Spin spinning={isLoading}>
              <BaseForm
                ref={createFormRef}
                list={createList(t)}
                data={createData}
                labelCol={{ span: 5 }}
                handleFinish={handleFinish}
              />
            </Spin>
          </div>
        </BaseCard>
      </div>

      <SubmitBottom
        isLoading={isLoading}
        goBack={() => goBack()}
        handleSubmit={handleSubmit}
      />
    </BaseContent>
  );
}

export default Page;
