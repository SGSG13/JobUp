import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Map from './Map'
import TaskList from './TaskList'
import TaskCard from './taskCard'
import {connect} from 'react-redux'

class Dashboard extends Component {
    static propTypes = {
        // from connect
        showCard: PropTypes.bool.isRequired
    };
    
    render() {
        return (
            <div style={{height: 800, position: 'relative'}}>
                <Map />
                <TaskList />
                {this.props.showCard ? <TaskCard /> : ''}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        showCard: state.task.showCard
    }
}, {})(Dashboard);
