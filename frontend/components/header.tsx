import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  MenuGroup,
  useColorMode,
  Center,
  IconButton,
} from '@chakra-ui/react';
import { State } from '../tools/gameState';
import { HelpModal } from './helpModal';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';

interface Props {
    state: State,
    handleTip: (e: React.SyntheticEvent) => Promise<void>,
    handleGiveup: (e: React.SyntheticEvent) => Promise<void>,
}



export function Header({state, handleGiveup, handleTip}: Props) {
    const { colorMode, toggleColorMode } = useColorMode();
    const first_time = false && (state.gamesPlayed == 0) && (state.gameInfo.attempts == 0);

    return (
        <>
          <Box bg={useColorModeValue('gray.100', 'gray.900')} px={3}>
            <Flex h={[10, 16]} alignItems={'center'} justifyContent={'space-between'}>
              <HelpModal defaultIsOpen={first_time}/>
    
              <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={5}>
                  <Button onClick={toggleColorMode} size="sm">
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
    
                  <Menu>
                    <MenuButton
                    as={IconButton} 
                    icon={<HamburgerIcon />}
                    variant='outline'
                    size="sm"
                    />

                    <MenuList>
                    <MenuGroup title='Игра'>
                        <MenuItem onClick={handleGiveup}>Сдаться</MenuItem>
                        <MenuItem onClick={handleTip}>Подсказка</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='Помощь'>
                        <MenuItem>Сообщить об ошибке</MenuItem>
                    </MenuGroup>
                    </MenuList>
                </Menu>
                </Stack>
              </Flex>
            </Flex>
          </Box>
        </>
    )
}