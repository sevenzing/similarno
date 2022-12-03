import { CalendarIcon, EditIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Center, Divider, Flex, Heading, Highlight, HStack, Stack, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Tag, Text, useClipboard } from "@chakra-ui/react";
import { useEffect } from "react";
import {  State } from "../tools/gameState"

interface Props {
    state: State,
    handleNewGame: (e: React.SyntheticEvent) => Promise<void>,
}

function getCopyText(state: State) {
    return `Мой результат в wordsense.ru:

Количество попыток: ${state.gameInfo.attempts}
`
}

export function EndGameCard({ state, handleNewGame }: Props) {
    const { onCopy, value, setValue, hasCopied } = useClipboard("");
    useEffect(() => {
        setValue(getCopyText(state))
    }, [setValue, state])
    return (
        <Card variant="filled" size="lg">
            <CardHeader justifyItems="center">
                <Center>
                    <Heading size='md' justifyContent="center"> Игра закончена!</Heading>
                </Center> 
            </CardHeader>
            <CardBody>
                <Text>Загаданное слово: <Text as="b"> {state.gameInfo.hiddenWord}</Text></Text>
                <Divider/>
                <ButtonGroup display="flex" justifyContent="space-between" mt={10}>
                    <Button size="sm" onClick={handleNewGame} colorScheme='orange' leftIcon={<RepeatIcon/>}>
                        Повтор
                    </Button>
                    <Button size="sm" onClick={onCopy} colorScheme='twitter' leftIcon={<ExternalLinkIcon />}>
                        {hasCopied ? "Copied!" : "Share"}
                    </Button>
                    </ButtonGroup>
                
                
            </CardBody>
        </Card>
    );
}
