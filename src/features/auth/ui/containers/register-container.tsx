'use client';

import { StepTransition } from '@/shared/components/ui/transitions/step-transition';
import { REGISTER_STEPS } from '../../constants/auth.constants';
import { useRegisterFlow } from '../../hooks/use-register-flow';

import { RegisterInfoForm } from '../forms/register-info-form';
import { AuthCardLayout } from '../layouts/auth-card-layout';
import { AuthHeader } from '../components/auth-header';

export function RegisterContainer() {
  const {
    step,
    currentHeader,
    isRegisterPending,
    handleInfoSubmit,
    handleStepBack,
  } = useRegisterFlow();

  return (
    <AuthCardLayout
      {...(step !== REGISTER_STEPS.USER_INFO && {
        onStepBack: handleStepBack,
      })}
    >
      <StepTransition stepKey={step}>
        <AuthHeader
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
        />
        {step === REGISTER_STEPS.USER_INFO && (
          <>
            <RegisterInfoForm
              onSubmit={handleInfoSubmit}
              isPending={isRegisterPending}
            />
          </>
        )}
      </StepTransition>
    </AuthCardLayout>
  );
}
