export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background p-4'>
      <div className='absolute top-0 left-1/4 size-180 bg-[radial-gradient(circle,var(--color-sky-500)_0%,transparent_60%)] opacity-20 animate-blob will-change-transform'></div>

      <div
        className='absolute top-1/4 right-1/4 size-160 bg-[radial-gradient(circle,var(--color-indigo-500)_0%,transparent_60%)] opacity-15 animate-blob will-change-transform'
        style={{ animationDelay: '2s' }}
      ></div>

      <div
        className='absolute -bottom-20 left-1/3 size-200 bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-15 animate-blob will-change-transform'
        style={{ animationDelay: '3s' }}
      ></div>
      <div className='relative z-10 w-full max-w-md '>{children}</div>
    </div>
  );
}
