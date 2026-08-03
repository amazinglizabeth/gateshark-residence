import React, { useState } from 'react';

interface ResetPasswordScreenProps {
  onSuccess?: () => void;
  onNavigateToLogin?: () => void;
  onBack?: () => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onSuccess,
  onNavigateToLogin,
  onBack,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      setError('Please enter your new password.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (onSuccess) {
      onSuccess();
    } else if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Navigation Bar / Brand Header */}
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

        {/* RESET PASSWORD VIEW */}
        <div style={styles.contentBody}>
          <h1 style={styles.title}>Reset password</h1>

          {/* Key & Lock Vector Illustration */}
          <div style={styles.illustrationWrapper}>
            <img src="/onboarding/reset.svg" alt="Reset Password Illustration" style={styles.illustrationImage} />
          </div>

          <p style={styles.subtitle}>
            Your new password must be different from previously used passwords
          </p>

          {error && (
            <div style={styles.errorNotice}>
              ⚠️ {error}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldGroup}>
              <input
                type="password"
                placeholder="new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.fieldGroup}>
              <input
                type="password"
                placeholder="re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              Create new password
            </button>
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
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 16px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#334155',
    margin: '0 0 24px 0',
    lineHeight: '1.45',
    maxWidth: '300px',
  },
  illustrationWrapper: {
    margin: '0 0 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    maxWidth: '240px',
    maxHeight: '180px',
    objectFit: 'contain',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
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
    marginTop: '8px',
    boxShadow: '0 4px 12px rgba(40, 88, 67, 0.2)',
  },
  errorNotice: {
    backgroundColor: '#fef2f2',
    border: '1px solid #dc2626',
    color: '#dc2626',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
};
