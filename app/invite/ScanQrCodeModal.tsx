import React from 'react';
import { type CodeDetailsData } from './CodeDetailsModal';

interface ScanQrCodeModalProps {
  data: CodeDetailsData;
  onClose: () => void;
  onBackToDetails: () => void;
}

export const ScanQrCodeModal: React.FC<ScanQrCodeModalProps> = ({
  data,
  onClose,
  onBackToDetails,
}) => {
  const { visitType, scheduleVisit, scheduleTime } = data;

  return (
    <div style={styles.modalBody}>
      {/* Close Button */}
      <div style={styles.modalHeader}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <h1 style={styles.qrTitle}>Scan QR Code</h1>

      <p style={styles.qrSubtitle}>
        {visitType === 'onetime'
          ? `This access QR code expires by ${scheduleTime || '05:00pm'} on the ${scheduleVisit || '28th of August, 2023'}.`
          : `This access QR code is valid from ${scheduleTime || '05:00pm'}, 21st August 2023 to ${scheduleTime || '05:00pm'}, ${scheduleVisit || '28th August 2023'}.`}
      </p>

      <p style={styles.qrRuleText}>
        {visitType === 'onetime' ? (
          <>
            <strong style={{ color: '#dc2626' }}>One Time Visit</strong> code only.
          </>
        ) : (
          <>
            <strong style={{ color: '#dc2626' }}>Recurring Visit</strong> code valid for multiple entries.
          </>
        )}
      </p>

      {/* QR Code Graphic Box */}
      <div style={styles.qrCodeBox}>
        <img
          src="/home/qr-code-sample.png"
          alt="Scan QR Code"
          style={styles.qrImage}
        />
      </div>

      <p style={styles.gateNoteText}>
        Guest is required to show code at the gate upon entry.
      </p>

      <button style={styles.backDetailsBtn} onClick={onBackToDetails}>
        Back to Details
      </button>
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
  qrTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 12px 0',
  },
  qrSubtitle: {
    fontSize: '15px',
    color: '#334155',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
    maxWidth: '320px',
  },
  qrRuleText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 24px 0',
  },
  qrCodeBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  qrImage: {
    width: '220px',
    height: '220px',
    objectFit: 'contain',
  },
  gateNoteText: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#347357',
    fontWeight: '600',
    margin: '12px 0 20px 0',
    lineHeight: '1.4',
    maxWidth: '300px',
  },
  backDetailsBtn: {
    backgroundColor: '#ffffff',
    color: '#347357',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
