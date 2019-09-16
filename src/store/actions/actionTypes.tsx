import { Trade } from "../../models/trade";

export const TRADE_INIT = 'TRADE_INIT';
export const SET_TRADES = 'SET_TRADES';

interface InitTrades {
    type: typeof TRADE_INIT
}

interface SetTrades {
    type: typeof SET_TRADES
    payload: Trade[]
}

export type TradeActionTypes = InitTrades | SetTrades;