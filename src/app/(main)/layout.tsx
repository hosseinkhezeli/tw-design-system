import { BottomNavigation } from '@/features/navigation/components/bottom-navigation';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='max-w-xl min-h-svh mx-auto w-full overflow-hidden pb-20'>
        {children}
      </main>
      <BottomNavigation />
    </>
  );
}
