'use client';

import Link from 'next/link';
import { IconMenu2 } from '@tabler/icons-react';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { PROFILE_MENU_GROUPS } from '../constants/profile-menu.constants';
import { Sheet, SheetContent } from '@/shared/ui/sheet';
import { useState } from 'react';
import { Visibility } from '@/shared/ui/visibility';

export function ProfileMenuSheet() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      <Button variant='ghost' size='icon' onClick={() => setShowMenu(true)}>
        <IconMenu2 className='size-6' />
      </Button>
      <Visibility visible={showMenu}>
        <Sheet open={showMenu} onOpenChange={() => setShowMenu(false)}>
          <SheetContent
            forceMount
            side='right'
            className='min-h-screen min-w-screen rounded-none pt-12 pb-17'
          >
            <div className='overflow-y-auto'>
              {PROFILE_MENU_GROUPS.map((group) => (
                <section key={group.title}>
                  <ul>
                    {group.items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <li key={item.href}>
                          <Button
                            asChild
                            variant='ghost'
                            className='h-14 w-full justify-start rounded-none px-4'
                          >
                            <Link href={item.href}>
                              <Icon className='size-6 shrink-0' />
                              {item.label}
                            </Link>
                          </Button>
                        </li>
                      );
                    })}
                  </ul>

                  <Separator className='mt-4' />
                </section>
              ))}
            </div>
            <div className='px-4 w-full'>
              <Button className='w-full'>خروج از حساب کاربری</Button>
            </div>
          </SheetContent>
        </Sheet>
      </Visibility>
    </>
  );
}
