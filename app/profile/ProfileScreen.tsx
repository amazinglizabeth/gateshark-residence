import React, { useState, useEffect } from 'react';
import { EditProfileScreen } from './EditProfileScreen';
import { ChangePasswordScreen } from './ChangePasswordScreen';
import { UploadProfilePhotoModal } from './UploadProfilePhotoModal';
import { LogoutConfirmationModal } from './LogoutConfirmationModal';
import {
  ProfileIcon,
  LockIcon,
  SupportIcon,
  NotificationIcon,
  LogoutIcon,
} from '../../src/components/icon';

interface ProfileScreenProps {
  userName?: string;
  userAvatar?: string | null;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onGetHelp?: () => void;
  onNotifications?: () => void;
  onLogout?: () => void;
}

const getInitials = (name: string) => {
  if (!name) return 'TO';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName = localStorage.getItem('gateshark_profile_name') || 'Teniola Olayiwola',
  userAvatar = localStorage.getItem('gateshark_user_avatar') || null,
  onEditProfile,
  onChangePassword,
  onGetHelp,
  onNotifications,
  onLogout,
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(() => {
    return localStorage.getItem('gateshark_user_avatar') || userAvatar;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [currentName, setCurrentName] = useState<string>(() => {
    return localStorage.getItem('gateshark_profile_name') || userName;
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const handleProfileUpdate = () => {
      const savedName = localStorage.getItem('gateshark_profile_name');
      const savedAvatar = localStorage.getItem('gateshark_user_avatar');
      if (savedName) setCurrentName(savedName);
      if (savedAvatar !== undefined) setAvatarSrc(savedAvatar);
    };

    window.addEventListener('gateshark_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('gateshark_profile_updated', handleProfileUpdate);
    };
  }, []);

  const handleAvatarClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('gateshark_step');
      localStorage.removeItem('gateshark_email');
      window.location.reload();
    }
  };

  if (isChangingPassword) {
    return (
      <ChangePasswordScreen
        onClose={() => setIsChangingPassword(false)}
        onSuccess={() => setIsChangingPassword(false)}
      />
    );
  }

  if (isEditing) {
    return (
      <EditProfileScreen
        userAvatar={avatarSrc}
        onClose={() => setIsEditing(false)}
        onSave={(data) => {
          if (data.ownerName) {
            setCurrentName(data.ownerName);
            localStorage.setItem('gateshark_profile_name', data.ownerName);
          }
          if (data.avatarSrc) {
            setAvatarSrc(data.avatarSrc);
            localStorage.setItem('gateshark_user_avatar', data.avatarSrc);
          }
          window.dispatchEvent(new Event('gateshark_profile_updated'));
          setIsEditing(false);
          alert('Profile updated successfully!');
        }}
      />
    );
  }

  const initials = getInitials(currentName);

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Upload Profile Photo Flow Modal */}
        <UploadProfilePhotoModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onPhotoSaved={(newPhoto) => {
            setAvatarSrc(newPhoto);
            localStorage.setItem('gateshark_user_avatar', newPhoto);
            window.dispatchEvent(new Event('gateshark_profile_updated'));
          }}
        />

        {/* Logout Confirmation Modal */}
        <LogoutConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirmLogout={handleConfirmLogout}
        />

        {/* Header / Brand Logo */}
        <div style={styles.topBar}>
          <div style={styles.brandWrapper}>
            <img src="/splash/gateshark-logo-green.png" alt="GateShark Emblem" style={styles.brandIcon} />
            <span style={styles.brandName}>GateShark</span>
          </div>
        </div>

        {/* User Profile Avatar & Name */}
        <div style={styles.profileHeader}>
          <div style={styles.avatarWrapper} onClick={handleAvatarClick} title="Click to change profile picture">
            {avatarSrc ? (
              <img src={avatarSrc} alt={currentName} style={styles.avatarImage} />
            ) : (
              <div style={styles.initialsContainer}>
                {initials}
              </div>
            )}
          </div>

          {/* Small text to change profile picture */}
          <button style={styles.changePicBtn} onClick={handleAvatarClick}>
            Change profile picture
          </button>

          <h1 style={styles.userNameText}>{currentName}</h1>
        </div>

        {/* Menu Options Group */}
        <div style={styles.menuGroup}>
          {/* 1. Edit Profile */}
          <button
            style={styles.menuCardBtn}
            onClick={onEditProfile || (() => setIsEditing(true))}
          >
            <ProfileIcon size={22} color="#285843" strokeWidth={2.2} />
            <span style={styles.menuCardLabel}>Edit profile</span>
          </button>

          {/* 2. Change Password */}
          <button
            style={styles.menuCardBtn}
            onClick={onChangePassword || (() => setIsChangingPassword(true))}
          >
            <LockIcon size={22} color="#285843" strokeWidth={2.2} />
            <span style={styles.menuCardLabel}>Change password</span>
          </button>

          {/* 3. Get Help */}
          <button
            style={styles.menuCardBtn}
            onClick={onGetHelp || (() => alert('Opening GateShark Support Chat...'))}
          >
            <SupportIcon size={22} color="#285843" strokeWidth={2.2} />
            <span style={styles.menuCardLabel}>Get help</span>
          </button>

          {/* 4. Notifications */}
          <button
            style={styles.menuCardBtn}
            onClick={onNotifications || (() => alert('Opening Notifications...'))}
          >
            <NotificationIcon size={22} color="#285843" strokeWidth={2.2} />
            <span style={styles.menuCardLabel}>Notifications</span>
          </button>

          {/* 5. Logout */}
          <button
            style={styles.menuCardBtn}
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <LogoutIcon size={22} color="#285843" strokeWidth={2.2} />
            <span style={styles.menuCardLabel}>Logout</span>
          </button>
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
    padding: '20px 24px 100px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
  },
  avatarWrapper: {
    position: 'relative',
    width: '110px',
    height: '110px',
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
  initialsContainer: {
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
  },
  changePicBtn: {
    background: 'none',
    border: 'none',
    color: '#347357',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '4px 8px',
    margin: '2px 0 10px 0',
  },
  userNameText: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#285843',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  menuGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  },
  menuCardBtn: {
    width: '100%',
    height: '54px',
    backgroundColor: '#ffffff',
    border: '1.5px solid #5a9e7f',
    borderRadius: '12px',
    padding: '0 20px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  menuCardLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#285843',
    letterSpacing: '-0.2px',
  },
};
