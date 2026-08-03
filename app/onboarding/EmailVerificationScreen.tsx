import React, { useState } from 'react';

interface EmailVerificationScreenProps {
  email?: string;
  onVerified?: () => void;
  onBack?: () => void;
}

export const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({
  email,
  onVerified,
  onBack,
}) => {
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleVerify = () => {
    if (onVerified) onVerified();
  };

  const handleResend = () => {
    setResending(true);
    setResendMessage('');
    setTimeout(() => {
      setResending(false);
      setResendMessage('Verification email re-sent!');
      setTimeout(() => setResendMessage(''), 3000);
    }, 1000);
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Header / Brand */}
        <div style={styles.topBar}>
          {onBack && (
            <button style={styles.backBtn} onClick={onBack} aria-label="Back">
              ←
            </button>
          )}
          <div style={styles.brandWrapper}>
            <img src="/splash/gateshark-logo-green.png" alt="GateShark Emblem" style={styles.brandIcon} />
            <span style={styles.brandName}>GateShark</span>
          </div>
        </div>

        {/* Content Body */}
        <div style={styles.contentBody}>
          <h1 style={styles.title}>You’re one click away</h1>
          <p style={styles.subtitle}>
            Hit the button to verify {email ? <strong>{email}</strong> : 'your email'} - and get to securing your space!
          </p>

          {/* Verification Illustration */}
          <div style={styles.illustrationWrapper}>
            <img
              src="/onboarding/email-verification.png"
              alt="Verify Email Illustration"
              style={styles.illustration}
            />
          </div>

          {/* Action Button */}
          <button style={styles.primaryBtn} onClick={handleVerify}>
            Verify your email
          </button>

          {/* Resend Section */}
          <div style={styles.resendSection}>
            <p style={styles.resendLabel}>Didn’t get the mail?</p>
            <button style={styles.resendBtn} onClick={handleResend} disabled={resending}>
              <span style={styles.refreshIcon}>↺</span> {resending ? 'Sending...' : 'Resend'}
            </button>
            {resendMessage && <p style={styles.successMessage}>{resendMessage}</p>}
          </div>

          {/* Legal Footer */}
          <p style={styles.legalFooter}>
            By creating your account, you agree to our{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()} style={styles.legalLink}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" onClick={(e) => e.preventDefault()} style={styles.legalLink}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  mobileShell: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflowY: 'auto',
  },
  container: {
    width: '100%',
    maxWidth: '440px',
    minHeight: '100vh',
    padding: '20px 24px calc(32px + env(safe-area-inset-bottom, 0px))',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
    marginBottom: '32px',
    width: '100%',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    background: 'none',
    border: 'none',
    fontSize: '22px',
    color: '#347357',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  brandWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandIcon: {
    width: '28px',
    height: '32px',
    objectFit: 'contain',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.4px',
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#285843',
    margin: '0 0 10px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#334155',
    margin: '0 0 24px 0',
    lineHeight: '1.4',
    maxWidth: '320px',
  },
  illustrationWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '28px',
  },
  illustration: {
    maxWidth: '280px',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  primaryBtn: {
    width: '100%',
    height: '52px',
    backgroundColor: '#347357',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  resendSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '32px',
  },
  resendLabel: {
    fontSize: '15px',
    color: '#334155',
    margin: 0,
  },
  resendBtn: {
    background: 'none',
    border: 'none',
    color: '#701A40',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
  },
  refreshIcon: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: '13px',
    color: '#347357',
    margin: '4px 0 0 0',
    fontWeight: '500',
  },
  legalFooter: {
    marginTop: 'auto',
    fontSize: '12px',
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: '1.45',
  },
  legalLink: {
    color: '#64748b',
    textDecoration: 'none',
  },
};
