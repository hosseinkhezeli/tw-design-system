import { BottomNavigation } from '@/features/navigation/components/bottom-navigation';
import { CreatePostContainer } from '@/features/post/ui/containers/create-post-container';
import { Suspense } from 'react';

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
      <Suspense fallback={null}>
        <CreatePostContainer />
      </Suspense>
    </>
  );
}
