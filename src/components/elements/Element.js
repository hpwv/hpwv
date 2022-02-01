import {Component} from 'react';
import {connect} from 'react-redux';
import './Element.css';
import {ReactComponent as Bike} from './res/directions_bike_black_18dp.svg';
import {ReactComponent as Car} from './res/directions_car_black_24dp.svg';
import {ReactComponent as Pedestrian} from './res/directions_walk_black_18dp.svg';

const Elements = {
    car: Car,
    bike: Bike,
    pedestrian: Pedestrian
}

const mapStateToProps = (state, ownProps) => {
    return {
        element: state[ownProps.type].elements[ownProps.id],
        stale: state[ownProps.type].elements[ownProps.id]?.stale
    };
}

class Element extends Component {

    render() {
        const {element, stale} = this.props;
        if (element) {
            const ElementByType = Elements[this.props.type];
            return (
                <ElementByType className={stale ? 'Element-stale' : ''} x={element.x} y={element.y}/>
            );
        } else {
            return (null);
        }
    }
}

export default connect(mapStateToProps, null)(Element);
