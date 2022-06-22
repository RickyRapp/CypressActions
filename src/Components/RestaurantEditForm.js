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
   // const {currentRestaurantName, currentRestaurantAddress, id, currentAssociatedCategory} = props.currentRestaurant
   // console.log(props.currentRestaurant)
    const {name, address, id, categoryNum} = props.currentRestaurant 
    const [associatedCategory, setAssociatedCategory] = useState(categoryNum);
    const [message, setMessage] = useState("");   
    const dispatch = useDispatch() 

    useEffect(()=>{
        setRestaurantName(name)
        setRestaurantAddress(address)
        setAssociatedCategory(categoryNum)
    },[name, address, categoryNum])  
 
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
         if(restaurantName.trim().length===0 || restaurantAddress.trim().length===0){ 
            restaurantName.trim().length===0?setMessage("Please enter valid restaurant!"):setMessage("Please enter valid restaurant address!")
            setCurrentStatus("error")
            setShowStatus(true) 
            return;
         } 
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
                setTimeout(() => { 
                //    setShowButton(true) 
                    setShowStatus(false) 
                }, 3000); 
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
            console.log(props.currentCategory.categoryNum) 
            const response = await axios
            .get(`https://restaurant-selections.herokuapp.com/restaurants?categoryNum=${props.currentCategory?props.currentCategory.categoryNum:''}`) 
            .catch((err) => {
                console.log("err",err)
            }) 
            console.log(response.data)
            dispatch(setRestaurant(response.data));  
            setTimeout(() => { 
                setShowButton(true) 
                setShowStatus(false) 
            }, 3000); 
        } 
        catch (err){
            setMessage(`There was an issue: ${err}`);
            setCurrentStatus("error");     
            setShowStatus(true); 
        }            
        setTimeout(() => { 
            setShowButton(true) 
            setShowStatus(false) 
        }, 3000); 
    }
    console.log(restaurantName)
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
           currentCategory: state.currentCategory 
        } 
    }
    
    const mapDispatchToProps = dispatch => {
        return {
            updateRestaurant: () => dispatch(updateRestaurant())
          }          
    }

    export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEditForm);

