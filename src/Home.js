import React from 'react';
import Header from './Header.js';
import SearchResults from './SearchResults.js';

function Home(props) {
    return(
        <div>
            <Header searchFunction={props.searchFunction} />
            {(props.restaurants.length > 0) ?
              <SearchResults restaurants={props.restaurants} />
              : null}
        </div>
    );
}

export default Home;