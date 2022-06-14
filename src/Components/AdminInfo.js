import React from "react"; 
import DropDownNew from './DropDownNew'; 
import RestaurantDetailAdmin from "./RestaurantDetailAdmin";
 
const AdminInfo = () => { 
    return(
        <div>
            <br />
            <div className="ui header" style={{"display": "flex", justifyContent: "center"}}>Welcome! Please use the buttons below to add/edit categories and restaurants.</div>
            <div style={{"display": "flex", justifyContent:"center"}}><DropDownNew /></div><br />
            <div style={{"display": "flex", justifyContent:"center"}}><RestaurantDetailAdmin /> </div>
        </div>
    )
}

export default AdminInfo;