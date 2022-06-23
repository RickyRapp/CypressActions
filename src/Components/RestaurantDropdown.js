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
        .get(`https://restaurant-selections.herokuapp.com/restaurants?categoryNum=${props.selectedCategoryNum?props.selectedCategoryNum.categoryNum:''}`) 
        .catch((err) => {
            console.log("err",err)
        }) 
        dispatch(setRestaurant(response.data));
    }
    useEffect(() => {
        getRestaurants()
        console.log(props)
        setCurrentRestaurant(props.currentRestaurant?props.currentRestaurant.restaurantNum:'') 
    },[props.selectedCategoryNum])  
 
    if(!props.selectedCategoryNum){
        return ''
    }
    const handleRestaurantChange = async e => {
        console.log(e.target.value)
        const response = await axios
        .get(`https://restaurant-selections.herokuapp.com/restaurants?restaurantNum=${e.target.value}`) 
        .catch((err) => {
            console.log("err",err)
        })  
        console.log(response.data)
        const {address, categoryNum, restaurantNum, name} = response.data
        const id = response.data._id
        console.log(id) 
        dispatch(selectRestaurant(restaurantNum==='-1' ? null :{address, categoryNum, id, restaurantNum, name}))
        setCurrentRestaurant(restaurantNum)
    }   

    console.log(props.restaurants)
      const renderOptions =(props.restaurants).map(restaurant => { 
          
          return(
            <option value={restaurant.restaurantNum} key={restaurant.id}>{restaurant.name}
            </option> 
          )
        })   
        return( 
            <div>      
                <label><b>Select a Restaurant </b></label>
                <select value={currentRestaurant?currentRestaurant:"-1"} id="restaurantSelect" class="ui dropdown" onChange={e=>handleRestaurantChange(e)}>
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









