import {Component} from 'react';
import {connect} from 'react-redux';
import './MapLayer.css';
import {ReactComponent as Map} from './res/map.svg';

class MapLayer extends Component {

    constructor(props) {
        super(props);
        this.viewBox = `${window.ENV.app.area.x0} ${window.ENV.app.area.y0} ${window.ENV.app.area.x1} ${window.ENV.app.area.y1}`;
    }

    render() {
        return (
            <div className="MapLayer">
                <svg width="100%" height="100%" viewBox={this.viewBox}>
                    <Map width={window.ENV.app.area.x1 + 'px'} height={window.ENV.app.area.y1 + 'px'}/>
                </svg>
            </div>
        );
    }
}

export default connect(null, null)(MapLayer);
