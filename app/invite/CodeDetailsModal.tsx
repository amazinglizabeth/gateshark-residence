import React from 'react';

export interface CodeDetailsData {
  code: string;
  visitType: 'onetime' | 'recurring';
  guestName?: string;
  scheduleVisit?: string;
  scheduleTime?: string;
}

interface CodeDetailsModalProps {
  data: CodeDetailsData;
  onClose: () => void;
  onViewQrCode: () => void;
}

export const CodeDetailsModal: React.FC<CodeDetailsModalProps> = ({
  data,
  onClose,
  onViewQrCode,
}) => {
  const { code, visitType, guestName, scheduleVisit, scheduleTime } = data;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'GateShark Residence Access Code',
          text: `GateShark Access Code: ${code} for ${guestName || 'Guest'}.`,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(code);
      alert(`Access code ${code} copied to clipboard!`);
    }
  };

  return (
    <div style={styles.modalBody}>
      {/* Close Button */}
      <div style={styles.modalHeader}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      {/* Checkmark Badge */}
      <div style={styles.badgeWrapper}>
        <img
          src="/home/code-success-badge.png"
          alt="Code Generated Badge"
          style={styles.badgeImage}
        />
      </div>

      {/* Generated Code */}
      <h1 style={styles.codeText}>{code}</h1>

      <p style={styles.successTitle}>Access code generated successfully!</p>

      {/* Details Box (One Time vs Recurring) */}
      <div style={styles.detailsBox}>
        {visitType === 'onetime' ? (
          <>
            <p style={styles.detailsRuleText}>
              <strong style={{ color: '#dc2626' }}>One Time Visit</strong> code only.
            </p>
            <p style={styles.detailsExpiryText}>
              This access code expires by {scheduleTime || '05:00pm'} on the {scheduleVisit || '28th of August, 2023'}.
            </p>
            <hr style={styles.boxDivider} />
            <p style={styles.gateNoteText}>
              Guest is required to show code at the gate upon entry.
            </p>
          </>
        ) : (
          <>
            <p style={styles.detailsRuleText}>
              <strong style={{ color: '#dc2626' }}>Recurring Visit</strong> code valid for multiple entries.
            </p>
            <p style={styles.detailsExpiryText}>
              This access code is valid from {scheduleTime || '05:00pm'}, 21st August 2023 to {scheduleTime || '05:00pm'}, {scheduleVisit || '28th August 2023'}.
            </p>
            <hr style={styles.boxDivider} />
            <p style={styles.gateNoteText}>
              Guest is required to show code at the gate upon each entry.
            </p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtonGroup}>
        <button style={styles.shareBtn} onClick={handleShare}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M4 12V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V12" />
            <path d="M16 6L12 2L8 6" />
            <path d="M12 2V15" />
          </svg>
          Share
        </button>

        <button style={styles.qrBtn} onClick={onViewQrCode}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <path d="M14 14H17V17H14V14Z" fill="currentColor" />
            <path d="M18 18H21V21H18V18Z" fill="currentColor" />
          </svg>
          QR Code
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    paddingTop: '10px',
  },
  modalHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#285843',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px',
  },
  badgeWrapper: {
    marginBottom: '16px',
  },
  badgeImage: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  },
  codeText: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 10px 0',
    letterSpacing: '1px',
  },
  successTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#347357',
    margin: '0 0 24px 0',
  },
  detailsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '28px',
    textAlign: 'center',
  },
  detailsRuleText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 8px 0',
  },
  detailsExpiryText: {
    fontSize: '15px',
    color: '#334155',
    margin: '0 0 14px 0',
    lineHeight: '1.4',
  },
  boxDivider: {
    border: 'none',
    borderTop: '1px solid #e2e8f0',
    margin: '14px 0',
  },
  gateNoteText: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#347357',
    fontWeight: '600',
    margin: '12px 0 0 0',
    lineHeight: '1.4',
  },
  actionButtonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  shareBtn: {
    width: '100%',
    height: '50px',
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
    gap: '8px',
  },
  qrBtn: {
    width: '100%',
    height: '50px',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};
