import './Header.css';

export function Header(props) {
    return (
        <div className="Header">
            <h2>HPWV - High-Performance-Web-Viewer</h2>
            <div className={`Header-connection-info ${props.connected ? 'connected' : 'disconnected'}`}>
                <span>{props.connected ? 'Connected' : 'Disconnected'}</span>
            </div>
        </div>
    );
}
