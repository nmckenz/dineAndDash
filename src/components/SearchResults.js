import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard.js';
import ReactDOM from 'react-dom';

// Component to display the search results
class SearchResults extends Component {
    constructor() {
        super();
        this.state = {
            userCuisineChoice: "restaurants, All",
            userPriceChoice: "1,2,3,4",
            userSortBy: "distance",
            cuisineTypes: [
                {"restaurants, All": "All Cuisine"},
                {afghani: "Afghan"},
                {african: "African"},
                {senegalese: "Senegalese"},
                {southafrican: "South African"},
                {newamerican: "American (New)"},
                {tradamerican: "American (Traditional)"},
                {arabian: "Arabian"},
                {argentine: "Argentine"},
                {armenian: "Armenian"},
                {asianfusion: "Asian Fusion"},
                {australian: "Australian"},
                {austrian: "Austrian"},
                {bangladeshi: "Bangladeshi"},
                {bbq: "Barbeque"},
                {basque: "Basque"},
                {belgian: "Belgian"},
                {brasseries: "Brasseries"},
                {brazilian: "Brazilian"},
                {breakfast_brunch: "Breakfast & Brunch"},
                {pancakes: "Pancakes"},
                {british: "British"},
                {buffets: "Buffets"},
                {bulgarian: "Bulgarian"},
                {burgers: "Burgers"},
                {burmese: "Burmese"},
                {cafes: "Cafes"},
                {themedcafes: "Themed Cafes"},
                {cafeteria: "Cafeteria"},
                {cajun: "Cajun / Creole"},
                {cambodian: "Cambodian"},
                {caribbean: "Caribbean"},
                {dominican: "Dominican"},
                {haitian: "Haitian"},
                {puertorican: "Puerto Rican"},
                {trinidadian: "Trinidadian"},
                {catalan: "Catalan"},
                {cheesesteaks: "Cheesesteaks"},
                {chickenshop: "Chicken Shop"},
                {chicken_wings: "Chicken Wings"},
                {chinese: "Chinese"},
                {cantonese: "Cantonese"},
                {dimsum: "Dim Sum"},
                {hainan: "Hainan"},
                {shanghainese: "Shanghainese"},
                {szechuan: "Szechuan"},
                {comfortfood: "Comfort Food"},
                {creperies: "Creperies"},
                {cuban: "Cuban"},
                {czech: "Czech"},
                {delis: "Delis"},
                {diners: "Diners"},
                {dinnertheater: "Dinner Theater"},
                {eritrean: "Eritrean"},
                {ethiopian: "Ethiopian"},
                {hotdogs: "Fast Food"},
                {filipino: "Filipino"},
                {fishnchips: "Fish & Chips"},
                {fondue: "Fondue"},
                {food_court: "Food Court"},
                {foodstands: "Food Stands"},
                {french: "French"},
                {mauritius: "Mauritius"},
                {reunion: "Reunion"},
                {gamemeat: "Game Meat"},
                {gastropubs: "Gastropubs"},
                {georgian: "Georgian"},
                {german: "German"},
                {gluten_free: "Gluten - Free"},
                {greek: "Greek"},
                {guamanian: "Guamanian"},
                {halal: "Halal"},
                {hawaiian: "Hawaiian"},
                {himalayan: "Himalayan / Nepalese"},
                {honduran: "Honduran"},
                {hkcafe: "Hong Kong Style Cafe"},
                {hotdog: "Hot Dogs"},
                {hotpot: "Hot Pot"},
                {hungarian: "Hungarian"},
                {iberian: "Iberian"},
                {indpak: "Indian"},
                {indonesian: "Indonesian"},
                {irish: "Irish"},
                {italian: "Italian"},
                {calabrian: "Calabrian"},
                {sardinian: "Sardinian"},
                {sicilian: "Sicilian"},
                {tuscan: "Tuscan"},
                {japanese: "Japanese"},
                {conveyorsushi: "Conveyor Belt Sushi"},
                {izakaya: "Izakaya"},
                {japacurry: "Japanese Curry"},
                {ramen: "Ramen"},
                {teppanyaki: "Teppanyaki"},
                {kebab: "Kebab"},
                {korean: "Korean"},
                {kosher: "Kosher"},
                {laotian: "Laotian"},
                {latin: "Latin American"},
                {colombian: "Colombian"},
                {salvadoran: "Salvadoran"},
                {venezuelan: "Venezuelan"},
                {raw_food: "Live / Raw Food"},
                {malaysian: "Malaysian"},
                {mediterranean: "Mediterranean"},
                {falafel: "Falafel"},
                {mexican: "Mexican"},
                {tacos: "Tacos"},
                {mideastern: "Middle Eastern"},
                {egyptian: "Egyptian"},
                {lebanese: "Lebanese"},
                {modern_european: "Modern European"},
                {mongolian: "Mongolian"},
                {moroccan: "Moroccan"},
                {newmexican: "New Mexican Cuisine"},
                {nicaraguan: "Nicaraguan"},
                {noodles: "Noodles"},
                {pakistani: "Pakistani"},
                {panasian: "Pan Asian"},
                {persian: "Persian / Iranian"},
                {peruvian: "Peruvian"},
                {pizza: "Pizza"},
                {polish: "Polish"},
                {polynesian: "Polynesian"},
                {popuprestaurants: "Pop - Up Restaurants"},
                {portuguese: "Portuguese"},
                {poutineries: "Poutineries"},
                {russian: "Russian"},
                {salad: "Salad"},
                {sandwiches: "Sandwiches"},
                {scandinavian: "Scandinavian"},
                {scottish: "Scottish"},
                {seafood: "Seafood"},
                {singaporean: "Singaporean"},
                {slovakian: "Slovakian"},
                {somali: "Somali"},
                {soulfood: "Soul Food"},
                {soup: "Soup"},
                {southern: "Southern"},
                {spanish: "Spanish"},
                {srilankan: "Sri Lankan"},
                {steak: "Steakhouses"},
                {supperclubs: "Supper Clubs"},
                {sushi: "Sushi Bars"},
                {syrian: "Syrian"},
                {taiwanese: "Taiwanese"},
                {tapas: "Tapas Bars"},
                {tapasmallplates: "Tapas / Small Plates"},
                {thai: "Thai"},
                {turkish: "Turkish"},
                {ukrainian: "Ukrainian"},
                {uzbek: "Uzbek"},
                {vegan: "Vegan"},
                {vegetarian: "Vegetarian"},
                {vietnamese: "Vietnamese"},
                {waffles: "Waffles"},
                {wraps: "Wraps"}
            ]
        };
    }

