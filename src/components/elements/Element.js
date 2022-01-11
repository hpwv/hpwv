import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './Element.css';

const mapStateToProps = (state, ownProps) => {
    return {
        element: state[ownProps.type].elements[ownProps.id]
    };
}

class Element extends Component {

    render() {
        return (
            <div className='Element'>
                <span style={{
                    position: 'absolute',
                    left: this.props.element.x,
                    top: this.props.element.y
                }}>This is {this.props.type} with id {this.props.element.id}</span>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Element);
