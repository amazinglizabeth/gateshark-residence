import React, { useState } from 'react';

interface ForgotPasswordScreenProps {
  onSubmitSuccess?: (email: string) => void;
  onNavigateToLogin?: () => void;
  onBackToOnboarding?: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onSubmitSuccess,
  onNavigateToLogin,
  onBackToOnboarding,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (onSubmitSuccess) {
      onSubmitSuccess(email);
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

        {/* FORGOT PASSWORD INPUT VIEW */}
        <div style={styles.contentBody}>
          <div style={styles.headerBlock}>
            <h1 style={styles.title}>Forgot your password?</h1>
            <p style={styles.subtitle}>No worries, we’ll send reset instructions to your mail</p>
          </div>

          {/* Illustration */}
          <div style={styles.illustrationWrapper}>
            <img src="/onboarding/check.svg" alt="Forgot Password Illustration" style={styles.illustrationImage} />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldGroup}>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              Submit
            </button>

            <div style={styles.bottomLinkRow}>
              <span style={styles.bottomText}>Remember your password? </span>
              <button
                type="button"
                style={styles.loginLinkBtn}
                onClick={onNavigateToLogin}
              >
                Login
              </button>
            </div>
          </form>
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
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '10px',
  },
  headerBlock: {
    marginBottom: '16px',
    textAlign: 'center',
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
  illustrationWrapper: {
    margin: '10px 0 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    maxWidth: '240px',
    maxHeight: '200px',
    objectFit: 'contain',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    width: '100%',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    height: '50px',
    padding: '0 18px',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #5a9e7f',
    borderRadius: '12px',
    outline: 'none',
  },
  submitBtn: {
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
  loginLinkBtn: {
    background: 'none',
    border: 'none',
    color: '#285843',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
  },
};
