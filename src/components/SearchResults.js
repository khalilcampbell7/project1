import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchResults from './SearchResults.css'

import ContextInformation from "./ContextInformation";

function SearchResult(props) {
    const context = useContext(ContextInformation);

    const history = useHistory();

    const addToDeck = (e, index) => {
        e.preventDefault();
        const newCard = props.searchResults[index];
        const searchForCard = context.deck.filter((card, deckIndex) => {
            if(card.id === newCard.id) {
                const newDeck = [...context.deck];
                newDeck[deckIndex].count++;
                context.setDeck(newDeck);
                return true;
            }
            return false;
        });
        if(searchForCard.length === 0) {
            newCard.count = 1;
            context.setDeck([...context.deck, newCard]);
        }   
    }

    const returnToDeck = (e) => {
        e.preventDefault();
        history.push("/deck-builder")
    }


    return(
        <div className="search-results">
            <div className="return-to-deck" onClick={returnToDeck}>🡸 Return to Deck</div>
            {props.searchResults.map((card, index) => {
            const imageUrl = card.image_uris ? card.image_uris.small : "https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif";
            return (<div className="search-result-card">
                        <img id="image" src={imageUrl} alt={card.name} />
                        <div id="name">{card.name}</div>
                        <div id="description">{card.oracle_text}</div>
                        <button id="add-button" onClick={e => addToDeck(e, index)}>+</button>
                    </div>)})}
        </div>
    )
}

export default SearchResult;