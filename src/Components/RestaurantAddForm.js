import React, { useState} from 'react'; 
import { useDispatch, connect } from 'react-redux';  
import { setRestaurant, updateRestaurant} from '../actions'; 
import axios from 'axios'
import Geocode from "react-geocode"; 

const RestaurantAddForm = props => {
      
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
    const [showButton, setShowButton] = useState(true);
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [associatedCategory, setAssociatedCategory] = useState(props.currentCategory.categoryNum);
    const [message, setMessage] = useState("");  
    const dispatch = useDispatch()

    console.log(restaurantAddress)

    const addingRestaurant = () => {
        setShowButton(false)
        setMessage("")
    }
 
    const handleSubmit = async e => {
          e.preventDefault();
          const newRestaurantName = restaurantName
          const newRestaurantAddress = restaurantAddress
          const newAssociatedCategory = associatedCategory
          console.log(associatedCategory)
          const newRestaurantsInfo =  {
            'newRestaurantAddress'  :    newRestaurantAddress,
            'newAssociatedCategory' :    newAssociatedCategory,
            'newRestaurantName'     :    newRestaurantName 
         };   

         Geocode.setApiKey("AIzaSyByvZEhbhUOwuNnMkiOmz6LRDG9hmz2BnM")
         Geocode.enableDebug();
         const address = restaurantAddress; 
         console.log(address)
         Geocode.fromAddress(address).then(
           (response) => {  
             console.log(response.status) 
           },
           (error) => {
             console.error(`error:${error}`); 
             setMessage("invalid address")
             return; 
             console.log(error.status)
           }
         ); 

          const newRestaurant = await fetch(`https://restaurant-selections.herokuapp.com/restaurants`, {  
          method:'POST',
          headers: {"content-type":"application/json"}, 
          body: JSON.stringify({newRestaurantsInfo}) 
    })
     try{ 
            setRestaurantName(""); 
            setRestaurantAddress("");  
            setShowButton(true)
            setMessage("Restaurant Added!")
            const response = await axios
            .get('https://all-restaurants.herokuapp.com/restaurants') 
            .catch((err) => {
                console.log("err",err)
            }) 
            dispatch(setRestaurant(response.data));  
        } 
        catch (err){
            setMessage(`There was an issue: ${err}`);
        }
          

      }
    
    return(
        <div>
            {showButton ? 
            <button className="ui button" onClick={()=> addingRestaurant() } >Add Restaurant</button>
            :
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={(e) => setRestaurantName(e.target.value)}
                    type="text" 
                    value={restaurantName}
                    placeholder="Restaurant Name"  
                    className="ui input"
                    />
                </div>
                <div>
                    <input onChange={(e) => setRestaurantAddress(e.target.value)}
                    type="text" 
                    value={restaurantAddress}
                    placeholder="Address"  
                    className="ui input"
                    />
                </div>
                <div>
                    <select onChange={e=>{setAssociatedCategory(e.target.value)}}>
                        {setOption}
                    </select>
                </div>
                <button className="ui button" type="submit">Save</button>
                <button className="ui button" onClick={()=> setShowButton(true) }>Cancel</button> 
            </form>
            }
            {message}
        </div>
    )}

    
    const mapStateToProps = state => {
        return {
           currentRestaurant: state.currentRestaurant,
           categories: state.categories.categories ,
           currentCategory: state.currentCategory ,
        } 
    }
    
    const mapDispatchToProps = dispatch => {
        return {
            updateRestaurant: () => dispatch(updateRestaurant()) 
          }          
    }

    export default connect(mapStateToProps, mapDispatchToProps)(RestaurantAddForm);

