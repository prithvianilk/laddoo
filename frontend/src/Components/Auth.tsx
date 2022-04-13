import {
    Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import React from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Auth: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const closeModal = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20">
        <form>
          <ModalHeader>
            <Text fontSize="md" fontWeight="bold">Verify Phone Number</Text>
          </ModalHeader>
          <ModalCloseButton
            fontSize="md"
            mt="4"
            mr="4"
            color="#F06575"
            border="none"
            _active={{ border: "none" }}
            _focus={{ border: "none" }}
          />
          <ModalBody mt="-4">
            <FormControl id="otp" my="5" isRequired>
              <FormLabel fontWeight="medium" fontSize="lg">
                Enter OTP
              </FormLabel>
              <Divider my="3" />
              <Input
                type="Input"
                w={400}
                flex={{ lg: "1", base: "none" }}
                name="otp"
                _focus={{
                  border: "#F06575 solid 2px",
                }}
              ></Input>
            </FormControl>
            <Button
              justifySelf="center"
              borderRadius="md"
              size="lg"
              width="25%"
              mb="4"
              type="submit"
              backgroundColor="#FAFAFA"
              fontWeight="700"
              boxShadow="4px 4px 24px rgba(0, 0, 0, 0.08);"
              border="3px solid #F07381;"
              transition="all 500ms ease"
              _active={{
                bg: "#F06575",
                color: "white",
              }}
              _hover={{
                bg: "#F06575",
                color: "white",
              }}
              _focus={{
                boxShadow: "transparent",
              }}
            >
              Verify
            </Button>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Auth;