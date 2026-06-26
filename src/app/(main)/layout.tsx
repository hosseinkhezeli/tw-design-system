import { BottomNavigation } from '@/widgets/navigation/components/bottom-navigation';
import { CreatePostWidget } from '@/widgets/post/ui/create-post-widget';
import { Suspense } from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='flex flex-col max-w-xl min-h-[calc(100dvh-65px)] mx-auto w-full overflow-hidden'>
        {children}
      </main>
      <Suspense fallback={null}>
        <BottomNavigation />
      </Suspense>
      <Suspense fallback={null}>
        <CreatePostWidget />
      </Suspense>
    </>
  );
}
