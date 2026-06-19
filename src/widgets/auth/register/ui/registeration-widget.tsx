'use client';

import { AuthHeader } from '@/features/auth/ui/components/auth-header';
import { useRegisterFlow } from '../hooks/use-register-flow';
import { RegisterInfoForm } from '@/features/auth/ui/forms/register-info-form';
import { AuthCardLayout } from '@/features/auth/ui/layouts/auth-card-layout';
import { StepTransition } from '@/shared/components/ui/transitions/step-transition';

export function RegistrationWidget() {
  const { currentHeader, onSubmit, isRegistring, isUploading } =
    useRegisterFlow();
  return (
    <AuthCardLayout>
      <StepTransition stepKey={'REGISTER'}>
        <AuthHeader
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
        />
        <RegisterInfoForm
          onSubmit={onSubmit}
          isPending={isRegistring || isUploading}
        />
      </StepTransition>
    </AuthCardLayout>
  );
}
