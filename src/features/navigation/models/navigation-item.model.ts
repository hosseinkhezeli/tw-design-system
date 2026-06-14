import { NavigationIds } from '../constants/navigation.constants';

export class NavigationItemModel {
  constructor(
    public readonly args: {
      id: NavigationIds;
      href: string | null;
      label: string | null;
    },
  ) {}
}
