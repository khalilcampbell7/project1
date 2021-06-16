import { useHistory } from 'react-router-dom';

function DefaultPage() {
    const history = useHistory();
    
    const navigate = (e, path) => {
        e.preventDefault();
        history.push(path);
    }

    return(
        <div className="default-page">
            <button onClick={e => navigate(e, '/deck-builder')}>Create New Deck</button>
            <button onClick={e => navigate(e, '/deck-builder')}>Load Saved Deck</button>
        </div>
    )
}

export default DefaultPage;