import { navigation } from '@/shared/services/navigation';

interface AuthFooterLinkProps {
  text: string;
  action: 'sign-in' | 'sign-up';
  actionLabel: string;
}

export function AuthFooterLink({
  text,
  action,
  actionLabel,
}: AuthFooterLinkProps) {
  const handleClick = () => navigation.goToRegister();
  return (
    <p className='text-muted-foreground font-normal! text-center text-sm'>
      {text}{' '}
      <button className='font-medium mx-1 text-primary' onClick={handleClick}>
        {actionLabel}
      </button>
    </p>
  );
}
