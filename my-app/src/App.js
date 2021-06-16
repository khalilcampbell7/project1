import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import DefaultPage from './components/DefaultPage';
import DeckBuilder from './components/DeckBuilder';
import ContextInformation from './components/ContextInformation';

function App() {
    const [ deck, setDeck ] = useState([]);

    return (
        <div className="App">
            <ContextInformation.Provider value={{deck: deck, setDeck: setDeck}}>
                <Router>
                    <NavBar />
                    <div className="main-body">
                        <Route path="/" exact component={DefaultPage} />
                        <Route path="/deck-builder" component={DeckBuilder} />
                        {/* <Route path="/load-deck" exact componet={DeckLoader} />
                        <Route path="/sign-in" exact component={SignIn} /> */}
                    </div>
                </Router>
            </ContextInformation.Provider>  
        </div>
    );
}

export default App;
