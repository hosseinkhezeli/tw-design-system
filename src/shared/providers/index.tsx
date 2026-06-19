import { AuthProvider } from './auth-provider';
import { DirectionProvider } from './direction-provider';
import { NavigationProvider } from './navigation-provider';
import NuqsProvider from './nuqs-provider';
import { QueryClientProvider } from './query-client-provider';
import { ToastProvider } from './toast-provider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationProvider>
      <NuqsProvider>
        <DirectionProvider>
          <ToastProvider>
            <AuthProvider>
              <QueryClientProvider>{children}</QueryClientProvider>
            </AuthProvider>
          </ToastProvider>
        </DirectionProvider>
      </NuqsProvider>
    </NavigationProvider>
  );
}
