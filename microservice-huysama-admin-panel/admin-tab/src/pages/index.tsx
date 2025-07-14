import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirstMenu } from '@/menus/utils/helper';
import { useCommonStore } from '@/hooks/useCommonStore';

function Page() {
  const { permissions, menuList } = useCommonStore();
  const navigate = useNavigate();

  /** Chuyển hướng đến đường dẫn menu hợp lệ đầu tiên */
  const goFirstMenu = useCallback(() => {
    const firstMenu = getFirstMenu(menuList, permissions);
    navigate(firstMenu);
  }, [menuList, navigate, permissions]);

  useEffect(() => {
    // Chuyển hướng đến đường dẫn menu hợp lệ đầu tiên
    goFirstMenu();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuList, permissions]);

  return (
    <div></div>
  );
}

export default Page;
