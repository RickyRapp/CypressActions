import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const RestaurantDetailsUser = props=> { 
    const [showButton, setShowButton] = useState(true);
    const [name, setName] = useState("");  
    const [message, setMessage] = useState("");  
    const [showStatus, setShowStatus] = useState("");  
    const [currentStatus, setCurrentStatus] = useState("");  
    const [restaurantName, setRestaurantName] = useState(props.currentRestaurant.name);  
    const [restaurantAddress, setRestaurantAddress] = useState(props.currentRestaurant.address);  
    const [startDate, setStartDate] = useState(new Date()); 
    
   useEffect(()=>{
    setRestaurantAddress(props.currentRestaurant.address)
    setRestaurantName(props.currentRestaurant.name)
  },[props.currentRestaurant]) 

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
          setShowStatus(true)  
          setCurrentStatus('success')
          setTimeout(() => {
            setShowStatus(false)   
            setShowButton(true) 
          }, 3000); 
      } 
      catch (err){
            setCurrentStatus('success')
          setMessage(`There was an issue: ${err}`);
      }
        

    }
    console.log(props)
    return(
        <div>
            <h3>Restaurant Details</h3>
            <p>
                <label>Name: </label>{restaurantName}<br />
                <label>Address: </label>{restaurantAddress}
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
                {
                    showStatus?
                        currentStatus=="error"?
                            <div className="ui negative message error"> 
                                <div className="header">
                                    {message}
                                </div> 
                            </div>
                        :
                            <div className="ui negative message success"> 
                                <div className="header">
                                    Booking successfully saved!
                                </div> 
                            </div>
                    :''
                }
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