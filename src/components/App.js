import {connect} from 'react-redux';
import './App.css';
import ElementsLayer from './elements/ElementsLayer';
import {Header} from './header/Header';
import MapLayer from './map/MapLayer';
import SideBar from './sidebar/SideBar';

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <Header/>
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

export default connect()(App);
