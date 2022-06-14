//import { options } from 'nodemon/lib/config';

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'; 
import axios from 'axios';
import moment from 'moment';

const RestaurantDetailsAdmin = props => {
    const [showButton, setShowButton] = useState(true);
    const [allBookings, setallBookings] = useState([]);  
  
    useEffect(() => { 
        getBookings() 
    },[props.currentRestaurant]) 

    const getBookings = async () => {  
        if(!props.currentRestaurant){
            return;
        }
        const restaurantNum = props.currentRestaurant.restaurantNum 
        console.log(restaurantNum)
        const response = await axios
        .get(`https://restaurant-selections.herokuapp.com/bookings?restaurantNum=${restaurantNum}`) 
        .catch((err) => {
            console.log("err",err)
        }) 
        setallBookings(response.data);
    }
    if(!props.currentRestaurant){
        return <div>Select a Restaurant!</div>
    }
  
    return(
        <div>
            <h1 className="ui header">Restaurant Details</h1>
            <p>
                Name:{props.currentRestaurant.name}<br />
                Address:{props.currentRestaurant.address}
            </p>  
            <h2 className="ui header">Bookings:</h2> 
            <div>
                {allBookings?allBookings.map((booking)=>{
                    var date=booking.date
                    var NewDate= moment(date, 'DD-MM-YYYY').format();
                    NewDate=NewDate.split('T')[0];
                     return <div key={booking.bookingNum}>
                                {`#${booking.bookingNum}  : ${booking.clientName} reserved a table for the date ${NewDate}`}
                            </div>}):''}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => { 
    return {
        currentRestaurant: state.currentRestaurant
    }
};

export default connect(mapStateToProps)(RestaurantDetailsAdmin); 
//export default (RestaurantDetails); 