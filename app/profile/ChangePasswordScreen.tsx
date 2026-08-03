import React, { useState } from 'react';

interface ChangePasswordScreenProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  onClose,
  onSuccess,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword) {
      setError('Please enter your current password.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setSuccessMessage('Password changed successfully!');
    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      } else if (onClose) {
        onClose();
      }
    }, 1200);
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Header / Brand Logo */}
        <div style={styles.topBar}>
          <div style={styles.brandWrapper}>
            <img src="/splash/gateshark-logo-green.png" alt="GateShark Emblem" style={styles.brandIcon} />
            <span style={styles.brandName}>GateShark</span>
          </div>
          {onClose && (
            <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}
        </div>

        {/* Title Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.title}>Change Password</h1>
          <p style={styles.subtitle}>Update your account security password below.</p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div style={styles.successBanner}>
            <span style={{ fontSize: '18px' }}>✓</span> {successMessage}
          </div>
        )}

        {/* Error Alert Banner */}
        {error && (
          <div style={styles.errorBanner}>
            <span style={{ fontSize: '18px' }}>⚠️</span> {error}
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Current Password *</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>New Password *</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirm New Password *</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.changeBtn}>
            Change password
          </button>
        </form>
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
    padding: '20px 24px 100px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    textAlign: 'left',
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
  closeBtn: {
    position: 'absolute',
    right: 0,
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#285843',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px',
  },
  pageHeader: {
    marginBottom: '28px',
    textAlign: 'left',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#285843',
    margin: '0 0 6px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  successBanner: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #16a34a',
    color: '#15803d',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  errorBanner: {
    backgroundColor: '#fef2f2',
    border: '1px solid #dc2626',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    height: '48px',
    padding: '0 16px',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #5a9e7f',
    borderRadius: '10px',
    outline: 'none',
  },
  changeBtn: {
    marginTop: '12px',
    width: '100%',
    height: '52px',
    backgroundColor: '#285843',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
