import * as types from '../action'
let defaultState = {
    number: '13126735500',
    text: 'HELLP!!!!',
}
const save = (state = defaultState, action) => {
    switch (action.type) {
        case types.SAVE_NUMBER:
            break;
        case types.SAVE_TEXT:
            break;
        default:
            return state;
    }
}
export default save;