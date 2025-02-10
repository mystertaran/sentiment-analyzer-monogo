export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  sentiment?: {
    label: string;
    score: number;
  };
  isLoading?: boolean;
  error?: string;
}
