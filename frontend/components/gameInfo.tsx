import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { Stack, Tag, Text } from "@chakra-ui/react";
import {  State } from "../tools/gameState"

interface Props {
    state: State,
}

export function GameInfo({ state }: Props) {
    return (
        <Stack direction="row" wrap="wrap">
            <Tag variant="solid">
                
                <Stack direction="row" align="center">
                    <EditIcon/>
                    <Text>Попыток: {state.gameInfo.attempts}</Text>
                </Stack> 
            </Tag>
            <Tag variant="solid"> 
                <Stack direction="row" align="center">
                    <CalendarIcon/>
                    <Text>Игра: #{state.gameInfo.gameId}</Text>
                </Stack> 
            </Tag>
        </Stack>
    );
}
