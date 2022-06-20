import React  from "react";
import DropDownNew from './DropDownNew';
import RestaurantDetailsUser from "./RestaurantDetailsUser";
import RestaurantMap from "./RestaurantMap";
import {connect} from 'react-redux'; 

const UserInfo = props => { 
    return(
        <div>
            <br />
            <div className="ui header" style={{"display": "flex", justifyContent: "center"}}>Welcome! Please choose a category to view the list of restaurants!</div><br />
            <div style={{"display": "flex", justifyContent: "center"}}><DropDownNew /></div><br /> 
        {
            props.currentRestaurant 
            ?
            <div style={{"display": "flex", justifyContent: "center"}}><RestaurantMap restaurants={props.restaurants} /><RestaurantDetailsUser /> </div>
            : ''}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentRestaurant: state.currentRestaurant,
        restaurants: state.restaurants
    } 
  }
  
export default connect(mapStateToProps) (UserInfo); 