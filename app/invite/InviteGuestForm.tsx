import React from 'react';
import { type CodeDetailsData } from './CodeDetailsModal';

interface InviteGuestFormProps {
  onGenerateCode: (data: CodeDetailsData) => void;
}

export const InviteGuestForm: React.FC<InviteGuestFormProps> = ({ onGenerateCode }) => {
  const [guestName, setGuestName] = React.useState('');
  const [guestPhone, setGuestPhone] = React.useState('');
  const [guestFeatures, setGuestFeatures] = React.useState('');
  const [guestCategory, setGuestCategory] = React.useState('');
  const [visitType, setVisitType] = React.useState<'onetime' | 'recurring'>('onetime');
  const [scheduleVisit, setScheduleVisit] = React.useState('');
  const [scheduleTime, setScheduleTime] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `005UHJ${Math.floor(1 + Math.random() * 9)}`;
    onGenerateCode({
      code: newCode,
      guestName,
      scheduleVisit,
      scheduleTime,
      visitType,
    });
  };

  return (
    <>
      {/* Header / Brand */}
      <div style={styles.topBar}>
        <div style={styles.brandWrapper}>
          <img src="/splash/gateshark-logo-green.png" alt="GateShark Emblem" style={styles.brandIcon} />
          <span style={styles.brandName}>GateShark</span>
        </div>
      </div>

      {/* Banner Card Header */}
      <div style={styles.bannerCard}>
        <h2 style={styles.bannerTitle}>Invite Guest</h2>
        <p style={styles.bannerSubtitle}>Generate a unique code to invite guests</p>
      </div>

      {/* Invite Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Guest Name *</label>
          <input
            type="text"
            placeholder="Enter guest name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Guest Phone Number *</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Guest Features*</label>
          <input
            type="text"
            placeholder={
              visitType === 'onetime'
                ? 'Eg. Tribal marks, Limps'
                : 'Eg. Car colour or Car brand'
            }
            value={guestFeatures}
            onChange={(e) => setGuestFeatures(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Guest Category</label>
          <input
            type="text"
            placeholder="Eg. Domestic worker, family"
            value={guestCategory}
            onChange={(e) => setGuestCategory(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Type of Visit Segmented Toggle Control */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Type of visit *</label>
          <div style={styles.toggleContainer}>
            <button
              type="button"
              style={{
                ...styles.toggleBtn,
                ...(visitType === 'onetime' ? styles.toggleBtnActive : styles.toggleBtnInactive),
              }}
              onClick={() => setVisitType('onetime')}
            >
              One time visit
            </button>
            <button
              type="button"
              style={{
                ...styles.toggleBtn,
                ...(visitType === 'recurring' ? styles.toggleBtnActive : styles.toggleBtnInactive),
              }}
              onClick={() => setVisitType('recurring')}
            >
              Recurring visit
            </button>
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Schedule Visit</label>
          <input
            type="text"
            placeholder={visitType === 'onetime' ? 'Pick a date' : 'Pick a start and end date'}
            value={scheduleVisit}
            onChange={(e) => setScheduleVisit(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Schedule time</label>
          <input
            type="text"
            placeholder="Eg. 05:00pm"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.primaryBtn}>
          Generate Code
        </button>
      </form>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 'calc(4px + env(safe-area-inset-top, 0px))',
    marginBottom: '16px',
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
  bannerCard: {
    backgroundImage: 'url("/invite/invite.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '16px',
    padding: '24px 20px',
    textAlign: 'left',
    color: '#ffffff',
    marginBottom: '24px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
  bannerTitle: {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 4px 0',
  },
  bannerSubtitle: {
    fontSize: '13px',
    color: '#e2e8f0',
    margin: 0,
    opacity: 0.9,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    textAlign: 'left',
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
    color: '#1e293b',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    height: '46px',
    padding: '0 14px',
    fontSize: '14px',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #94a3b8',
    borderRadius: '10px',
    outline: 'none',
  },
  toggleContainer: {
    display: 'flex',
    width: '100%',
    height: '46px',
    border: '1px solid #94a3b8',
    borderRadius: '10px',
    padding: '3px',
    boxSizing: 'border-box',
    gap: '4px',
    backgroundColor: '#ffffff',
  },
  toggleBtn: {
    flex: 1,
    border: 'none',
    borderRadius: '7px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  toggleBtnActive: {
    backgroundColor: '#65B345',
    color: '#ffffff',
  },
  toggleBtnInactive: {
    backgroundColor: 'transparent',
    color: '#64748b',
  },
  primaryBtn: {
    marginTop: '10px',
    width: '100%',
    height: '50px',
    backgroundColor: '#347357',
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
