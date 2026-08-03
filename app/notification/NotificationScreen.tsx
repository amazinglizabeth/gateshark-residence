import React, { useState } from 'react';
import { NotificationDetailModal } from './NotificationDetailModal';

export interface NotificationItem {
  id: string;
  category: 'visitor' | 'error' | 'expiry' | 'used' | 'suspended';
  title: string;
  code?: string;
  description: string;
  actionText?: string;
  time: string;
}

interface NotificationScreenProps {
  onClose?: () => void;
  onGenerateNewCode?: () => void;
  onContactAdmin?: () => void;
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    category: 'visitor',
    title: 'YOUR VISITOR HAS ARRIVED!',
    description: 'Kamsy has arrived....',
    time: 'Just now',
  },
  {
    id: '2',
    category: 'error',
    title: 'ERROR CODE:',
    code: '005UHJ9',
    description: 'This code has expired - code was not used',
    actionText: 'Generate new code',
    time: '30 min ago',
  },
  {
    id: '3',
    category: 'expiry',
    title: 'CODE EXPIRY:',
    code: '005UHJ9',
    description: 'This code expires in 1 hour',
    time: '1 hour ago',
  },
  {
    id: '4',
    category: 'error',
    title: 'ERROR CODE:',
    code: '005UHJ9',
    description: 'This code has expired - code was not used',
    actionText: 'Generate new code',
    time: '1 hour ago',
  },
  {
    id: '5',
    category: 'used',
    title: 'USED CODE:',
    code: '005UHJ9',
    description: 'This code has already been used',
    time: 'Yesterday',
  },
  {
    id: '6',
    category: 'expiry',
    title: 'CODE EXPIRY:',
    code: '005UHJ9',
    description: 'This code expires in 1 hour',
    time: '1 hour ago',
  },
  {
    id: '7',
    category: 'suspended',
    title: 'ACCOUNT SUSPENDED',
    description: 'Your account has been suspended!',
    actionText: 'Contact Admin',
    time: '1 hour ago',
  },
  {
    id: '8',
    category: 'suspended',
    title: 'ACCOUNT SUSPENDED',
    description: 'Your account has been suspended!',
    actionText: 'Contact Admin',
    time: '1 hour ago',
  },
];

export const NotificationScreen: React.FC<NotificationScreenProps> = ({
  onClose,
  onGenerateNewCode,
  onContactAdmin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const filteredNotifications = mockNotifications.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.code && item.code.toLowerCase().includes(query))
    );
  });

  const getTitleColor = (category: NotificationItem['category']) => {
    switch (category) {
      case 'visitor':
      case 'used':
        return '#854d0e'; // Golden olive
      case 'error':
      case 'suspended':
        return '#dc2626'; // Bold Red
      case 'expiry':
        return '#4338ca'; // Deep Indigo
      default:
        return '#0f172a';
    }
  };

  const handleActionClick = (e: React.MouseEvent, item: NotificationItem) => {
    e.stopPropagation();
    if (item.actionText === 'Generate new code') {
      if (onGenerateNewCode) {
        onGenerateNewCode();
      } else {
        alert('Navigating to Invite Guest screen...');
      }
    } else if (item.actionText === 'Contact Admin') {
      if (onContactAdmin) {
        onContactAdmin();
      } else {
        alert('Connecting to GateShark Estate Admin...');
      }
    }
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {!selectedNotification ? (
          <>
            {/* Header Bar */}
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

            {/* Title & Subtitle */}
            <div style={styles.headerTitleSection}>
              <h1 style={styles.title}>Notifications</h1>
              <p style={styles.subtitle}>You can see all notifications here</p>
            </div>

            {/* Search Input Box */}
            <div style={styles.searchWrapper}>
              <svg style={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21L16.65 16.65" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Notifications List */}
            <div style={styles.listContainer}>
              {filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  style={styles.notificationCard}
                  onClick={() => setSelectedNotification(item)}
                >
                  <div style={styles.cardHeaderRow}>
                    <span
                      style={{
                        ...styles.cardTitleText,
                        color: getTitleColor(item.category),
                      }}
                    >
                      {item.title} {item.code && <strong style={styles.codeText}>{item.code}</strong>}
                    </span>
                    <span style={styles.timeText}>{item.time}</span>
                  </div>

                  <p style={styles.descriptionText}>{item.description}</p>

                  {item.actionText && (
                    <button style={styles.actionBtnLink} onClick={(e) => handleActionClick(e, item)}>
                      {item.actionText}
                    </button>
                  )}
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div style={styles.emptyState}>
                  <p style={styles.emptyText}>No notifications found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <NotificationDetailModal
            item={selectedNotification}
            onClose={() => setSelectedNotification(null)}
            onReinvite={() => {
              if (onGenerateNewCode) onGenerateNewCode();
            }}
          />
        )}
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
  headerTitleSection: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 4px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#475569',
    margin: 0,
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: '28px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    boxSizing: 'border-box',
    height: '46px',
    paddingLeft: '42px',
    paddingRight: '16px',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #94a3b8',
    borderRadius: '10px',
    outline: 'none',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
  },
  notificationCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
    cursor: 'pointer',
    padding: '8px 4px',
    borderRadius: '8px',
    transition: 'background-color 0.15s ease',
  },
  cardHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardTitleText: {
    fontSize: '15px',
    fontWeight: '800',
    letterSpacing: '0.2px',
  },
  codeText: {
    fontWeight: '800',
    color: '#0f172a',
  },
  timeText: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '400',
  },
  descriptionText: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.4',
  },
  actionBtnLink: {
    background: 'none',
    border: 'none',
    color: '#285843',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '4px 0 0 0',
    textAlign: 'left',
    width: 'fit-content',
  },
  emptyState: {
    padding: '40px 0',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '14px',
    color: '#94a3b8',
  },
};
