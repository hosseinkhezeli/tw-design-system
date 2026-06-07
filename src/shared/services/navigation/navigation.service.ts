'use client';

import { APP_ROUTES } from '@/config/app-routes';
import { useRouter } from 'next/navigation';

export class NavigationService {
  private router: ReturnType<typeof useRouter> | null = null;

  setRouter(router: ReturnType<typeof useRouter>) {
    this.router = router;
  }

  goToFeed() {
    this.router?.push(APP_ROUTES.feed);
  }

  goToInbox() {
    this.router?.push(APP_ROUTES.inbox);
  }

  goToReels() {
    this.router?.push(APP_ROUTES.reels);
  }

  goToShop() {
    this.router?.push(APP_ROUTES.shop);
  }

  goToExplore() {
    this.router?.push(APP_ROUTES.explore);
  }

  goToProfileMe() {
    this.router?.push(APP_ROUTES.profile.me);
  }

  goToUserProfile(id: string) {
    this.router?.push(APP_ROUTES.profile.user(id));
  }

  goToLogin() {
    this.router?.push(APP_ROUTES.auth.login);
  }

  back() {
    this.router?.back();
  }

  replace(path: string) {
    this.router?.replace(path);
  }
}
