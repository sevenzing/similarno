import { cleanString, postRequest } from "./misc";

const HOST = ''

export const guessWord = async (gameId: number, word: string) => {
    const cleanedWord = cleanString(word);
    let lemma = ''
    let rank = ''
    let error = ''

    try {
        const response = await postRequest(
            `${HOST}/api/game/${gameId}/rank`,
            {
                "word": word,
            }
        );
        ({ lemma, rank } = await response.json());
    } catch (e) {
        console.log(e)
        error = 'somethis went wrong'
    }
    return { lemma, rank: parseInt(rank), error }
}


export const getWord = async(gameId: number, rank: number) => {
    let word = ''
    let error = ''
    try {
        const response = await postRequest(
            `${HOST}/api/game/${gameId}/word`,
            {
                "rank": rank,
            }
        );
        ({ word } = await response.json());
    } catch (e) {
        console.log(e)
        error = 'somethis went wrong'
    }

    return { word, error }
}