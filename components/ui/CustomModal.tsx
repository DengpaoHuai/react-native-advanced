import { createContext, useContext, useState } from "react";
import {
  Button,
  GestureResponderEvent,
  Modal,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

type ActionType = (event: GestureResponderEvent) => void;

type ModalContextType = {
  openModal: (content: string, title: string, actions: ActionType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  openModal: (content, title, actions) => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalActions, setModalActions] = useState<ActionType>(
    (event: GestureResponderEvent) => {}
  );

  const openModal = (content: string, title: string, actions: ActionType) => {
    setModalContent(content);
    setModalTitle(title);
    setModalActions(() => actions);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <Modal visible={isOpen} animationType="slide" transparent>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <Text>{modalTitle}</Text>
            <Text>{modalContent}</Text>
            <Button title="Close" onPress={modalActions} />
          </View>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
