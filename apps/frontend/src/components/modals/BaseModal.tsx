import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  isLoading?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
};

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  isLoading = false,
  onConfirm,
  confirmText = 'Salvar',
  cancelText = 'Cancelar',
  showFooter = true,
}: BaseModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />

        <ModalBody>
          {description && (
            <Text fontSize="sm" mb={4} color="gray.500">
              {description}
            </Text>
          )}
          <Box>{children}</Box>
        </ModalBody>

        {showFooter && (
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {cancelText}
            </Button>
            {onConfirm && (
              <Button colorScheme="blue" onClick={onConfirm} isLoading={isLoading}>
                {confirmText}
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
