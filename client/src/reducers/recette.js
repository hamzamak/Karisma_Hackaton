import { START_LOADING,END_LOADING, FETCH_RECETTES, DELETE_RECETTE, ADD_RECETTE, UPDATE_RECETTE } from '../constants/actionTypes';
//activeRoom facult car on va travailler avec secureLocalStorage

const recetteReducers = (state = { isLoading: false, recettes: []  }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_RECETTES:

      return {
        ...state,
        recettes: action.payload,

      }

    case DELETE_RECETTE:
      return {
        ...state, recettes: state.recettes.filter((p) => p.id !== action.payload.id)
      }

    case ADD_RECETTE:
      return { ...state, recettes: [...state.recettes, action?.payload] };

      
    case UPDATE_RECETTE:
    return {
      ...state,
      recettes: state.recettes.map((recette) => (recette.id === action.payload.id ? action.payload: recette)), 
     }

    default:
      return state;
  }
};

export default recetteReducers