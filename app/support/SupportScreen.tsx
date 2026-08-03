import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  senderName: string;
  text: string;
}

interface SupportScreenProps {
  userName?: string;
  onClose?: () => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'support',
    senderName: 'Support',
    text: 'Hi, your inquiries are important to us. How can we assist you?',
  },
  {
    id: '2',
    sender: 'user',
    senderName: 'Teni Olayiwola',
    text: 'Hello, I cannot generate a code for my visitor. It keeps loading and is not generating, kindly look into this. Thank you.',
  },
];

const nativeDeviceEmojis = [
  '😊', '😂', '👍', '🙏', '❤️', '🔥', '🎉', '✨',
  '😍', '😎', '🙌', '🤝', '💯', '✅', '💡', '📱'
];

export const SupportScreen: React.FC<SupportScreenProps> = ({
  userName = 'Teni Olayiwola',
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: userName,
      text: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setShowEmojiPicker(false);

    // Auto support reply simulation
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        senderName: 'Support',
        text: 'Thank you for reaching out! Our support team are currently busy, we will get back to you shortly.',
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  const handleSmileyClick = () => {
    // 1. Focus input to trigger device native keyboard & emoji panel
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // 2. Toggle native device emoji picker palette
    setShowEmojiPicker((prev) => !prev);
  };

  const handleInsertEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {/* Top Header Banner */}
        <div style={styles.headerBanner}>
          {onClose && (
            <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}

          <h1 style={styles.headerTitle}>Chat with us</h1>
          <div style={styles.onlineStatusRow}>
            <span style={styles.onlineDot} />
            <span style={styles.onlineText}>Online</span>
          </div>
        </div>

        {/* Conversation Body */}
        <div style={styles.chatBody} onClick={() => setShowEmojiPicker(false)}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.messageWrapper,
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <span style={styles.senderLabel}>{msg.senderName}</span>
              <div
                style={{
                  ...styles.bubble,
                  ...(msg.sender === 'user' ? styles.userBubble : styles.supportBubble),
                }}
              >
                <p style={styles.messageText}>{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Device Emoji Palette Popover */}
        {showEmojiPicker && (
          <div style={styles.emojiPickerContainer}>
            <div style={styles.emojiGrid}>
              {nativeDeviceEmojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  style={styles.emojiItemBtn}
                  onClick={() => handleInsertEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fixed Bottom Input Bar */}
        <form onSubmit={handleSendMessage} style={styles.inputBarForm}>
          <button
            type="button"
            style={styles.smileyBtn}
            onClick={handleSmileyClick}
            aria-label="Add Device Emoji"
            title="Use device emoji keyboard"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>

          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            enterKeyHint="send"
            style={styles.textInput}
          />

          <button type="submit" style={styles.sendBtn} aria-label="Send Message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  mobileShell: {
    height: '100vh',
    maxHeight: '100vh',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: '440px',
    height: '100vh',
    maxHeight: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  headerBanner: {
    background: 'linear-gradient(180deg, #448967 0%, #68b24b 100%)',
    borderRadius: 0,
    padding: 'calc(36px + env(safe-area-inset-top, 0px)) 24px 28px',
    textAlign: 'left',
    color: '#ffffff',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  closeBtn: {
    position: 'absolute',
    top: 'calc(16px + env(safe-area-inset-top, 0px))',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '26px',
    color: '#ffffff',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px',
  },
  headerTitle: {
    fontSize: '26px',
    fontWeight: '800',
    margin: '0 0 6px 0',
    letterSpacing: '-0.3px',
  },
  onlineStatusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  onlineDot: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: '#a855f7', // Purple status dot 🟣
    display: 'inline-block',
  },
  onlineText: {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '500',
  },
  chatBody: {
    flex: 1,
    padding: '24px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    maxWidth: '85%',
  },
  senderLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
  },
  bubble: {
    borderRadius: '12px',
    padding: '16px 20px',
    boxSizing: 'border-box',
    textAlign: 'left',
  },
  supportBubble: {
    backgroundColor: '#d9e6e1',
    color: '#0f172a',
  },
  userBubble: {
    backgroundColor: '#2d6049',
    color: '#ffffff',
  },
  messageText: {
    fontSize: '15px',
    lineHeight: '1.45',
    margin: 0,
    fontWeight: '400',
  },
  emojiPickerContainer: {
    position: 'absolute',
    bottom: '70px',
    left: '16px',
    right: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '16px',
    padding: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    zIndex: 200,
  },
  emojiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '8px',
  },
  emojiItemBtn: {
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
    textAlign: 'center',
  },
  inputBarForm: {
    flexShrink: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #cbd5e1',
    padding: '14px 16px calc(14px + env(safe-area-inset-bottom, 0px))',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    zIndex: 100,
  },
  smileyBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: 'transparent',
  },
  sendBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#2d6049',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
