import { DirectionProvider } from './direction-provider';
import { QueryClientProvider } from './query-client-provider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DirectionProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </DirectionProvider>
  );
}
