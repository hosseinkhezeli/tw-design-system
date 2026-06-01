import { BottomNavigation } from '@/features/navigation/components/bottom-navigation';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <BottomNavigation />
    </main>
  );
}
