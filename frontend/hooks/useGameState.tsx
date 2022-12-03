import { useEffect, useState } from "react";
import { GameStatus, initialState, isStateOk, startNewGame, State } from "../tools/gameState";
import { useLocalStorage } from "./useLocalStorage";


export function convertPrevState(prevState: State, today_game_id: number) {
    let newState = {...prevState};
    if (prevState.gameInfo.gameId != today_game_id) {
        newState = startNewGame(newState)
        newState.gameInfo.gameId = today_game_id
    }
    
    return newState;
}


export function useGameState(today_game_id: number) {
    const [loading, setLoading] = useState(true);
    const [savedState, setSavedState] = useLocalStorage('similario-game-state', initialState);

    useEffect(() => {
        let state = undefined;
        if (!isStateOk(savedState)) {
            console.log("old state if found. load normal state")
            setSavedState(initialState)
        }
        state = convertPrevState(savedState, today_game_id);
        setSavedState(state);
        setLoading(false);
      }, []);

    return {
        loading: loading,
        state: savedState,
        setState: setSavedState,
    }
}
