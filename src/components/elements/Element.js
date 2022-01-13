import {Component} from 'react';
import {connect} from 'react-redux';
import './Element.css';
import {ReactComponent as Car} from './res/directions_car_black_24dp.svg';

const Elements = {
    cars: Car
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
            const ElementByType = Elements[this.props.type]
            return (
                <ElementByType className={stale ? 'Element-stale' : ''} x={element.x} y={element.y}/>
            );
        } else {
            return (null);
        }
    }
}

export default connect(mapStateToProps, null)(Element);
