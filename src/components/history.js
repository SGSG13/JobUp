import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {setHistory} from '../AC'
import {dateToString} from '../utils/dateToString'
import {historyRef} from '../api/firebase'

class History extends Component {

    componentDidMount() {
        historyRef.on('value', snap => {
            let historyArr = [];
            snap.forEach(history => {
                const {date, serviceType, taskType} = history.val();
                historyArr.push({date, serviceType, taskType})
            });
            this.props.setHistory(historyArr);
        })
    }

    renderHistory = (history) => {
        return history.map(hist => {
            return (
                <div className="task-item" style={{margin: 10}}>
                    <div className="task-date">{dateToString(hist.date)}</div>
                    <div className="task-type">I need a {hist.serviceType.toLowerCase()} to {hist.taskType.toLowerCase()}</div>
                </div>
            )
        })
    };
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="history-task">
                        {this.renderHistory(this.props.history)}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        history: state.task.history
    }
}, {setHistory})(History);


