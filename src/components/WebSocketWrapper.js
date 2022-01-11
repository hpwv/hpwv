import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as webSocketActions from '../state/actions/webSocketActions';

class WebSocketWrapper extends Component {
    componentDidMount() {
        const {webSocketConnectAction} = this.props;
        webSocketConnectAction();
    }

    render() {
        return (
            <div className="WebSocketWrapper">
                {this.props.children}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    webSocketConnectAction: webSocketActions.getConnectAction
}, dispatch);

export default connect(null, mapDispatchToProps)(WebSocketWrapper);
