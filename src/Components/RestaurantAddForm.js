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
    const [associatedCategory2, setAssociatedCategory2] = useState(props.currentCategory.categoryNum); 
    const [showStatus, setShowStatus] = useState(false); 
    const [currentStatus, setCurrentStatus] = useState("");  
    const [message, setMessage] = useState("");  
    const dispatch = useDispatch() 

    const addingRestaurant = () => {
        setShowButton(false)  
    }
 
    const handleSubmit = async e => { 
          e.preventDefault();
        //  const newRestaurantName = restaurantName
        //  const newRestaurantAddress = restaurantAddress
        //  const newAssociatedCategory = associatedCategory 
          const newRestaurantsInfo =  {
            'address'  :    restaurantAddress,
            'categoryNum' :    associatedCategory,
            'name'     :    restaurantName 
         };    
         Geocode.setApiKey("AIzaSyByvZEhbhUOwuNnMkiOmz6LRDG9hmz2BnM")
         Geocode.enableDebug();
         const address = restaurantAddress;  
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
                console.log("returning?")
           }
         ); 
           if(currentStatus == "error"){
               console.log("returning...?")
               return;
           }

            await fetch(`https://restaurant-selections.herokuapp.com/restaurants`, {  
                method:'POST',
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
                .get(`https://restaurant-selections.herokuapp.com/restaurants?categoryNum=${props.currentCategory?props.currentCategory.categoryNum:''}`) 
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
                <button id="addRestaurant" className="ui button" onClick={()=> addingRestaurant() } >Add Restaurant</button>
                :
                <form onSubmit={handleSubmit}>
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
                        <select className="ui dropdown" onChange={e=>{setAssociatedCategory(e.target.value)}}>
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
            :''}
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

