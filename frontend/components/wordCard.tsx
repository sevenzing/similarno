import { Card, Badge, CardHeader, Text, Flex, Heading, HStack, Progress} from '@chakra-ui/react'
import { Guess, GuessColor } from '../tools/gameState'

interface Props {
    guess: Guess,
    isLast: boolean,
}

export function WordCard({guess, isLast = false}: Props) {
    let border = isLast || guess.rank == 1 ? "2px" : "";
    let borderColor = ""
    if (isLast) {
        borderColor = "gray.300"
    }
    if (guess.rank == 1) {
        borderColor = "yellow.300"
    }
    
    return (
        <Card 
            borderRadius={12} 
            border={border} 
            borderColor={borderColor} 
            minWidth="300px" 
            size="custom"
            px={4}
            py={1}
        >
            <CardHeader>
                <HStack justify="space-between">
                <Text fontSize={isLast ? "1rem" : "1rem"}>
                    {guess.word}
                </Text>
                <Badge fontSize='0.8em' colorScheme={GuessColor(guess)}>
                    {guess.rank}
                </Badge>
                </HStack>
            </CardHeader>
        </Card>
    )
}