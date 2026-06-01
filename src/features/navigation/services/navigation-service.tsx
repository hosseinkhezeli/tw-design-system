import { APP_ROUTES } from '@/config/app-routes';
import { NavigationItemModel } from '../models/navigation-item.model';
import { Avatar } from '@/shared/ui/avatar';
import { BOTTOM_NAV_ICON_CLASS } from '@/config/ui';
import {
  IconHome,
  IconHomeFilled,
  IconMovie,
  IconSearch,
  IconSend,
  IconSendFilled,
  IconShoppingBag,
} from '@tabler/icons-react';

export class NavigationService {
  static getNavigationItems(): NavigationItemModel[] {
    return [
      new NavigationItemModel({
        id: 'profile',
        href: APP_ROUTES.profile.byUsername('me'),
        renderIcon: () => <Avatar />,
        label: 'پروفایل',
      }),
      new NavigationItemModel({
        id: 'explore',
        href: APP_ROUTES.explore,
        renderIcon: (active) => (
          <IconSearch
            className={BOTTOM_NAV_ICON_CLASS}
            strokeWidth={active ? 2.25 : 1.25}
          />
        ),
        label: 'اکسپلور',
      }),
      new NavigationItemModel({
        id: 'reels',
        href: APP_ROUTES.reels,
        renderIcon: (active) => (
          <IconMovie
            className={BOTTOM_NAV_ICON_CLASS}
            strokeWidth={active ? 2 : 1.25}
          />
        ),
        label: 'ریلز',
      }),
      new NavigationItemModel({
        id: 'inbox',
        href: APP_ROUTES.inbox,
        renderIcon: (active) =>
          active ? (
            <IconSendFilled className={BOTTOM_NAV_ICON_CLASS} />
          ) : (
            <IconSend className={BOTTOM_NAV_ICON_CLASS} strokeWidth={1.25} />
          ),
        label: 'پیام‌ها',
      }),
      new NavigationItemModel({
        id: 'shop',
        href: APP_ROUTES.shop,
        renderIcon: (active) => (
          <IconShoppingBag
            strokeWidth={active ? 2.25 : 1.25}
            className={BOTTOM_NAV_ICON_CLASS}
          />
        ),
        label: 'فروشگاه',
      }),
      new NavigationItemModel({
        id: 'feed',
        href: APP_ROUTES.feed,
        renderIcon: (active) =>
          active ? (
            <IconHomeFilled className={BOTTOM_NAV_ICON_CLASS} />
          ) : (
            <IconHome className={BOTTOM_NAV_ICON_CLASS} strokeWidth={1.25} />
          ),
        label: 'خانه',
      }),
    ];
  }
}
