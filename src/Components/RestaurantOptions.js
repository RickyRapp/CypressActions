import React from "react"; 
import {connect, useDispatch} from 'react-redux';
import {selectRestaurant , deleteRestaurant, setRestaurant} from '../actions' 
import RestaurantAddForm from "./RestaurantAddForm";
import RestaurantEditForm from "./RestaurantEditForm";
import axios from "axios";

const RestaurantOptions = props => { 
    const dispatch = useDispatch()
    const deleteRestaurantNew = async id => { 
        await axios.delete(`https://restaurant-selections.herokuapp.com/restaurants/${id}`) 
        .catch((err) => {
            console.log("err",err)
        })           
        const response = await axios
        .get('https://restaurant-selections.herokuapp.com/restaurants') 
        .catch((err) => {
         console.log("err",err)
        }) 
        dispatch(setRestaurant(response.data));  
      }
 
    function AdminOptions(){
    return(
        <div style={{display:"flex", padding:"15px", justifyContent: "center"}}> 
            <br /> 
            <RestaurantAddForm />
            {
            !props.selectedRestaurant?
            '':
            <>
                <br />
                <div>
                    <button className="ui button" onClick={() => {if(window.confirm('Are you sure to delete this record?')){  deleteRestaurantNew(props.selectedRestaurant.id)};}}>Delete Restaurant</button> 
                </div>
                <br />
                <br />
                <RestaurantEditForm />
            </>
            }
        </div>
    )
   }
   return AdminOptions();
}

const mapDispatchToProps = state => ({ 
    selectedRestaurant:state.currentRestaurant
})
export default connect(mapDispatchToProps, {selectRestaurant})(RestaurantOptions)

//export default CategoryOptions;