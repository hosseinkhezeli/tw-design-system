import { ReactNode } from 'react';

export class NavigationItemModel {
  constructor(
    public readonly args: {
      id: string;
      href: string;
      label: string;
      renderIcon: (active: boolean) => ReactNode;
    },
  ) {}
}
