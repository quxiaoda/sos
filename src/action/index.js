export const SAVE_NUMBER = 'SAVE_NUMBER';
export const SAVE_TEXT = 'SAVE_TEXT';

export function saveNumber(number){
    return {
        type: SAVE_NUMBER,
        number
    }
}

export function saveText(text){
    return {
        type: SAVE_TEXT,
        text
    }
}
