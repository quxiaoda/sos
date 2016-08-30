import * as types from '../action'
let defaultState = {
    number: '13126735500',
    text: 'HELLP!!!!',
}
const save = (state = defaultState, action) => {
    switch (action.type) {
        case types.SAVE_NUMBER:
            return Object.assign({}, state, {
                number: action.number,
            });
        case types.SAVE_TEXT:
            return Object.assign({}, state, {
                text: action.text,
            });
        default:
            return state;
    }
}
export default save;