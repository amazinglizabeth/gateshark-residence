import React, { useState, useEffect } from 'react';
import { BottomNavBar, type NavTab } from './BottomNavBar';
import { InviteGuestScreen } from '../invite/InviteGuestScreen';
import { AccessCodeScreen } from '../access-code/AccessCodeScreen';
import { NotificationScreen } from '../notification/NotificationScreen';
import { SupportScreen } from '../support/SupportScreen';
import { ProfileScreen } from '../profile/ProfileScreen';
import { LogoutConfirmationModal } from '../profile/LogoutConfirmationModal';
import { SidebarDrawer } from './SidebarDrawer';
import {
  HamburgerIcon,
  HomeIcon,
  AccessCodeIcon,
  InviteGuestIcon,
} from '../../src/components/icon';

interface HomeScreenProps {
  userName?: string;
  residenceAddress?: string;
  activeCodesCount?: number;
  userAvatar?: string | null;
  onLogout?: () => void;
  onInviteGuest?: () => void;
  onActiveCodesClick?: () => void;
}

const getInitials = (name: string) => {
  if (!name) return 'TO';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Teniola Olayiwola',
  residenceAddress = 'House 8 Pari Street, Ladipo Estate',
  activeCodesCount = 5,
  userAvatar = null,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    const saved = localStorage.getItem('gateshark_active_tab') as NavTab;
    return saved || 'home';
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [profileName, setProfileName] = useState<string>(() => {
    return localStorage.getItem('gateshark_profile_name') || userName;
  });

  const [profileAvatar, setProfileAvatar] = useState<string | null>(() => {
    return localStorage.getItem('gateshark_user_avatar') || userAvatar;
  });

  useEffect(() => {
    localStorage.setItem('gateshark_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleProfileUpdate = () => {
      const savedName = localStorage.getItem('gateshark_profile_name');
      const savedAvatar = localStorage.getItem('gateshark_user_avatar');
      if (savedName) setProfileName(savedName);
      if (savedAvatar !== undefined) setProfileAvatar(savedAvatar);
    };

    window.addEventListener('gateshark_profile_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    return () => {
      window.removeEventListener('gateshark_profile_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
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

  const initials = getInitials(profileName);

  // Derive first name for Home Screen greeting (e.g., "Teniola Olayiwola" -> "Teniola", or "Teni" -> "Teni")
  const getGreetingName = (fullName: string) => {
    if (!fullName) return 'Teni';
    const parts = fullName.trim().split(' ');
    return parts[0] || fullName;
  };

  const greetingName = getGreetingName(profileName);

  return (
    <div style={styles.mobileShell}>
      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={handleConfirmLogout}
      />

      {/* Side Menu Drawer Component */}
      <SidebarDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userName={profileName}
        residenceAddress={residenceAddress}
        userAvatar={profileAvatar}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogoutClick={() => setIsLogoutModalOpen(true)}
      />

      <div style={styles.container}>
        {/* 1. Home View (Uses Hamburger Sidebar, NO Bottom Navigation Bar) */}
        {activeTab === 'home' && (
          <>
            {/* Background Image Layer */}
            <div style={styles.bgLayer}>
              <img src="/home/home-bg.svg" alt="Living Room Interior" style={styles.bgImage} />
              <div style={styles.bgOverlay} />
            </div>

            {/* Foreground Content */}
            <div style={styles.content}>
              {/* Top Bar with Hamburger Menu Icon ☰ */}
              <div style={styles.topBar}>
                <button
                  style={styles.hamburgerBtn}
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open Navigation Sidebar"
                >
                  <HamburgerIcon size={24} color="#0f172a" strokeWidth={2.5} />
                </button>

                {profileAvatar ? (
                  <img
                    src={profileAvatar}
                    alt="User Avatar"
                    style={styles.avatar}
                    onClick={() => setActiveTab('profile')}
                  />
                ) : (
                  <div
                    style={styles.headerInitialsAvatar}
                    onClick={() => setActiveTab('profile')}
                    title="View Profile"
                  >
                    {initials}
                  </div>
                )}
              </div>

              {/* Welcome Greeting */}
              <div style={styles.greetingSection}>
                <h1 style={styles.greetingText}>
                  Welcome, <span style={styles.userNameHighlight}>{greetingName}</span>
                </h1>
              </div>

              {/* House Address Card */}
              <div style={styles.infoCard}>
                <div style={styles.cardIconWrapper}>
                  <HomeIcon size={22} color="#0f172a" strokeWidth={2} />
                </div>
                <div style={styles.cardAddressText}>{residenceAddress}</div>
              </div>

              {/* Active Codes Card */}
              <div style={styles.infoCard} onClick={() => setActiveTab('access')}>
                <div style={{ ...styles.cardIconWrapper, backgroundColor: '#fce7f3' }}>
                  <AccessCodeIcon size={22} color="#db2777" strokeWidth={2} />
                </div>
                <div style={styles.cardLabelText}>Active Codes</div>
                <div style={styles.badgePill}>{activeCodesCount}</div>
              </div>

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Bottom Action: Invite Guest Card */}
              <div style={styles.inviteCard} onClick={() => setActiveTab('invite')}>
                <div style={styles.inviteIconCircle}>
                  <InviteGuestIcon size={24} color="#ffffff" strokeWidth={2.2} />
                </div>
                <span style={styles.inviteLabel}>Invite Guest</span>
              </div>
            </div>
          </>
        )}

        {/* 2. Invite Guest Sub-View (Shows Bottom Bar) */}
        {activeTab === 'invite' && (
          <InviteGuestScreen />
        )}

        {/* 3. Access Code Sub-View (Shows Bottom Bar) */}
        {activeTab === 'access' && (
          <AccessCodeScreen />
        )}

        {/* 4. Profile Sub-View (Shows Bottom Bar) */}
        {activeTab === 'profile' && (
          <ProfileScreen
            userName={profileName}
            userAvatar={profileAvatar}
            onGetHelp={() => setActiveTab('support' as any)}
            onNotifications={() => setActiveTab('notifications' as any)}
            onLogout={onLogout}
          />
        )}

        {/* 5. Notifications Sub-View */}
        {(activeTab as string) === 'notifications' && (
          <NotificationScreen
            onClose={() => setActiveTab('home')}
            onGenerateNewCode={() => setActiveTab('invite')}
            onContactAdmin={() => setActiveTab('support' as any)}
          />
        )}

        {/* 6. Support Sub-View */}
        {(activeTab as string) === 'support' && (
          <SupportScreen
            userName={userName}
            onClose={() => setActiveTab('home')}
          />
        )}

        {/* 4-Item Bottom Navigation Bar (ONLY shown on other pages, NOT on Home or Support screen) */}
        {activeTab !== 'home' && (activeTab as string) !== 'support' && (
          <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  mobileShell: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflowY: 'auto',
  },
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '440px',
    minHeight: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  bgLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(230, 222, 210, 0.45) 0%, rgba(20, 30, 25, 0.65) 45%, rgba(0, 0, 0, 0.95) 90%)',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: 'calc(12px + env(safe-area-inset-top, 0px)) 20px calc(30px + env(safe-area-inset-bottom, 0px))',
    boxSizing: 'border-box',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },
  hamburgerBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    cursor: 'pointer',
  },
  headerInitialsAvatar: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: '#285843',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '17px',
    fontWeight: '700',
    cursor: 'pointer',
    border: '2px solid #ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
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
  greetingSection: {
    textAlign: 'left',
    marginBottom: '24px',
  },
  greetingText: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  userNameHighlight: {
    color: '#285843',
    fontWeight: '800',
  },
  infoCard: {
    backgroundColor: 'rgba(13, 24, 20, 0.88)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '14px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    cursor: 'pointer',
  },
  cardIconWrapper: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardAddressText: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: '1.3',
  },
  cardLabelText: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    textAlign: 'left',
    flex: 1,
  },
  badgePill: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: '16px',
    fontWeight: '800',
    padding: '4px 14px',
    borderRadius: '12px',
  },
  inviteCard: {
    backgroundColor: 'rgba(10, 20, 16, 0.92)',
    border: '1px solid #347357',
    borderRadius: '20px',
    padding: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(52, 115, 87, 0.25)',
    cursor: 'pointer',
  },
  inviteIconCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#347357',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteLabel: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '-0.2px',
  },
  tabSubView: {
    position: 'relative',
    zIndex: 2,
    padding: 'calc(16px + env(safe-area-inset-top, 0px)) 20px 90px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  subTopBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#285843',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    padding: '4px 0',
  },
  tabHeader: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  tabTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 6px 0',
  },
  tabSubText: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  cardView: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    textAlign: 'left',
  },
  inputLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#1e293b',
  },
  textInput: {
    width: '100%',
    height: '46px',
    padding: '0 14px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box',
    fontSize: '15px',
  },
  selectInput: {
    width: '100%',
    height: '46px',
    padding: '0 14px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box',
    fontSize: '15px',
    backgroundColor: '#ffffff',
  },
  actionBtn: {
    width: '100%',
    height: '48px',
    backgroundColor: '#285843',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '20px',
    cursor: 'pointer',
  },
  codeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid #e2e8f0',
  },
  codeTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#0f172a',
  },
  codeVal: {
    fontSize: '13px',
    color: '#64748b',
    marginTop: '2px',
  },
  codeBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '700',
  },
  profileOpt: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '15px',
    fontWeight: '600',
    color: '#1e293b',
    cursor: 'pointer',
  },
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
