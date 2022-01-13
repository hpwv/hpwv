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

    render() {
        const {elementIds, type} = this.props;
        return (
            <div className="ElementsLayer">
                <svg width="100%" height="100%" viewBox="0 0 1100 550">
                    <svg width="1100px" height="550px">
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
