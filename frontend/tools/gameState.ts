export interface Guess {
    word: string,
    rank: number,
}

export function GuessColor(guess: Guess): string {
    
    if (guess.rank < 300) {
        return 'green'
    } else if (guess.rank < 1000) {
        return 'yellow'
    } else if (guess.rank < 10000) {
        return 'orange'
    } else {
        return 'red'
    }
}

export enum GameStatus {
    NOT_STARTED,
    IN_PROGRESS,
    FINISHED,
}

export interface GameInfo {
    gameId: number,
    guessesHistory: Guess[],
    lastGuess: Guess | undefined,
    attempts: number,
    status: GameStatus,
    gaveup: boolean,
    hiddenWord: string,
}

export interface State {
    gameInfo: GameInfo,
    gamesPlayed: number,
}


export const initialState: State = {
    gameInfo: {
        gameId: 0,
        guessesHistory: [],
        lastGuess: undefined,
        attempts: 0,
        status: GameStatus.NOT_STARTED,
        gaveup: false,
        hiddenWord: "",
    },
    gamesPlayed: 0,
}

export function appendGuess(state: State, guess: Guess) {
    if (!hasWord(state, guess.word)) {
        return _appendGuess(state, guess)
    } else {
        return state
    }
}

function _appendGuess(state: State, guess: Guess) {
    state.gameInfo.guessesHistory.push(guess)
    state.gameInfo.attempts += 1
    return state
}

export function hasWord(state: State, word: string) {
    return state.gameInfo.guessesHistory.find(g => g.word === word) != undefined
}

export const isStateOk = (state: any) => {
    return state.gameInfo != undefined &&
        state.gameInfo.gameId != undefined &&
        state.gameInfo.guessesHistory != undefined &&
        state.gameInfo.lastGuess != undefined &&
        state.gameInfo.attempts != undefined &&
        state.gameInfo.status != undefined &&
        state.gameInfo.gaveup != undefined &&
        state.gameInfo.hiddenWord != undefined
}

export const startNewGame = (state: State) => {
    state.gamesPlayed += state.gameInfo.status == GameStatus.FINISHED ? 1 : 0

    state.gameInfo.attempts = 0
    state.gameInfo.guessesHistory = []
    state.gameInfo.lastGuess = undefined
    state.gameInfo.status = GameStatus.IN_PROGRESS
    return state
}

