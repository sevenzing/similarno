import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import styles from '../styles/Home.module.css'
import { appendGuess, GameStatus, Guess, hasWord, startNewGame } from '../tools/gameState';
import {
  FormControl,
  Input,
  Flex,
  Stack,
  InputGroup,
  InputRightAddon,
  IconButton,
  chakra,
  useToast,
  Divider

} from '@chakra-ui/react';

import { SearchIcon }from '@chakra-ui/icons';
import { Header } from '../components/header';
import { GameInfo } from '../components/gameInfo';
import { getWord, guessWord } from '../tools/api';
import { WordCard } from '../components/wordCard';
import { WordList } from '../components/wordList';
import { EndGameCard } from '../components/endGameCard';



const HOST = 'http://localhost:3000'

interface Props {
  today_game_id: number,
}

export default function Home({today_game_id}: Props) {
  const {loading, state, setState} = useGameState(today_game_id);

  const [word, setWord] = useState('');
  const [searching, setSearching] = useState(false);
  const toast = useToast()
  const errorToast = (error: string) => {
    toast({
      title: 'Ошибка',
      description: error,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }

  if (loading) {
    return <div></div>
  }

  const gameFinished = state.gameInfo.status == GameStatus.FINISHED;

  const handleSubmit = async (e: React.SyntheticEvent, word: string) => {
    e.preventDefault()
    if (word && state.gameInfo.status == GameStatus.IN_PROGRESS) {
      setWord("")
      setSearching(true)
      const {lemma, rank, error} = await guessWord(state.gameInfo.gameId, word);
      if (error) {
        errorToast(error)
      } else {
        if (hasWord(state, lemma)) {
          toast({
            title: 'Инфо',
            description: 'Слово \'' + lemma + '\' уже есть в списке' ,
            status: 'info',
            duration: 5000,
            isClosable: true,
          })
        } else {
          const newState = appendGuess(state, {word: lemma, rank: rank})
          setState(newState)
        }
      }
      setSearching(false)
    }
  }

  const handleTip = async (e: React.SyntheticEvent) => {
    e.preventDefault()
  }
  
  const handleGiveup = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (gameFinished) {
      toast({
        title: 'Игра завершена',
        description: 'Отгаданное слово было \'' + state.gameInfo.hiddenWord + '\'',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    let newState = {...state}
    newState.gameInfo.gaveup = true
    newState.gameInfo.status = GameStatus.FINISHED
    
    const {word, error} = await getWord(newState.gameInfo.gameId, 1)
    if (error) {
      errorToast(error)
      return
    }
    newState.gameInfo.hiddenWord = word
    setState(newState)
  }

  const handleNewGame = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    let newState = {...state};
    newState = startNewGame(newState)
    setState(newState)
  }

  const showEndGame = gameFinished && state.gameInfo.hiddenWord != "";
  let wordsList: Guess[] = state.gameInfo.guessesHistory;
  const guessedWord = wordsList[wordsList.length - 1];

  if (showEndGame) {
    wordsList = wordsList.concat([{
        word: state.gameInfo.hiddenWord,
        rank: 1,
    }])
  }

  return (
    <>
      <Flex  direction="column">
        <Stack spacing={[3, 5]}>
          <Header state={state} handleGiveup={handleGiveup} handleTip={handleTip}></Header>
          
          <Stack alignItems='center' direction='column' spacing={5}>
            <GameInfo state={state}></GameInfo>
            
            {showEndGame && 
              <EndGameCard state={state} handleNewGame={handleNewGame}/>
            }

            <chakra.form noValidate onSubmit={ (e) => handleSubmit(e, word) }>
              <FormControl paddingX={2} maxWidth={500}>
                <InputGroup size="md">
                  <Input 
                    type='text' placeholder='введите слово' value={word} onChange={(e) => setWord(e.target.value)}
                    autoComplete="off"
                  />
                  <InputRightAddon>
                    <IconButton size="sm" border="hidden" isLoading={searching} variant='outline' aria-label='search' icon={<SearchIcon/>} type="submit" />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
            </chakra.form>
            
            {guessedWord && <WordCard guess={guessedWord} isLast/>}
            <Divider/>
            <WordList wordsList={wordsList}/>
            
          </Stack>
        </Stack>
      </Flex>
      
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(`${HOST}/api/current_game_id`)
  const data = await res.json()
  const today_game_id: number = data.current_game_id

  // Pass data to the page via props
  return { 
    props: { 
      today_game_id,
    }
  }
}
