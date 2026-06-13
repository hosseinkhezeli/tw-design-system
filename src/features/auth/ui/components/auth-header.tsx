interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <header className='space-y-2 text-center'>
      <h1 className='text-2xl font-bold'>{title}</h1>

      {subtitle && <p className='text-muted-foreground text-sm'>{subtitle}</p>}
    </header>
  );
}
