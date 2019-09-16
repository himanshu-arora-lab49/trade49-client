import * as React from 'react';
import { Trade } from '../../../models/trade';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './TradeSummary.module.css';
import Highcharts, { Point } from 'highcharts';
import Button from '../../../components/UI/Button/Button';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../../store/actions/tradeSummary';
import {connect} from 'react-redux';

function TradeSummary(props: any) {

    const onInit =  React.useCallback( 
        () => props.onInitTrades(), []);

    React.useEffect( () => {
        onInit()
    }, [onInit]);

    React.useEffect( () => {
        if (props.trades && props.trades.length != 0) {                        
            const data = prepareChartInputData(props.trades);
            renderChart(data, props)
        }
    
    }, [props.trades]);

    let spinner: any = <Spinner />
    if (props.trades && props.trades.length != 0) {
        spinner = null;
    }

    return (
        <div className={classes.TradeSummary}>
            {spinner}
            <div id="trades-pie-chart"></div>
            <Button text="Add Trade" clicked={() => props.history.push('/addTrade')}></Button>
        </div>
    );
}

interface SymbolCount {
    name: string,
    y: number,
}

function prepareChartInputData(trades: Trade[]): SymbolCount[] {
    let data: SymbolCount[] = [];
    let symbolCount: SymbolCount;
    let keyValueMap = trades.reduce((symbolCountMap, trade) => {
        let count: number = symbolCountMap.get(trade.symbol);
        if (count === undefined) {
            count = 1;
        } else {
            count = count + 1;
        }
        symbolCountMap.set(trade.symbol, count);
        return symbolCountMap;
    }, new Map());

    for (let entry of Array.from(keyValueMap.entries())) {
        symbolCount = {
            name: entry[0],
            y: entry[1],
        }
        data.push(symbolCount);
    }
    console.log(data);
    return data;
}

function renderChart(chartData: any, props: RouteComponentProps<any>) {
  let chart =  Highcharts.chart({
        chart: {
            type: 'pie',
            renderTo: 'trades-pie-chart'
        },
        title: {
            verticalAlign: 'middle',
            floating: true,
            text: '',
            style: {
                fontSize: '10px',
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                innerSize: '70%'               
            }
        },
        legend: {
            useHTML: true,            
            width: 400,
            itemWidth: 120,
            padding: 10,
            itemStyle: {                
                fontWeight: 'bold',
                fontSize: '13px'
              },              
              labelFormatter: function() {                                
                const color:string = (this as any).color;                
                return "<div style='display: flex; text-align: center; margin: 0px auto'>" +
                "<div style='margin: 2px; border: 2px solid"+color+"; border-radius: 10px; height:10px; width:10px;'></div>" + this.name + "</div>";
              }

        },
        series: [
            {
                "data": chartData,
                type: 'pie',
                animation: false,
                point: {
                    events: {
                        click: function (event) {
                            props.history.push("/detail/" + event.point.name);
                        }
                    }
                }
            }
        ]
    });    
}

const mapStateToProps = (state) => {
    return {
        trades: state.trades
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitTrades: () => dispatch(actions.initTrades())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeSummary);