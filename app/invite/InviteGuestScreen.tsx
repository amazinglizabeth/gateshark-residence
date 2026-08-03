import React, { useState } from 'react';
import { InviteGuestForm } from './InviteGuestForm';
import { CodeDetailsModal, type CodeDetailsData } from './CodeDetailsModal';
import { ScanQrCodeModal } from './ScanQrCodeModal';

interface InviteGuestScreenProps {
  onCodeGenerated?: (codeDetails: CodeDetailsData) => void;
  onClose?: () => void;
}

export const InviteGuestScreen: React.FC<InviteGuestScreenProps> = ({
  onCodeGenerated,
  onClose,
}) => {
  const [viewState, setViewState] = useState<'form' | 'success' | 'qr'>('form');
  const [codeData, setCodeData] = useState<CodeDetailsData>({
    code: '005UHJ9',
    visitType: 'onetime',
  });

  const handleGenerateCode = (data: CodeDetailsData) => {
    setCodeData(data);
    setViewState('success');
    if (onCodeGenerated) {
      onCodeGenerated(data);
    }
  };

  const handleClose = () => {
    setViewState('form');
    if (onClose) onClose();
  };

  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        {viewState === 'form' && (
          <InviteGuestForm onGenerateCode={handleGenerateCode} />
        )}

        {viewState === 'success' && (
          <CodeDetailsModal
            data={codeData}
            onClose={handleClose}
            onViewQrCode={() => setViewState('qr')}
          />
        )}

        {viewState === 'qr' && (
          <ScanQrCodeModal
            data={codeData}
            onClose={handleClose}
            onBackToDetails={() => setViewState('success')}
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
    padding: '10px 24px 100px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
};
