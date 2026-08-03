import React from 'react';
import {
  HomeIcon,
  InviteGuestIcon,
  AccessCodeIcon,
  ProfileIcon,
} from '../../src/components/icon';

export type NavTab = 'home' | 'invite' | 'access' | 'profile';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'home',
  onTabChange,
}) => {
  return (
    <div style={styles.navContainer}>
      {/* Home Tab */}
      <button
        style={styles.tabBtn}
        onClick={() => onTabChange('home')}
        aria-label="Home"
      >
        <div style={styles.iconWrapper}>
          <HomeIcon
            size={24}
            color={activeTab === 'home' ? '#285843' : '#64748b'}
            strokeWidth={2.2}
          />
        </div>
        <span
          style={{
            ...styles.tabLabel,
            color: activeTab === 'home' ? '#285843' : '#64748b',
            fontWeight: activeTab === 'home' ? '700' : '500',
          }}
        >
          Home
        </span>
      </button>

      {/* Invite Guest Tab */}
      <button
        style={styles.tabBtn}
        onClick={() => onTabChange('invite')}
        aria-label="Invite Guest"
      >
        <div style={styles.iconWrapper}>
          <InviteGuestIcon
            size={24}
            color={activeTab === 'invite' ? '#285843' : '#64748b'}
            strokeWidth={2.2}
          />
        </div>
        <span
          style={{
            ...styles.tabLabel,
            color: activeTab === 'invite' ? '#285843' : '#64748b',
            fontWeight: activeTab === 'invite' ? '700' : '500',
          }}
        >
          Invite Guest
        </span>
      </button>

      {/* Access Code Tab */}
      <button
        style={styles.tabBtn}
        onClick={() => onTabChange('access')}
        aria-label="Access Code"
      >
        <div style={styles.iconWrapper}>
          <AccessCodeIcon
            size={24}
            color={activeTab === 'access' ? '#285843' : '#64748b'}
            strokeWidth={2.2}
          />
        </div>
        <span
          style={{
            ...styles.tabLabel,
            color: activeTab === 'access' ? '#285843' : '#64748b',
            fontWeight: activeTab === 'access' ? '700' : '500',
          }}
        >
          Access Code
        </span>
      </button>

      {/* Profile Tab */}
      <button
        style={styles.tabBtn}
        onClick={() => onTabChange('profile')}
        aria-label="Profile"
      >
        <div style={styles.iconWrapper}>
          <ProfileIcon
            size={24}
            color={activeTab === 'profile' ? '#285843' : '#64748b'}
            strokeWidth={2.2}
          />
        </div>
        <span
          style={{
            ...styles.tabLabel,
            color: activeTab === 'profile' ? '#285843' : '#64748b',
            fontWeight: activeTab === 'profile' ? '700' : '500',
          }}
        >
          Profile
        </span>
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  navContainer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '440px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '8px 0 calc(10px + env(safe-area-inset-bottom, 0px))',
    boxSizing: 'border-box',
    zIndex: 9990,
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    flex: 1,
    padding: '4px 0',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '26px',
  },
  tabLabel: {
    fontSize: '12px',
    letterSpacing: '-0.2px',
    transition: 'color 0.2s ease',
  },
};
