import { combineReducers } from 'redux';
import { actionTypes } from '../actions/Action-types';

const initialCState =  {
  categories: []
}; 

const initialRState =  {
  restaurants: []
}; 

const categoryReducer = (state=initialCState, {type, payload}) => { 
  switch (type){
      case 'SET_CATEGORY':
          return {...state, categories:payload}
      case "REMOVE_SELECTED_CATEGORY":
          return {...state, categories: state.categories.filter((el) => el.id !== payload)} 
      case "ADD_SELECTED_CATEGORY":
        return {...state, categories:payload}
      default:
          return state;
  }
}

const restaurantReducer = (state=initialRState, {type, payload}) => {
  switch (type){
      case 'SET_RESTAURANT':
          return {...state, restaurants:payload}
      case "REMOVE_SELECTED_RESTAURANT":
          return {...state, restaurants: state.restaurants.filter((el) => el._id !== payload)} 
      case "ADD_SELECTED_CATEGORY":
          return {...state, restaurants:state.restaurants, ...payload}
      default:
          return state;
  }
}

const selectedCategoryReducer = (state=null, {type, payload}) => {
  switch (type){
      case "CATEGORY_SELECTED":
          return {id:payload.id, categoryNum:payload.categoryNum, categoryName:payload.categoryName} 
      default:
          return state;
  }
}

 
const loggedInReducer = (loggedInAs=null, action) => { 
  switch (action.type) {

    case 'LOGGED_IN':
      return action.payload;  

    default:
      return loggedInAs;
  }       
} 

const selectedRestaurantReducer = (selectedRestaurant = null, action) => {
  switch (action.type) { 
 
      case 'RESTAURANT_SELECTED':
        return action.payload;
        //return {id:payload.id, categoryNum:payload.categoryNum, categoryName:payload.categoryName}
    
      default:
        return selectedRestaurant;
  } 
};


export default combineReducers({
  categories: categoryReducer,
  restaurants: restaurantReducer,
  currentCategory:selectedCategoryReducer,
  currentRestaurant:selectedRestaurantReducer,
  currentLoggedInAs:loggedInReducer
});
