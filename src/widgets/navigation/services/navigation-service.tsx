import { APP_ROUTES } from '@/shared/config/app-routes';
import { NAVIGATION_ITEM_IDS } from '../constants/navigation.constants';
import { NavigationItemModel } from '../models/navigation-item.model';
import { QUERY_PARAM_KEYS } from '@/shared/config/query-param-keys';
import { CREATE_POST_STEPS } from '@/features/post/create/constants/post.constants';
import { buildUrl } from '@/shared/config/url.config';

export class NavigationService {
  static getNavigationItems(): NavigationItemModel[] {
    return [
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.feed,
        href: APP_ROUTES.feed,
        label: 'خانه',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.categories,
        href: APP_ROUTES.categories,
        label: 'دسته‌ها',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS['create-content'],
        href: buildUrl({
          [QUERY_PARAM_KEYS.new_content_sheet]: 'true',
          [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.SOURCE,
        }),
        label: null,
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.shop,
        href: APP_ROUTES.shop,
        label: 'بازار',
      }),
      new NavigationItemModel({
        id: NAVIGATION_ITEM_IDS.profile,
        href: APP_ROUTES.profile.user('me'),
        label: 'پروفایل',
      }),
    ];
  }
}
