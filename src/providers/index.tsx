import { AuthProvider } from './auth-provider';
import { DirectionProvider } from './direction-provider';
import { NavigationProvider } from './navigation-provider';
import { QueryClientProvider } from './query-client-provider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DirectionProvider>
      <AuthProvider>
        {/* <NavigationProvider> */}
          <QueryClientProvider>{children}</QueryClientProvider>
        {/* </NavigationProvider> */}
      </AuthProvider>
    </DirectionProvider>
  );
}
