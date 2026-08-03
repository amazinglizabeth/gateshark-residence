import React, { useState, useEffect } from 'react';

interface SignupScreenProps {
  initialMode?: 'login' | 'register';
  onBackToOnboarding?: () => void;
  onSignupSuccess?: (email: string) => void;
  onNavigateToLogin?: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  initialMode = 'register',
  onBackToOnboarding,
  onSignupSuccess,
  onNavigateToLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  
  // Registration form fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Login form fields
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please re-enter your password.');
        return;
      }
      if (onSignupSuccess) {
        onSignupSuccess(email || 'user@example.com');
      } else {
        alert(`Account created successfully for ${name}!`);
      }
    } else {
      alert(`Logged in successfully as ${loginEmailOrPhone}!`);
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

        {/* Create Account View */}
        {mode === 'register' ? (
          <div style={styles.authBody}>
            <h1 style={styles.title}>Create your account</h1>
            <p style={styles.subtitle}>
              Have an account?{' '}
              <button
                style={styles.linkBtn}
                onClick={() => (onNavigateToLogin ? onNavigateToLogin() : setMode('login'))}
              >
                Login
              </button>
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  placeholder="enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Name *</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>House Address *</label>
                <input
                  type="text"
                  placeholder="eg. House 4, Pari Street"
                  value={houseAddress}
                  onChange={(e) => setHouseAddress(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="Enter a valid phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Password *</label>
                <input
                  type="password"
                  placeholder="create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Re-enter Password *</label>
                <input
                  type="password"
                  placeholder="re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <button type="submit" style={styles.primaryBtn}>
                Create Account
              </button>
            </form>

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
        ) : (
          /* Login View */
          <div style={styles.authBody}>
            <h1 style={styles.title}>Welcome back</h1>
            <p style={styles.subtitle}>
              Don't have an account?{' '}
              <button style={styles.linkBtn} onClick={() => setMode('register')}>
                Create Account
              </button>
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email or Phone Number *</label>
                <input
                  type="text"
                  placeholder="enter your email or phone number"
                  value={loginEmailOrPhone}
                  onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Password *</label>
                <input
                  type="password"
                  placeholder="enter password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <button type="submit" style={styles.primaryBtn}>
                Login
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                style={{ ...styles.linkBtn, fontSize: '14px' }}
                onClick={() => alert('Password reset link sent!')}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        )}
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
    marginBottom: '28px',
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
    margin: '0 0 24px 0',
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
    transition: 'background-color 0.2s ease',
  },
  legalFooter: {
    marginTop: '20px',
    fontSize: '13px',
    color: '#475569',
    textAlign: 'left',
    lineHeight: '1.45',
  },
  legalLink: {
    color: '#347357',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
