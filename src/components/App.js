import {connect} from 'react-redux';
import './App.css';
import ElementsLayer from './elements/ElementsLayer';
import {Header} from './header/Header';
import MapLayer from './map/MapLayer';
import SideBar from './sidebar/SideBar';

const mapStateToProps = state => {
    return {
        connected: state.connection.connected
    };
};

function App(props) {
    return (
        <div className="App">
            <div className="App-header">
                <Header connected={props.connected}/>
            </div>
            <div className="App-sidebar">
                <SideBar/>
            </div>
            <div className="App-container">
                <MapLayer/>
                <ElementsLayer type="car"/>
                <ElementsLayer type="bike"/>
                <ElementsLayer type="pedestrian"/>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(App);
