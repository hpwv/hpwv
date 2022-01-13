import {Component} from 'react';
import {connect} from 'react-redux';
import Element from './Element';
import './ElementsLayer.css';

const mapStateToProps = (state, ownProps) => {
    return {
        elementIds: state[ownProps.type].elementIds
    };
}

class ElementsLayer extends Component {

    constructor(props) {
        super(props);
        this.viewBox = `${window.ENV.app.area.x0} ${window.ENV.app.area.y0} ${window.ENV.app.area.x1} ${window.ENV.app.area.y1}`;
    }

    render() {
        const {elementIds, type} = this.props;
        return (
            <div className="ElementsLayer">
                <svg width="100%" height="100%" viewBox={this.viewBox}>
                    <svg width={window.ENV.app.area.x1 + 'px'} height={window.ENV.app.area.y1 + 'px'}>
                        <g>
                            {elementIds.map(id => (<Element type={type} id={id} key={id}/>))}
                        </g>
                    </svg>
                </svg>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(ElementsLayer);
