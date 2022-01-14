import {FormControlLabel, Switch} from '@mui/material';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bikeActions from '../../state/actions/bikeActions';
import * as carActions from '../../state/actions/carActions';
import * as pedestrianActions from '../../state/actions/pedestrianActions';
import './SideBar.css';

const mapStateToProps = state => {
    return {
        showCars: state.car.showElements,
        showBikes: state.bike.showElements,
        showPedestrians: state.pedestrian.showElements,
    };
};

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }

    handleSwitchChange = (event) => {
        const {name, checked} = event.target;
        this.props[name](checked)
    };

    render() {
        return (
            <div className="SideBar">
                <h4>Controls</h4>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.showCars}
                            onChange={this.handleSwitchChange}
                            name="switchCars"
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    }
                    label="Show cars"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.showBikes}
                            onChange={this.handleSwitchChange}
                            name="switchBikes"
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    }
                    label="Show bikes"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.showPedestrians}
                            onChange={this.handleSwitchChange}
                            name="switchPedestrians"
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    }
                    label="Show pedestrians"
                    labelPlacement="start"
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    switchCars: carActions.switchShowCars,
    switchBikes: bikeActions.switchShowBikes,
    switchPedestrians: pedestrianActions.switchShowPedestrians
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
