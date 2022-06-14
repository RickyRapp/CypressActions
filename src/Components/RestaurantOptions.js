import React  from "react"; 
import {connect} from 'react-redux';
import {selectRestaurant , deleteRestaurant} from '../actions' 
import RestaurantAddForm from "./RestaurantAddForm";
import RestaurantEditForm from "./RestaurantEditForm";

const RestaurantOptions = props => { 
 
    function AdminOptions(){
    return(
        <div style={{display:"flex", padding:"15px"}}> 
            <br /> 
            <RestaurantAddForm />
            {
            !props.selectedRestaurant?
            '':
            <>
                <br />
                <button className="ui button" onClick={()=> deleteRestaurant(props.selectedRestaurant.id)}>Delete Restaurant</button> 
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