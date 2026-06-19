import { APP_ROUTES } from '@/shared/config/app-routes';
import { redirect } from 'next/navigation';

export default function MainPage() {
  return redirect(APP_ROUTES.explore);
}
