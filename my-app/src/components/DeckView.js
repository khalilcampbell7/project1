import { useContext } from 'react';

import ContextInformation from "./ContextInformation";
import './DeckView.css';


function DeckView() {
    const context = useContext(ContextInformation);

    const removeCard = (e, card, index, deck) => {
        e.preventDefault();
        let newDeck = [...deck];
        card.count--;
        if(card.count === 0) {
            newDeck.splice(index, 1);
        } else {
            newDeck[index] = card;
        }
        context.setDeck(newDeck);
    }

    const addCard = (e, card, index, deck) => {
        e.preventDefault();
        let newDeck = [...deck];
        card.count++;
        newDeck[index] = card;
        context.setDeck(newDeck);
    }
    
    const loadCardPage = (e, card) => {
        e.preventDefault();
        window.open(card.scryfall_uri, "_blank");
    }

    const renderCard = (card, index, deck) => {
        return (<div className="card-box">
                    <div className="card-name" onClick={e=> loadCardPage (e, card)}>
                        {card.name}
                    </div> 
                    <div className="card-count">
                        x{card.count}
                    </div>
                    <div className="modification-buttons">
                        <button onClick={e => removeCard(e, card, index, deck)}>-</button>
                        <button onClick={e => addCard(e, card, index, deck)}>+</button>
                    </div>
                </div>);
    }

    const downloadDeck = (e) => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(context.deck)],    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "deck_export.json";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <div>
            <div className="deck-view">
                {context.deck.map(renderCard)}
            </div>
            <button onClick={downloadDeck}>Export Deck</button>
        </div>
    );
}

export default DeckView;