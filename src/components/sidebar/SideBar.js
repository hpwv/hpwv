import {FormControlLabel, Switch} from '@mui/material';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as carActions from '../../state/actions/carActions';
import './SideBar.css';

const mapStateToProps = state => {
    return {
        showCars: state.cars.showElements
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
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    switchCars: carActions.switchShowCars
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
