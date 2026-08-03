import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../../src/components/icon';

interface LoginScreenProps {
  onLoginSuccess?: (email: string) => void;
  onNavigateToSignup?: () => void;
  onNavigateToForgotPassword?: () => void;
  onBackToOnboarding?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToSignup,
  onNavigateToForgotPassword,
  onBackToOnboarding,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(email || 'user@example.com');
    } else {
      alert(`Logged in successfully as ${email}!`);
    }
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Navigation Bar / Header */}
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

        {/* Login Form Body */}
        <div style={styles.authBody}>
          <h1 style={styles.title}>Welcome back! Login</h1>
          <p style={styles.subtitle}>
            Don’t have an account?{' '}
            <button style={styles.linkBtn} onClick={onNavigateToSignup}>
              Create one
            </button>
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password *</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...styles.input, paddingRight: '48px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} color="#64748b" />
                  ) : (
                    <EyeIcon size={20} color="#64748b" />
                  )}
                </button>
              </div>
              <div style={styles.forgotPasswordWrapper}>
                <button
                  type="button"
                  style={styles.forgotBtn}
                  onClick={onNavigateToForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button type="submit" style={styles.primaryBtn}>
              Login
            </button>

            {/* Remember Password Checkbox */}
            <div style={styles.checkboxLabel} onClick={() => setRememberPassword((prev) => !prev)}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: rememberPassword ? '1px solid #347357' : '1.5px solid #64748b',
                  backgroundColor: rememberPassword ? '#347357' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {rememberPassword && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ userSelect: 'none' }}>Remember password</span>
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
    padding: '20px 24px calc(32px + env(safe-area-inset-bottom, 0px))',
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
    marginBottom: '40px',
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
  authBody: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 6px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#475569',
    margin: '0 0 28px 0',
    fontWeight: '400',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#347357',
    fontWeight: '600',
    cursor: 'pointer',
    padding: 0,
    fontSize: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    width: '100%',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e293b',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    height: '48px',
    padding: '0 16px',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #64748b',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  forgotPasswordWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '4px',
  },
  forgotBtn: {
    background: 'none',
    border: 'none',
    color: '#1e293b',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: 0,
  },
  primaryBtn: {
    marginTop: '10px',
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
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#347357',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '4px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#347357',
    cursor: 'pointer',
  },
};
