import type { InputProps } from 'antd';
import { Input } from 'antd';

/**
 * Tùy chỉnh đầu vào
 */
function CustomizeInput(props: InputProps) {
  const { t } = useTranslation();

  return (
    <>
      <Input {...props} placeholder={t('public.inputPleaseEnter')} />
      <div className='mb-5px text-red'>
        { t('content.sensitiveInfo') }
      </div>
    </>
  );
}

export default CustomizeInput;