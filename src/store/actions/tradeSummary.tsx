import * as actions from './actionTypes'
import { Trade } from '../../models/trade';


function setTrades(trades: Trade[]): actions.TradeActionTypes {
    return {
        type: actions.SET_TRADES,
        payload: trades
    }
}

export function initTrades() {
    return (dispatch) => {
        fetch('http://localhost:8000/trades')
            .then(response => response.json())
            .then(data => {
                dispatch(setTrades([...data] as Trade[]))
            });
    }
}