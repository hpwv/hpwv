import {Component} from 'react';
import {connect} from 'react-redux';
import './MapLayer.css';
import {ReactComponent as Map} from './res/map.svg';

class MapLayer extends Component {

    render() {
        return (
            <div className="MapLayer">
                <svg width="100%" height="100%" viewBox="0 0 1100 550">
                    <Map width="1100px" height="550px"/>
                </svg>
            </div>
        );
    }
}

export default connect(null, null)(MapLayer);
