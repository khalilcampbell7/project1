import { useState, useEffect, useContext, useRef } from 'react';
import { Route, useHistory } from 'react-router-dom';

import ContextInformation from "./ContextInformation";
import SearchResults from './SearchResults';
import DeckView from './DeckView';

function DeckBuilder() {
    const context = useContext(ContextInformation);
    const searchText = useRef(null);
    const [ searchResults, setSearchResults ] = useState([]);

    const history = useHistory();

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults])

    const submitSearch = (e) => {
        e.preventDefault();
        if(searchText.current.value === "") {
            return setSearchResults([]);
        }
        history.push("/deck-builder/search");
        async function performSearch() {
            return await fetch(`https://api.scryfall.com/cards/search?q=${searchText.current.value}`)
                        .then(result => result.json())
                        .then(json => setSearchResults(json.data));
        }

        performSearch();
    }

    return(
        <div className="deck-builder">
            <form>
                <input type="text" ref={searchText} id="search-text" name="search-text" placeholder="Search Text" />
                <input type="submit" id="search-button" name="search-button" onClick={submitSearch} />
            </form>
            <Route path="/deck-builder" exact component={DeckView} />
            <Route path="/deck-builder/search" exact render={() => (<SearchResults searchResults={searchResults} />)} />
        </div>
    )
}

export default DeckBuilder;