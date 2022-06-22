import React from "react";
import CategoryDropDown from "./CategoryDropdown";  
import RestaurantDropdown from './RestaurantDropdown' 
import { selectLoggedIn } from "../actions";
import { useDispatch } from "react-redux";

const DropDownNew = () => { 
    const dispatch = useDispatch()
    const logOut = () => { 
        window.history.pushState({}, '', "/"); 
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        dispatch(selectLoggedIn({type: 'LOGGED_IN', payload: null})); 
    }
    return (
        <div style={{textAlign:"center"}}>
            <br /> 
            <CategoryDropDown />
            <br /> 
            <RestaurantDropdown />
            <br />
            <button className="ui button" onClick={logOut}>Logout</button>
        </div>
    )
}
 

export default DropDownNew;