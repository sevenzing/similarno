import { Card, Badge, CardHeader, Text, Flex, Heading, Stack} from '@chakra-ui/react'
import { Guess, GuessColor } from '../tools/gameState'
import { WordCard } from './wordCard'

interface Props {
    wordsList: Guess[],
    
}

export function WordList({wordsList}: Props) {
    const sortedWords = [...wordsList].sort((a, b) => a.rank - b.rank)
    return (
        <Stack spacing={3}>
        {sortedWords.map((w) => 
            <WordCard key={w.rank} guess={w} isLast={false}/>
          )}
        </Stack>
    )
}