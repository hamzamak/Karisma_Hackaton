import { START_LOADING, END_LOADING, FETCH_RECETTES, DELETE_RECETTE, ADD_RECETTE, UPDATE_RECETTE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getRecettesByUser = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecettesByUser();
    dispatch({ type: FETCH_RECETTES, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error.message);
  }
};


export const deleteRecetteById = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.deleteRecetteByID(id);
      dispatch({ type: DELETE_RECETTE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      dispatch({ type: END_LOADING });
      console.log(error.message);
    }
  };
  

  export const addRecette = (formData) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.addRecette(formData);
      dispatch({ type: ADD_RECETTE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      dispatch({ type: END_LOADING });
      console.log(error.message);
    }
  };
  

  export const updateRecette = (formData) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.updateRecette(formData);
      dispatch({ type: UPDATE_RECETTE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      dispatch({ type: END_LOADING });
      console.log(error.message);
    }
  };
  