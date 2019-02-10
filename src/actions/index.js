import { FETCH_ARCADES, 
        FETCH_ARCADE_BY_ID_SUCCESS, 
        FETCH_ARCADE_BY_ID_INIT } from './types';

const arcades = [{
        id: "1",
        title: "Central Apartment",
        city: "New York",
        street: "Times Sqaure",
        category: "arcade",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false,
        createdAt: "24/12/2017"
      },
      {
        id: "2",
        title: "Central Apartment 2",
        city: "San Francisco",
        street: "Main street",
        category: "cinema",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 12,
        shared: true,
        createdAt: "24/12/2017"
      },
      {
        id: "3",
        title: "Central Apartment 3",
        city: "Bratislava",
        street: "Hlavna",
        category: "escaperoom",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 334,
        shared: true,
        createdAt: "24/12/2017"
      },
      {
        id: "4",
        title: "Central Apartment 4",
        city: "Berlin",
        street: "Haupt strasse",
        category: "arcade",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 9,
        description: "Very nice apartment",
        dailyRate: 33,
        shared: true,
        createdAt: "24/12/2017"
    }];

    const fetchArcadeByIdInit = () => {

    return{
        type: FETCH_ARCADE_BY_ID_INIT
    }
}

const fetchArcadeByIdSuccess = (arcade) => {
    return {
        type: FETCH_ARCADE_BY_ID_SUCCESS,
        arcade
    }



}

export const fetchArcades = () => {

	return {
		type: FETCH_ARCADES,
		arcades
	}
}

export const fetchArcadeById = (arcadeId) => {

    return function(dispatch){
        dispatch(fetchArcadeByIdInit());
     let arcade = {}

        setTimeout(() => {
            arcade = arcades.find((arcade) => arcade.id === arcadeId);
            dispatch(fetchArcadeByIdSuccess(arcade));

        }, 1000);
    }
}