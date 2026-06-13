export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background p-4'>
      {/* 🔮 نور اول (آبی آسمانی) 
        به جای کلاس blur، از radial-gradient استفاده کردیم که از مرکز رنگی به حاشیه‌های شفاف (transparent) میره.
        کلاس will-change-transform هم عنصر رو می‌فرسته توی یک لایه سخت‌افزاری مجزا (GPU Layer).
      */}
      <div className='absolute top-0 left-1/4 size-180 bg-[radial-gradient(circle,var(--color-sky-300)_0%,transparent_60%)] opacity-20 animate-blob will-change-transform'></div>

      {/* 🔮 نور دوم (نیلی) */}
      <div
        className='absolute top-1/4 right-1/4 size-160 bg-[radial-gradient(circle,var(--color-indigo-300)_0%,transparent_60%)] opacity-15 animate-blob will-change-transform'
        style={{ animationDelay: '4s' }}
      ></div>

      {/* 🔮 نور سوم (خاکستری سرد) */}
      <div
        className='absolute -bottom-20 left-1/3 size-200 bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-15 animate-blob will-change-transform'
        style={{ animationDelay: '8s' }}
      ></div>

      {/* کانتینر اصلی فرم‌ها.
        نورهای بسیار نرمِ بالا از زیر کارت‌های شما که کلاس `backdrop-blur-xl` دارند عبور می‌کنند 
        و حس یک شیشه مات و ضخیمِ فوق‌العاده حرفه‌ای را تداعی می‌کنند.
      */}
      <div className='relative z-10 w-full max-w-md '>{children}</div>
    </div>
  );
}
