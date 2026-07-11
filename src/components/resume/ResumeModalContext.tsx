import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import ResumeModal from './ResumeModal';

type ResumeModalContextValue = {
  openResumeModal: () => void;
};

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = useCallback(() => setIsOpen(true), []);
  const closeResumeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openResumeModal }), [openResumeModal]);

  return (
    <ResumeModalContext.Provider value={value}>
      {children}
      {isOpen && <ResumeModal onClose={closeResumeModal} />}
    </ResumeModalContext.Provider>
  );
}

// Resume triggers (nav link, hero button) live in different route subtrees —
// context is what lets them share one modal instance instead of duplicating state.
export function useResumeModal() {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error('useResumeModal must be used within a ResumeModalProvider');
  }
  return context;
}
