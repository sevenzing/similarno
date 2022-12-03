import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    HStack,
    Text,
    Box,
    Flex,
    Stack,
    chakra,
    UnorderedList,
    ListItem,
  } from '@chakra-ui/react';

import { QuestionOutlineIcon } from '@chakra-ui/icons';

function Rules() {
    return (
    <Stack spacing={1}>
      <Text>Угадайте загаданное слово за минимальное количество попыток</Text>
      <Text>Wordsense отсортировал все популярные слова в порядке их <chakra.span as="b" >схожести</chakra.span> к загаданному слову</Text>
      <Text>Wordsense использует сложный алгоритм, который анализурет тысячи текстов и сортирует слова взависимости от их <chakra.span as="b" >контекста</chakra.span>.</Text>
      <Text>После ввода слова, оно проанализируется покажет насколько оно близко к загаданному.</Text>
    </Stack>
    )
}

interface Props {
    defaultIsOpen: boolean,
}

export function HelpModal({defaultIsOpen}: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen})
    return (
      <>
        <Button onClick={onOpen} variant="outline" size="sm"> 
            <HStack>
                <QuestionOutlineIcon/> <Text>Правила</Text>
            </HStack>
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Как играть?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Rules/>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }