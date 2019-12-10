import React from 'react';
import Header from './Header.js';
import SearchResults from './SearchResults.js';

function Home(props) {
    return(
        <div>
            <Header searchFunction={props.searchFunction} />
            {(props.restaurants.length > 0 || props.loadingYelp || props.searchTried) ?
              <SearchResults searchFunction={props.searchFunction} location={props.location} restaurants={props.restaurants} loading={props.loadingYelp} searchTried={props.searchTried} />
              : null}
        </div>
    );
}

export default Home;