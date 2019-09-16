import * as React from 'react';
import classes from './TradeDetail.module.css';
import Button from '../../../components/UI/Button/Button';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {connect} from 'react-redux';
import { Trade } from '../../../models/trade';

function tradeDetail(props: any) {
    
    console.log(props.match.params.symbol);
    console.log(props.match.params.symbol);
    let trades: Trade[] = null;
    if(props.trades!=null){
        trades = props.trades.filter( trade => trade.symbol === props.match.params.symbol )       
        console.log(trades)
    }

    const randomValues = {
        columnDefs: [{ headerName: "Symbol", field: "symbol"}, 
        { headerName: "Quantity", field: "qty" }, 
        { headerName: "Price", field: "price" }, 
        { headerName: "Time", field: "time" }],
        defaultColDef: { resizable: true },
        rowData: trades
    }

    const gridClasses = ['ag-theme-balham', classes.AGgrid]

    return (
        <div className={classes.TradeDetail}>
            <div className={classes.Header}>
                <span>Trades for {props.match.params.symbol}</span>
                <Button text="Exit" clicked={() => { props.history.goBack(); }} />
            </div>
            <div className={classes.Grid}>                
                <div className={gridClasses.join(' ')}>
                    <AgGridReact 
                        columnDefs={randomValues.columnDefs}
                        rowData={randomValues.rowData}>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        trades: state.trades
    }
}

export default connect(mapStateToProps, null)(tradeDetail);