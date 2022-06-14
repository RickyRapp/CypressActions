import React, {useState} from 'react';
import {connect} from 'react-redux'; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const RestaurantDetailsUser = props=> { 
    const [showButton, setShowButton] = useState(true);
    const [name, setName] = useState("");  
    const [startDate, setStartDate] = useState(new Date());
   // const [message, setMessage] = useState(""); 

    const handleSubmit = async e => {
        e.preventDefault();
        const reservationName = name
        const date = startDate
        const restaurantNum = props.currentRestaurant.restaurantNum


       if(restaurantNum===''){ 
           return;
       }
      
        const newBooking = await fetch(`https://restaurant-selections.herokuapp.com/bookings`, {  
        method:'POST',
        headers: {"content-type":"application/json"},  
        body: JSON.stringify({ 
            reservationName,
            date,
            restaurantNum }) 
   })
   try{ 
          setName(""); 
          setStartDate("");   
          setShowButton(true) 
      } 
      catch (err){
          console.log(`There was an issue: ${err}`);
      }
        

    }
    console.log(props)
    return(
        <div>
            <h3>Restaurant Details</h3>
            <p>
                Name:{props.currentRestaurant.name}<br />
                Address:{props.currentRestaurant.address}
            </p> 
            <testStuff />
            <React.Fragment>
                {showButton ? 
                <button className="ui button" onClick={()=> setShowButton(false) }>Add a Booking!</button>
                :
                <form onSubmit={e => handleSubmit(e)}>
                 <div>
                    <input onChange={(e) => setName(e.target.value)}
                    type="text" 
                    value={name}
                    placeholder="Name" 
                    />
                </div>
                <div>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> 
               
                </div> 
                <button className="ui button" type="submit">Save</button>
                <button className="ui button" onClick={()=> setShowButton(true) }>Cancel</button> 
                </form> 
                }
            </React.Fragment>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentRestaurant: state.currentRestaurant
    }
};

export default connect(mapStateToProps)(RestaurantDetailsUser); 
//export default (RestaurantDetails); 