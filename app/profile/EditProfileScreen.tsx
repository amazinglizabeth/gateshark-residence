import React, { useState } from 'react';
import { UploadProfilePhotoModal } from './UploadProfilePhotoModal';

interface EditProfileScreenProps {
  initialTitle?: string;
  initialOwnerName?: string;
  initialSex?: string;
  initialPhone?: string;
  initialEmail?: string;
  initialHouseNo?: string;
  initialStreet?: string;
  initialHouseType?: string;
  initialHouseholdSize?: string;
  initialDomesticStaff?: string;
  userAvatar?: string | null;
  onSave?: (updatedProfile: any) => void;
  onClose?: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  initialTitle = 'Miss',
  initialOwnerName = localStorage.getItem('gateshark_profile_name') || 'Olayiwola Teniola',
  initialSex = 'Female',
  initialPhone = '09012345678',
  initialEmail = 'Teniolayiwola@gmail.com',
  initialHouseNo = 'House 8',
  initialStreet = 'Pari street',
  initialHouseType = 'Semi-detached duplex',
  initialHouseholdSize = '5',
  initialDomesticStaff = '5',
  userAvatar = localStorage.getItem('gateshark_user_avatar') || null,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [ownerName, setOwnerName] = useState(initialOwnerName);
  const [sex, setSex] = useState(initialSex);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [houseNo, setHouseNo] = useState(initialHouseNo);
  const [street, setStreet] = useState(initialStreet);
  const [houseType, setHouseType] = useState(initialHouseType);
  const [householdSize, setHouseholdSize] = useState(initialHouseholdSize);
  const [domesticStaff, setDomesticStaff] = useState(initialDomesticStaff);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(userAvatar);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      title,
      ownerName,
      sex,
      phone,
      email,
      houseNo,
      street,
      houseType,
      householdSize,
      domesticStaff,
      avatarSrc,
    };

    if (ownerName) {
      localStorage.setItem('gateshark_profile_name', ownerName);
    }
    if (avatarSrc) {
      localStorage.setItem('gateshark_user_avatar', avatarSrc);
    }
    window.dispatchEvent(new Event('gateshark_profile_updated'));

    if (onSave) {
      onSave(updatedData);
    } else {
      alert('Profile updated successfully!');
      if (onClose) onClose();
    }
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Upload Profile Photo Flow Modal */}
        <UploadProfilePhotoModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onPhotoSaved={(newPhoto) => setAvatarSrc(newPhoto)}
        />

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

        {/* User Profile Avatar & Name */}
        <div style={styles.profileHeader}>
          <div style={styles.avatarWrapper} onClick={handleAvatarClick} title="Click to change photo">
            {avatarSrc ? (
              <img src={avatarSrc} alt="User Avatar" style={styles.avatarImage} />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#285843',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                }}
              >
                {(() => {
                  const parts = (ownerName || 'Teniola Olayiwola').trim().split(' ');
                  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
                  return parts[0].substring(0, 2).toUpperCase();
                })()}
              </div>
            )}
          </div>
          <h1 style={styles.userNameText}>
            {ownerName || 'Teniola Olayiwola'}
          </h1>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Mr/Miss/Mrs/Dr</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Owner name (Surname first)</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Sex</label>
            <input
              type="text"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Phone number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>House No</label>
            <input
              type="text"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Street</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>House type</label>
            <input
              type="text"
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Household size</label>
            <input
              type="text"
              value={householdSize}
              onChange={(e) => setHouseholdSize(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Domestic staff</label>
            <input
              type="text"
              value={domesticStaff}
              onChange={(e) => setDomesticStaff(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.saveBtn}>
            Save
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
    padding: '20px 24px 120px',
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
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '28px',
  },
  avatarWrapper: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: 'none',
    cursor: 'pointer',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  userNameText: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#285843',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
    height: '46px',
    padding: '0 14px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #5a9e7f',
    borderRadius: '10px',
    outline: 'none',
  },
  saveBtn: {
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
