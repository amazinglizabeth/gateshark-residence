import React, { useState } from 'react';

interface CheckEmailScreenProps {
  email?: string;
  onResetPassword?: () => void;
  onNavigateToLogin?: () => void;
  onBackToOnboarding?: () => void;
}

export const CheckEmailScreen: React.FC<CheckEmailScreenProps> = ({
  email,
  onResetPassword,
  onNavigateToLogin,
  onBackToOnboarding,
}) => {
  const [resendStatus, setResendStatus] = useState(false);

  const handleResend = () => {
    setResendStatus(true);
    setTimeout(() => {
      setResendStatus(false);
    }, 3000);
  };

  const handleReset = () => {
    if (onResetPassword) {
      onResetPassword();
    } else if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Navigation Bar / Brand Header */}
        <div style={styles.topBar}>
          {onBackToOnboarding && (
            <button style={styles.backBtn} onClick={onBackToOnboarding} aria-label="Back">
              ←
            </button>
          )}
          <div style={styles.brandWrapper}>
            <img src="/splash/gateshark-logo-green.png" alt="GateShark Emblem" style={styles.brandIcon} />
            <span style={styles.brandName}>GateShark</span>
          </div>
        </div>

        {/* CHECK YOUR EMAIL VIEW */}
        <div style={styles.contentBodyCenter}>
          {/* Outlined Mail Envelope SVG Icon */}
          <div style={styles.envelopeWrapper}>
            <img src="/onboarding/email.svg" alt="Check Email Envelope" style={styles.envelopeImage} />
          </div>

          <h1 style={styles.title}>Check your email</h1>
          <p style={styles.subtitle}>
            We’ve sent a password reset link to {email ? <strong style={{ color: '#0f172a' }}>{email}</strong> : 'your mail'}.
          </p>

          {resendStatus && (
            <div style={styles.resendNotice}>
              ✓ Reset link resent to your email!
            </div>
          )}

          <button style={styles.resetBtn} onClick={handleReset}>
            Reset password
          </button>

          <div style={styles.bottomLinkRow}>
            <span style={styles.bottomText}>Didn’t receive the email? </span>
            <button type="button" style={styles.resendLinkBtn} onClick={handleResend}>
              Click to resend
            </button>
          </div>
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
    padding: '20px 24px 40px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
    marginBottom: '20px',
    width: '100%',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    background: 'none',
    border: 'none',
    fontSize: '22px',
    color: '#347357',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px',
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
  contentBodyCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: '60px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 6px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.45',
    maxWidth: '280px',
  },
  envelopeWrapper: {
    margin: '40px 0 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelopeImage: {
    width: '100px',
    height: '90px',
    objectFit: 'contain',
  },
  resetBtn: {
    width: '100%',
    height: '50px',
    backgroundColor: '#285843',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '28px',
    boxShadow: '0 4px 12px rgba(40, 88, 67, 0.2)',
  },
  bottomLinkRow: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#64748b',
  },
  bottomText: {
    color: '#64748b',
  },
  resendLinkBtn: {
    background: 'none',
    border: 'none',
    color: '#9f1239',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
  },
  resendNotice: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #16a34a',
    color: '#15803d',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    marginTop: '12px',
  },
};
