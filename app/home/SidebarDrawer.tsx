import React from 'react';
import { type NavTab } from './BottomNavBar';
import {
  HomeIcon,
  InviteGuestIcon,
  AccessCodeIcon,
  ProfileIcon,
  NotificationIcon,
  SupportIcon,
  LogoutIcon,
} from '../../src/components/icon';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  residenceAddress?: string;
  userAvatar?: string | null;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onLogoutClick: () => void;
}

const getInitials = (name: string) => {
  if (!name) return 'TO';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  userName = 'Teniola Olayiwola',
  residenceAddress = 'House 8 Pari Street, Ladipo Estate',
  userAvatar = null,
  activeTab,
  onTabChange,
  onLogoutClick,
}) => {
  if (!isOpen) return null;

  const initials = getInitials(userName);

  return (
    <div style={styles.drawerOverlay} onClick={onClose}>
      <div style={styles.drawerCard} onClick={(e) => e.stopPropagation()}>
        {/* User Header */}
        <div style={styles.drawerHeader}>
          {userAvatar ? (
            <img src={userAvatar} alt="Profile" style={styles.drawerAvatar} />
          ) : (
            <div style={styles.drawerInitialsAvatar}>
              {initials}
            </div>
          )}
          <div>
            <div style={styles.drawerName}>{userName}</div>
            <div style={styles.drawerSub}>{residenceAddress}</div>
          </div>
        </div>

        <hr style={styles.divider} />

        {/* Navigation Menu Links */}
        <div style={styles.drawerMenu}>
          {/* Home */}
          <button
            style={{
              ...styles.menuItem,
              ...(activeTab === 'home' ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              onTabChange('home');
              onClose();
            }}
          >
            <HomeIcon size={20} color={activeTab === 'home' ? '#285843' : '#64748b'} strokeWidth={2.2} />
            <span>Home</span>
          </button>

          {/* Invite Guest */}
          <button
            style={{
              ...styles.menuItem,
              ...(activeTab === 'invite' ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              onTabChange('invite');
              onClose();
            }}
          >
            <InviteGuestIcon size={20} color={activeTab === 'invite' ? '#285843' : '#64748b'} strokeWidth={2.2} />
            <span>Invite Guest</span>
          </button>

          {/* Access Code */}
          <button
            style={{
              ...styles.menuItem,
              ...(activeTab === 'access' ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              onTabChange('access');
              onClose();
            }}
          >
            <AccessCodeIcon size={20} color={activeTab === 'access' ? '#285843' : '#64748b'} strokeWidth={2.2} />
            <span>Access Code</span>
          </button>

          {/* Profile */}
          <button
            style={{
              ...styles.menuItem,
              ...(activeTab === 'profile' ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              onTabChange('profile');
              onClose();
            }}
          >
            <ProfileIcon size={20} color={activeTab === 'profile' ? '#285843' : '#64748b'} strokeWidth={2.2} />
            <span>Profile</span>
          </button>

          {/* Notifications */}
          <button
            style={{
              ...styles.menuItem,
              ...(activeTab === ('notifications' as any) ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              onTabChange('notifications' as any);
              onClose();
            }}
          >
            <NotificationIcon size={20} color={activeTab === ('notifications' as any) ? '#285843' : '#64748b'} strokeWidth={2.2} />
            <span>Notifications</span>
          </button>

          {/* Support */}
          <button
            style={{
              ...styles.menuItem,
              ...(activeTab === ('support' as any) ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              onTabChange('support' as any);
              onClose();
            }}
          >
            <SupportIcon size={20} color={activeTab === ('support' as any) ? '#285843' : '#64748b'} strokeWidth={2.2} />
            <span>Support</span>
          </button>

          <hr style={styles.divider} />

          {/* Logout */}
          <button
            style={{ ...styles.menuItem, color: '#dc2626' }}
            onClick={() => {
              onClose();
              onLogoutClick();
            }}
          >
            <LogoutIcon size={20} color="#dc2626" strokeWidth={2.2} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  drawerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 10000,
    display: 'flex',
  },
  drawerCard: {
    width: '280px',
    height: '100%',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    padding: '32px 20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '10px 0 30px rgba(0, 0, 0, 0.15)',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '16px',
    textAlign: 'left',
  },
  drawerAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #347357',
  },
  drawerInitialsAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#347357',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '700',
    border: '2px solid #347357',
  },
  drawerName: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },
  drawerSub: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px',
    fontWeight: '500',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e2e8f0',
    margin: '16px 0',
  },
  drawerMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  menuItem: {
    background: 'none',
    border: 'none',
    color: '#475569',
    fontSize: '15px',
    fontWeight: '600',
    padding: '12px 14px',
    borderRadius: '10px',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.15s ease',
  },
  activeMenuItem: {
    backgroundColor: '#e6f0eb',
    color: '#285843',
    fontWeight: '700',
  },
};
