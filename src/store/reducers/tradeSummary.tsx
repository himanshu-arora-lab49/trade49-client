import * as actions from '../actions/actionTypes';


const initialState = {
    trades: null
}

function tradeSummaryReducer(state = initialState, action: actions.TradeActionTypes) {
    switch(action.type) {
        case actions.SET_TRADES:
            return {
                ...state,
                trades: action.payload
            };
        default: return state;
    }
}

export default tradeSummaryReducer;