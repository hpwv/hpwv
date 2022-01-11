import _ from 'lodash';
import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Element from './Element';
import './ElementsLayer.css';

const mapStateToProps = (state, ownProps) => {
    return {
        elementIds: _.keys(state[ownProps.type].elements)
    };
}

class ElementsLayer extends Component {

    render() {
        return (
            <div className="ElementsLayer">
                {this.props.elementIds.map(id => (<Element type={this.props.type} id={id}/>))}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ElementsLayer);
