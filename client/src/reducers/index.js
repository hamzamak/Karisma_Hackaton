import { combineReducers } from 'redux';
import authReducers from './auth';

import recetteReducers from './recette';

export const reducers = combineReducers({ recetteReducers  , authReducers });

