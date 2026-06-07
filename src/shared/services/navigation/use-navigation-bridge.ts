'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { navigation } from './';

export function useNavigationBridge() {
  const router = useRouter();

  useEffect(() => {
    navigation.setRouter(router);
  }, [router]);
}
