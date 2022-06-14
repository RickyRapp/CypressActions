import React, { useEffect, useState} from 'react'; 
import RestaurantOptions from './RestaurantOptions'; 
import {  useDispatch, connect } from 'react-redux';
import axios from 'axios';
import { selectRestaurant, setRestaurant} from '../actions'; 
import '../App.css';
 
const RestaurantDropdown = props => {
    const dispatch = useDispatch();  
    const [currentRestaurant, setCurrentRestaurant] = useState(null)

    const getRestaurants = async () => { 
        const response = await axios
        .get('https://restaurant-selections.herokuapp.com/restaurants') 
        .catch((err) => {
            console.log("err",err)
        }) 
        dispatch(setRestaurant(response.data));
    }
    useEffect(() => {
        getRestaurants()
        setCurrentRestaurant(props.currentRestaurant) 
    },[props.selectedCategoryNum])  
 
    if(!props.selectedCategoryNum){
        return<div>Please select a category</div>
    }
    const handleRestaurantChange = e => {
        
        const address=e.target.childNodes[e.target.selectedIndex].getAttribute('address')
        const categoryNum=e.target.childNodes[e.target.selectedIndex].getAttribute('categoryNum')
        const name=e.target.childNodes[e.target.selectedIndex].getAttribute('restaurantName') 
        const id=e.target.childNodes[e.target.selectedIndex].getAttribute('id') 
        const restaurantNum = e.target.childNodes[e.target.selectedIndex].getAttribute('restaurantNum') 
        dispatch(selectRestaurant(e.target.value==='(Select One)' ? null : {restaurantNum, id, address, categoryNum, name }))
        setCurrentRestaurant(restaurantNum)
    }   
      const renderOptions =(props.restaurants).map(restaurant => { 
          
          return(
            <option 
            className={props.selectedCategoryNum.categoryNum > 0 && props.selectedCategoryNum.categoryNum == restaurant.categoryNum ?'show':'hide'} 
            key={restaurant.restaurantNum}
            value={restaurant.restaurantNum}
            address={restaurant.address}
            categoryNum={restaurant.categoryNum}
            restaurantNum={restaurant.restaurantNum}
            restaurantName={restaurant.name}
            id={restaurant._id} >{restaurant.name}
            </option> 
          )
        })  
        return( 
            <div>      
                <label className="ui label">Select a Restaurant</label>
                <select class="ui dropdown" value={!currentRestaurant?'-1':currentRestaurant} onChange={e=>handleRestaurantChange(e)}>
                    <option value='-1'>(Select One)</option>
                    {renderOptions} 
                </select>      
                {props.currentLoggedInAs==='admin'?<RestaurantOptions />:'' }
            </div> 
        ) 
}

const mapStateToProps = state => { 
    return { 
        restaurants: state.restaurants.restaurants ,
        setRestaurant : {setRestaurant},
        selectedCategoryNum: state.currentCategory,
        currentLoggedInAs: state.currentLoggedInAs,
        currentRestaurant: state.currentRestaurant
    };
};

//export default DropDownNew;
export default connect(mapStateToProps, {selectRestaurant} )(RestaurantDropdown)









