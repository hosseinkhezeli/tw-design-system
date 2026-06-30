import {
  IconAlertTriangle,
  IconArticle,
  IconBookmark,
  IconHeart,
  IconMessageCircle2,
  IconReceipt2,
  IconScale,
  IconSettings,
  IconShield,
  IconShoppingCart,
//   IconShoppingBag,
} from '@tabler/icons-react';

import { APP_ROUTES } from '@/shared/config/app-routes';

export const PROFILE_MENU_GROUPS = [
  {
    title: 'Commerce',
    items: [
      {
        label: 'سفارش‌ها',
        href: APP_ROUTES.orders,
        icon: IconReceipt2,
      },
      {
        label: 'سبد خرید',
        href: APP_ROUTES.cart,
        icon: IconShoppingCart,
      },
      {
        label: 'علاقه‌مندی‌ها',
        href: APP_ROUTES.wishlist,
        icon: IconHeart,
      },
    ],
  },

  {
    title: 'Activity',
    items: [
      {
        label: 'لایک‌ها',
        href: APP_ROUTES.profile.likes,
        icon: IconHeart,
      },
      {
        label: 'نشان‌شده‌ها',
        href: APP_ROUTES.profile.bookmarks,
        icon: IconBookmark,
      },
      {
        label: 'نظرات',
        href: APP_ROUTES.profile.comments,
        icon: IconMessageCircle2,
      },
      {
        label: 'پست‌ها',
        href: APP_ROUTES.profile.posts,
        icon: IconArticle,
      },
      {
        label: 'گزارش‌ها',
        href: APP_ROUTES.profile.reports,
        icon: IconAlertTriangle,
      },
    ],
  },

  /*
  {
    title: 'Seller',
    items: [
      {
        label: 'سفارش‌های شاپ',
        href: APP_ROUTES.seller.manage.orders,
        icon: IconReceipt2,
      },
      {
        label: 'محصولات',
        href: APP_ROUTES.seller.manage.products,
        icon: IconShoppingBag,
      },
      {
        label: 'آنالیتیکس',
        href: APP_ROUTES.seller.manage.analytics,
        icon: IconChartBar,
      },
      {
        label: 'موجودی',
        href: APP_ROUTES.seller.manage.inventory,
        icon: IconPackages,
      },
      {
        label: 'تخفیف‌ها',
        href: APP_ROUTES.seller.manage.discounts,
        icon: IconDiscount2,
      },
      {
        label: 'تنظیمات شاپ',
        href: APP_ROUTES.seller.manage.settings,
        icon: IconSettings,
      },
    ],
  },
  */

  {
    title: 'Preferences',
    items: [
      {
        label: 'تنظیمات',
        href: APP_ROUTES.settings,
        icon: IconSettings,
      },
      {
        label: 'قوانین و مقررات',
        href: APP_ROUTES.terms,
        icon: IconScale,
      },
      {
        label: 'حریم خصوصی',
        href: APP_ROUTES.privacy,
        icon: IconShield,
      },
    ],
  },
] as const;
