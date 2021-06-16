import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import ContextInformation from "./ContextInformation";
import './NavBar.css';

function NavBar() {
    const history = useHistory();

    const context = useContext(ContextInformation);

    const newDeck = () => {
        context.setDeck([]);
        history.push("/deck-builder");
    }

    return(
        <header>
            <h1 className="Banner">K&amp;D Decks</h1>
            <nav className="nav-bar">
                <div className="left-align">
                    <div onClick={newDeck} className="nav-link">New Deck</div>
                    <div onClick={() => history.push("/deck-builder")} className="nav-link">View Deck</div>
                    <div onClick={() => history.push("/load-deck")} className="nav-link">Load Deck</div>
                </div>
                {/* The following could be a component  */}
                {/* <div className="right-align">
                    <p className="nav-link">Hello, KMage</p>
                    <p className="nav-link">Sign Off</p>
                </div> */}
            </nav>
        </header>
    )
}

export default NavBar;