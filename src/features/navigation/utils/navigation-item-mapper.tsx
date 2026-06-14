import {
  IconHome,
  IconHomeFilled,
  IconMovie,
  IconPlus,
  IconSearch,
  IconSend,
  IconSendFilled,
  IconShoppingBag,
} from '@tabler/icons-react';

import { Avatar } from '@/shared/components/ui/avatar';
import { BOTTOM_NAV_ICON_CLASS } from '@/config/ui';
import { NAVIGATION_ITEM_IDS } from '../constants/navigation.constants';
import { NavigationIds } from '../constants/navigation.constants';

type NavigationIconProps = {
  active: boolean;
};

export const navigationItemMapper: Record<
  NavigationIds,
  React.ComponentType<NavigationIconProps>
> = {
  [NAVIGATION_ITEM_IDS.profile]: () => <Avatar />,

  [NAVIGATION_ITEM_IDS.explore]: ({ active }) => (
    <IconSearch
      className={BOTTOM_NAV_ICON_CLASS}
      strokeWidth={active ? 2.25 : 1.25}
    />
  ),

  [NAVIGATION_ITEM_IDS.reels]: ({ active }) => (
    <IconMovie
      className={BOTTOM_NAV_ICON_CLASS}
      strokeWidth={active ? 2 : 1.25}
    />
  ),

  [NAVIGATION_ITEM_IDS.inbox]: ({ active }) =>
    active ? (
      <IconSendFilled className={BOTTOM_NAV_ICON_CLASS} />
    ) : (
      <IconSend className={BOTTOM_NAV_ICON_CLASS} strokeWidth={1.25} />
    ),

  [NAVIGATION_ITEM_IDS.shop]: ({ active }) => (
    <IconShoppingBag
      className={BOTTOM_NAV_ICON_CLASS}
      strokeWidth={active ? 2.25 : 1.25}
    />
  ),

  [NAVIGATION_ITEM_IDS.feed]: ({ active }) =>
    active ? (
      <IconHomeFilled className={BOTTOM_NAV_ICON_CLASS} />
    ) : (
      <IconHome className={BOTTOM_NAV_ICON_CLASS} strokeWidth={1.25} />
    ),

  [NAVIGATION_ITEM_IDS['create-content']]: () => (
    <IconPlus className='size-6 text-white' strokeWidth={3.5} />
  ),
};
