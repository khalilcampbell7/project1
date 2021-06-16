import { useContext } from 'react';

import ContextInformation from "./ContextInformation";



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

    const renderCard = (card, index, deck) => {

        return (<div>
                    {card.name} {card.type} x{card.count}
                    <button onClick={e => removeCard(e, card, index, deck)}>-</button>
                    <button onClick={e => addCard(e, card, index, deck)}>+</button>
                </div>);
    }

    return (
        <div className="deck-view">
            {context.deck.map(renderCard)}
        </div>
    );
}

export default DeckView;