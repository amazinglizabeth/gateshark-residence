import { useState, useEffect } from 'react'
import { PwaInstallBanner } from './components/PwaInstallBanner'
import { SplashScreen } from './components/SplashScreen'
import { OnboardingScreen } from '../app/onboarding/OnboardingScreen'
import { SignupScreen } from '../app/onboarding/SignupScreen'
import { LoginScreen } from '../app/onboarding/LoginScreen'
import { EmailVerificationScreen } from '../app/onboarding/EmailVerificationScreen'
import { VerificationSuccessScreen } from '../app/onboarding/VerificationSuccessScreen'
import { VerificationFailedScreen } from '../app/onboarding/VerificationFailedScreen'
import { ForgotPasswordScreen } from '../app/onboarding/ForgotPasswordScreen'
import { CheckEmailScreen } from '../app/onboarding/CheckEmailScreen'
import { ResetPasswordScreen } from '../app/onboarding/ResetPasswordScreen'
import { PasswordResetSuccessScreen } from '../app/onboarding/PasswordResetSuccessScreen'
import { HomeScreen } from '../app/home/HomeScreen'
import './App.css'

type AppStep = 'onboarding' | 'signup' | 'login' | 'forgot-password' | 'check-email' | 'reset-password' | 'reset-success' | 'verify-email' | 'verified' | 'verification-failed' | 'home';

export function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash screen if user is not logged in or fresh session
    const isLoggedIn = localStorage.getItem('gateshark_logged_in') === 'true';
    return !isLoggedIn;
  })

  const [step, setStep] = useState<AppStep>(() => {
    const savedStep = localStorage.getItem('gateshark_step') as AppStep;
    const isLoggedIn = localStorage.getItem('gateshark_logged_in') === 'true';
    if (savedStep) return savedStep;
    return isLoggedIn ? 'home' : 'onboarding';
  })

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('gateshark_email') || '';
  })

  // Save current step to localStorage on change
  useEffect(() => {
    localStorage.setItem('gateshark_step', step);
  }, [step]);

  // Save user email on change
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('gateshark_email', userEmail);
    }
  }, [userEmail]);

  const handleOnboardingComplete = (action: 'login' | 'register') => {
    if (action === 'login') {
      setStep('login')
    } else {
      setStep('signup')
    }
  }

  const handleSignupSuccess = (email: string) => {
    setUserEmail(email)
    setStep('verify-email')
  }

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email)
    localStorage.setItem('gateshark_logged_in', 'true');
    setStep('home')
  }

  const handleEmailVerified = () => {
    setStep('verified')
  }

  const handleGoHome = () => {
    localStorage.setItem('gateshark_logged_in', 'true');
    setStep('home')
  }

  const handleLogout = () => {
    localStorage.removeItem('gateshark_logged_in');
    localStorage.removeItem('gateshark_step');
    localStorage.removeItem('gateshark_email');
    setShowSplash(true);
    setStep('onboarding');
  }

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <PwaInstallBanner />

      {step === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}

      {step === 'signup' && (
        <SignupScreen
          onBackToOnboarding={() => setStep('onboarding')}
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={() => setStep('login')}
        />
      )}

      {step === 'login' && (
        <LoginScreen
          onBackToOnboarding={() => setStep('onboarding')}
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => setStep('signup')}
          onNavigateToForgotPassword={() => setStep('forgot-password')}
        />
      )}

      {step === 'forgot-password' && (
        <ForgotPasswordScreen
          onSubmitSuccess={(email) => {
            setUserEmail(email);
            setStep('check-email');
          }}
          onNavigateToLogin={() => setStep('login')}
          onBackToOnboarding={() => setStep('login')}
        />
      )}

      {step === 'check-email' && (
        <CheckEmailScreen
          email={userEmail}
          onResetPassword={() => setStep('reset-password')}
          onNavigateToLogin={() => setStep('login')}
          onBackToOnboarding={() => setStep('forgot-password')}
        />
      )}

      {step === 'reset-password' && (
        <ResetPasswordScreen
          onSuccess={() => setStep('reset-success')}
          onNavigateToLogin={() => setStep('login')}
          onBack={() => setStep('check-email')}
        />
      )}

      {step === 'reset-success' && (
        <PasswordResetSuccessScreen
          onLoginClick={() => setStep('login')}
        />
      )}

      {step === 'verify-email' && (
        <EmailVerificationScreen
          email={userEmail}
          onVerified={handleEmailVerified}
          onBack={() => setStep('signup')}
        />
      )}

      {step === 'verified' && (
        <VerificationSuccessScreen onGoHome={handleGoHome} />
      )}

      {step === 'verification-failed' && (
        <VerificationFailedScreen
          onResendEmail={() => setStep('verify-email')}
          onContactSupport={() => alert('Redirecting to GateShark Support...')}
        />
      )}

      {step === 'home' && (
        <HomeScreen
          userName="Teni"
          residenceAddress="House 8 Pari Street, Ladipo Estate"
          activeCodesCount={5}
          onLogout={handleLogout}
          onInviteGuest={() => alert('Invite Guest Modal Opened')}
          onActiveCodesClick={() => alert('Viewing Active Access Codes')}
        />
      )}
    </>
  )
}

export default App
