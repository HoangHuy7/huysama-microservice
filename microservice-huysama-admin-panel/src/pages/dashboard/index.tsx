import { searchList } from './model';
import { useActivate } from 'react-activation';
import { getDataTrends } from '@/servers/dashboard';
import Bar from './components/Bar';
import Line from './components/Line';
import Block from './components/Block';

// Khởi tạo tìm kiếm
const initSearch = {
  pay_date: ['2022-10-19', '2022-10-29']
};

function Dashboard() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const { permissions, isPhone } = useCommonStore();
  const isPermission = checkPermission('/dashboard', permissions);

  /**
   * Nhấn tìm kiếm
   * @param values - Dữ liệu trả về từ form
   */
  const handleSearch = useCallback(async (values: BaseFormData) => {
    // Chuyển đổi dữ liệu
    values.all_pay = values.all_pay ? 1 : undefined;

    const query = { ...values };
    try {
      setLoading(true);
      await getDataTrends(query);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSearch(initSearch);
  }, [handleSearch]);

  useActivate(() => {
    console.log('进入和退出时执行');

    return () => {
      console.log('退出时执行');
    };
  });

  useActivate(() => {
    console.log('第二次进入和退出时执行');

    return () => {
      console.log('第二次退出时执行');
    };
  });

  return (
    <BaseContent isPermission={isPermission}>
      <BaseCard>
        <BaseSearch
          list={searchList(t)}
          data={initSearch}
          initialValues={initSearch}
          isLoading={isLoading}
          handleFinish={handleSearch}
        />
      </BaseCard>

      <BaseCard className='mt-10px'>
        <div className='pt-10px'>
          <Block />
        </div>

        <div className='flex flex-wrap justify-between w-full'>
          <div className={`mb-10px ${isPhone ? 'w-full' : 'w-49.5%'}`}>
            <Line />
          </div>
          <div className={`mb-10px ${isPhone ? 'w-full' : 'w-49.5%'}`}>
            <Bar />
          </div>
        </div>
      </BaseCard>
    </BaseContent>
  );
}

export default Dashboard;
