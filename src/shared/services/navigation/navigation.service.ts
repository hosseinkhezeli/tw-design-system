'use client';
import { APP_ROUTES } from '@/shared/config/app-routes';
import { useRouter } from 'next/navigation';

export class NavigationService {
  private router: ReturnType<typeof useRouter> | null = null;
  private pendingActions: Array<() => void> = [];

  setRouter(router: ReturnType<typeof useRouter>) {
    this.router = router;
    this.pendingActions.forEach((fn) => fn());
    this.pendingActions = [];
  }

  private safeNavigate = (action: () => void) => {
    if (this.router) {
      action();
    } else {
      this.pendingActions.push(action);
      console.warn('Navigation called before router was set. Queued.');
    }
  };

  // All public methods as arrow functions
  goToFeed = () => this.safeNavigate(() => this.router?.push(APP_ROUTES.feed));

  goToRegister = () =>
    this.safeNavigate(() => this.router?.push(APP_ROUTES.auth.register));

  goToInbox = () =>
    this.safeNavigate(() => this.router?.push(APP_ROUTES.inbox));

  goToReels = () =>
    this.safeNavigate(() => this.router?.push(APP_ROUTES.reels));

  goToShop = () => this.safeNavigate(() => this.router?.push(APP_ROUTES.shop));

  goToExplore = () =>
    this.safeNavigate(() => this.router?.push(APP_ROUTES.explore));

  goToProfileMe = () =>
    this.safeNavigate(() => this.router?.push(APP_ROUTES.profile.me));

  goToUserProfile = (id: string) =>
    this.safeNavigate(() => this.router?.push(APP_ROUTES.profile.user(id)));

  goToLogin = () =>
    this.safeNavigate(() => this.router?.push(APP_ROUTES.auth.login));

  back = () => this.safeNavigate(() => this.router?.back());

  replace = (path: string) =>
    this.safeNavigate(() => this.router?.replace(path));
}
