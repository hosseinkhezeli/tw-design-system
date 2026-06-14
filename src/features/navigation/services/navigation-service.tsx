import { APP_ROUTES } from '@/config/app-routes';
import { NAVIGATION_ITEM_IDS } from '../constants/navigation.constants';
import { NavigationItemModel } from '../models/navigation-item.model';
import { QUERY_PARAM_KEYS } from '@/config/query-param-keys';
import { CREATE_POST_STEPS } from '@/features/post/constants/post.constants';
import { buildUrl } from '@/shared/config/url.config';

export class NavigationService {
  static getNavigationItems(): NavigationItemModel[] {
    return [
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.profile,
        href: APP_ROUTES.profile.user('me'),
        label: 'پروفایل',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.explore,
        href: APP_ROUTES.explore,
        label: 'اکسپلور',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.reels,
        href: APP_ROUTES.reels,
        label: 'ریلز',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS['create-content'],
        href: buildUrl({
          [QUERY_PARAM_KEYS.new_content_sheet]: 'true',
          [QUERY_PARAM_KEYS.new_content_step]:
            CREATE_POST_STEPS.SOURCE_SELECTION,
        }),
        label: null,
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.inbox,
        href: APP_ROUTES.inbox,
        label: 'پیام‌ها',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.shop,
        href: APP_ROUTES.shop,
        label: 'فروشگاه',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.feed,
        href: APP_ROUTES.feed,
        label: 'خانه',
      }),
    ];
  }
}
