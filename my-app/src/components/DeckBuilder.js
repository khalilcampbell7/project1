import { useState, useEffect, useRef } from 'react';
import { Route, useHistory } from 'react-router-dom';

import SearchResults from './SearchResults';
import DeckView from './DeckView';

import './DeckBuilder.css';

function DeckBuilder() {
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
                        .then(result => {
                            if(result.status >= 200 && result.status < 300) {
                                return result.json();
                            }
                            return {data : []};
                        })
                        .then(json => setSearchResults(json.data));
        }

        performSearch();
    }

    const searchHelp = (e) => {
        e.preventDefault();
        window.open("https://scryfall.com/docs/syntax", "_blank");
    }

    return(
        <div className="deck-builder">
            <form>
                <input type="text" ref={searchText} id="search-text" name="search-text" placeholder="Search Text" />
                <input type="submit" id="search-button" name="search-button" onClick={submitSearch} />
                <a className="search-help" onClick={searchHelp} href="https://scryfall.com/docs/syntax">Search Help</a>
            </form>
            <Route path="/deck-builder" exact component={DeckView} />
            <Route path="/deck-builder/search" exact render={() => (<SearchResults searchResults={searchResults} />)} />
        </div>
    )
}

export default DeckBuilder;