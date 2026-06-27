import { Text } from '@/shared/ui/text';
import { Button } from '@/shared/ui/button';
import { navigation } from '@/shared/services/navigation';

type AuthLinkAction = 'register' | 'login';

interface AuthFooterLinkProps {
  text: string;
  action: AuthLinkAction;
  actionLabel: string;
}

const navigationBasedOnAction: Record<AuthLinkAction, () => void> = {
  login: navigation.goToLogin,
  register: navigation.goToRegister,
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
    <Text
      title={text}
      semicolon={false}
      text={
        <Button
          variant={'ghost'}
          size={'xs'}
          className='font-medium mx-1 text-primary hover:underline'
          onClick={handleClick}
        >
          {actionLabel}
        </Button>
      }
      classNames={{
        container: 'text-muted-foreground font-normal! text-center text-sm',
      }}
    />
  );
}
