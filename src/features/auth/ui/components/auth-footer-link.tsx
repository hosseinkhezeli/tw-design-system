import { navigation } from '@/shared/services/navigation';

type AuthLinkAction = 'register' | 'login' | 'forgot-password';

interface AuthFooterLinkProps {
  text: string;
  action: AuthLinkAction;
  actionLabel: string;
}

const navigationBasedOnAction: Record<AuthLinkAction, () => void> = {
  login: navigation.goToLogin,
  register: navigation.goToRegister,
  'forgot-password': navigation.goToForgotPassword,
};

export function AuthFooterLink({
  text,
  action,
  actionLabel,
}: AuthFooterLinkProps) {
  const handleClick = () => {
    navigationBasedOnAction[action]();
  };

  return (
    <p className='text-muted-foreground font-normal! text-center text-sm'>
      {text}{' '}
      <button
        className='font-medium mx-1 text-primary hover:underline'
        onClick={handleClick}
      >
        {actionLabel}
      </button>
    </p>
  );
}
