import React from 'react';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirmLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Door Logout Icon */}
        <div style={styles.iconCircle}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>

        {/* Modal Text */}
        <h2 style={styles.title}>Confirm Logout</h2>
        <p style={styles.subtitle}>Are you sure you want to logout of your account?</p>

        {/* Modal Action Buttons */}
        <div style={styles.btnRow}>
          <button style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.logoutBtn} onClick={onConfirmLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
    boxSizing: 'border-box',
  },
  modalCard: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '28px 24px 28px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
  },
  iconCircle: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    backgroundColor: '#fef2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 8px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#64748b',
    margin: '0 0 28px 0',
    lineHeight: '1.45',
  },
  btnRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cancelBtn: {
    flex: 1,
    height: '48px',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  logoutBtn: {
    flex: 1,
    height: '48px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
};
