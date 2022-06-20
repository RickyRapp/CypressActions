import React, {useEffect, useState} from 'react';
import {  connect, useDispatch } from 'react-redux';  
import { updateRestaurant, setRestaurant} from '../actions'; 
import axios from 'axios'
import Geocode from "react-geocode"; 

const RestaurantEditForm = props => {
     
    const setOption = (props.categories).map((category) => { 
        return (
            <option  
                value={category.categoryNum} 
                key={category._id}
                >
                {category.categoryName}
            </option>
        )
    }) 

    const [showStatus, setShowStatus] = useState(false); 
    const [currentStatus, setCurrentStatus] = useState(""); 
    const [showButton, setShowButton] = useState(true);
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const currentAssociatedCategory = props.currentRestaurant.categoryNum
    const [associatedCategory, setAssociatedCategory] = useState(currentAssociatedCategory);
    const [message, setMessage] = useState("");   
    const currentRestaurantName = props.currentRestaurant.name
    const currentRestaurantAddress = props.currentRestaurant.address
    const id = props.currentRestaurant.id 
    const dispatch = useDispatch() 

    useEffect(()=>{
        setRestaurantName(currentRestaurantName)
        setRestaurantAddress(currentRestaurantAddress)
        setAssociatedCategory(currentAssociatedCategory)
    },[currentRestaurantName, currentRestaurantAddress, currentAssociatedCategory])  
 
    const handleSubmit = async e => {
          e.preventDefault();
          const newRestaurantName = restaurantName
          const newRestaurantAddress = restaurantAddress
          const newAssociatedCategory = associatedCategory
          const newRestaurantsInfo =  {
            'address'  :    newRestaurantAddress,
            'categoryNum' :    newAssociatedCategory,
            'name'     :    newRestaurantName 
         };   
         if(restaurantName.trim().length===0 || restaurantAddress.trim().length===0){ 
            restaurantName.trim().length===0?setMessage("Please enter valid restaurant!"):setMessage("Please enter valid restaurant address!")
            setCurrentStatus("error")
            setShowStatus(true) 
            return;
         } 
         Geocode.setApiKey("AIzaSyByvZEhbhUOwuNnMkiOmz6LRDG9hmz2BnM")
         Geocode.enableDebug();
         const address = newRestaurantAddress;  
         Geocode.fromAddress(address).then(
           (response) => {  
                console.log(response.status) 
                setCurrentStatus("")
           },
           (error) => {         
                setCurrentStatus("error")
                setMessage("Please enter valid address!")
                setShowStatus(true)  
                setShowButton(false)
                return; 
           }
         ); 
         if(currentStatus == "error"){
                return;
         }
        
        await fetch(`https://restaurant-selections.herokuapp.com/restaurants/${id}`, {  
               method:'PATCH',
               headers: {"content-type":"application/json"}, 
               body: JSON.stringify(newRestaurantsInfo) 
        })
         try{
            setAssociatedCategory(""); 
            setRestaurantName(""); 
            setRestaurantAddress("");   
            setCurrentStatus("success"); 
            setShowStatus(true)       
            const response = await axios
            .get('https://restaurant-selections.herokuapp.com/restaurants') 
            .catch((err) => {
                console.log("err",err)
            }) 
            dispatch(setRestaurant(response.data));  
            setTimeout(() => { 
                setShowButton(true) 
                setShowStatus(false) 
            }, 5000); 
        } 
        catch (err){
            setMessage(`There was an issue: ${err}`);
            setCurrentStatus("error");     
            setShowStatus(true); 
        } 
    }
    
    return(
        <div>
            <div>
                {showButton ? 
                <button id="editRestaurant" className="ui button" onClick={()=> setShowButton(false) }>Edit Restaurant</button>
                :
                <form onSubmit={handleSubmit}>
                    <br />
                    <div>
                        <input required onChange={(e) => setRestaurantName(e.target.value)}
                        type="text" 
                        value={restaurantName}
                        placeholder="Restaurant Name" 
                        className="ui input"
                        />
                    </div>
                    <div>
                        <input required onChange={(e) => setRestaurantAddress(e.target.value)}
                        type="text" 
                        value={restaurantAddress}
                        placeholder="Address"  
                        className="ui input"
                        />
                    </div>
                    <div>
                        <select className="ui dropdown" value={associatedCategory} onChange={e=>{setAssociatedCategory(e.target.value)}}>
                            {setOption}
                        </select>
                    </div>
                    <button className="ui button" type="submit">Save Restaurant</button>
                    <button className="ui button" onClick={()=> setShowButton(true) }>Cancel</button> 
                </form>
                }
            </div>
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
                            Restaurant successfully saved!
                        </div> 
                    </div>
            :''
            }
        </div>
    )}

    
    const mapStateToProps = state => {
        return {
           currentRestaurant: state.currentRestaurant,
           categories: state.categories.categories ,
        } 
    }
    
    const mapDispatchToProps = dispatch => {
        return {
            updateRestaurant: () => dispatch(updateRestaurant())
          }          
    }

    export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEditForm);