    componentDidMount() {
        const resultsRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        window.scrollTo(0, resultsRect.top)
    }

    handleChangeSortBy = (event) => {
        this.setState({
            userSortBy: event.target.value
        })
    }

    handleChangeCuisine = (event) => {
        this.setState({
            userCuisineChoice: event.target.value
        })
    }

    handleChangePrice = (event) => {
        this.setState({
            userPriceChoice: event.target.value
        })
    }


    render() {
        return (
            <section className="searchResults" id="searchResults">
                <div className="wrapper">
                    <h2>Search Results</h2>
                    <div className="resultsContainer">
                        {(this.props.loading) ?
                            <div className="loadingOverlay">
                                <p>Loading search results...</p>
                            </div> : (
                                (this.props.searchTried && this.props.restaurants.length===0) ? 
                                <div className="loadingOverlay">
                                    <p>No search results found!</p>
                                </div> :
                                null
                            )
                        }
                        {/* Search filtering starts here */}
                        <div className="resultFilters">
                            <form
                                autoComplete="false"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    this.props.searchFunction(this.props.location, this.state.userSortBy, this.state.userCuisineChoice, this.state.userPriceChoice)
                                }
                            }>
                                {/* Sort selection */}
                                <label className="visuallyHidden" htmlFor="sortSelect">Sort by</label>
                                <select id="sortSelect" onChange={this.handleChangeSortBy}>
                                    <option value="distance">Sort By</option>
                                    <option value="distance">Distance</option>
                                    <option value="rating">Rating</option>
                                </select>

                                {/* Cuisine selection */}
                                <label className="visuallyHidden" htmlFor="cuisineSelect">Choose a cuisine</label>
                                <select id="cuisineSelect" onChange={this.handleChangeCuisine}>
                                    <option value="restaurants, All">Choose a Cuisine</option>
                                    {this.state.cuisineTypes.map((cuisineObject, index) => {
                                        for (let cuisineType in cuisineObject) {
                                            return (
                                                <option key={index} value={cuisineType}>{cuisineObject[cuisineType]}</option>
                                            )
                                        }
                                        return null;
                                    })}
                                </select>

                                {/* Price selection */}
                                <label className="visuallyHidden" htmlFor="priceSelect">Choose a price</label>
                                <select id="priceSelect" onChange={this.handleChangePrice}>
                                    <option value="1,2,3,4">Choose a Price</option>
                                    <option value="1">$</option>
                                    <option value="1,2">$ - $$</option>
                                    <option value="1,2,3">$ - $$$</option>
                                    <option value="1,2,3,4">$ - $$$$</option>
                                </select>
                                <button type="submit">Filter</button>
                            </form>
                        </div>
                        {/* Search filtering ends */}
                        <ul>
                            {/* Render every restaurant in a RestaurantCard */}
                            {this.props.restaurants.map((singleRestaurant) => {
                                return <RestaurantCard
                                    singleRestaurant={singleRestaurant}
                                    key={singleRestaurant.id}
                                    />
                            })
                            }
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default SearchResults;