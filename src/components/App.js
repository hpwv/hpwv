import {connect} from 'react-redux';
import './App.css';
import ElementsLayer from './elements/ElementsLayer';
import {Header} from './header/Header';
import SideBar from './sidebar/SideBar';

const mapStateToProps = state => {
    return state;
};

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
                <ElementsLayer type="cars"/>
                <ElementsLayer type="cars"/>
                <ElementsLayer type="cars"/>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(App);
