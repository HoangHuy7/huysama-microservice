import type { SideMenu } from '#/public';

export const demo: SideMenu[] = [
  {
    label: 'Thành phần',
    labelEn: 'Components',
    key: '/demo',
    icon: 'fluent:box-20-regular',
    children: [
      {
        label: 'Bảng nhớ tạm',
        labelEn: 'Copy',
        key: '/demo/copy',
        rule: '/demo/copy',
      },
      {
        label: 'Hình mờ',
        labelEn: 'Watermark',
        key: '/demo/watermark',
        rule: '/demo/watermark',
      },
      {
        label: 'Cuộn ảo',
        labelEn: 'Virtual Scroll',
        key: '/demo/virtualScroll',
        rule: '/demo/virtualScroll',
      },
      {
        label: 'Trình soạn thảo',
        labelEn: 'Editor',
        key: '/demo/editor',
        rule: '/demo/editor',
      },
      {
        label: 'Huy',
        labelEn: 'Huy',
        key: '/demo/huy',
        rule: '/demo/huy',
      },
      {
        label: 'Cấp 1',
        labelEn: 'Level1',
        key: '/demo/level1',
        children: [
          {
            label: 'Huy',
            labelEn: 'Huy',
            key: '/demo/level1/huy',
            rule: '/demo/huy',
          },
          {
            label: 'Cấp 2',
            labelEn: 'Level2',
            key: '/demo/level1/level2',
            children: [
              {
                label: 'Cấp 3',
                labelEn: 'Level3',
                key: '/demo/level1/level2/level3',
                rule: '/demo/watermark',
              }
            ]
          }
        ]
      },
    ]
  }
];
