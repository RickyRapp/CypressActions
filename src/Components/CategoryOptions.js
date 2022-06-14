import React  from "react";
import CategoryAddForm from "./CategoryAddForm";  
import CategoryEditForm from './CategoryEditForm';
import {connect, useDispatch} from 'react-redux';
import { deleteCategories, setCategory} from '../actions'
import axios from "axios";

const CategoryOptions = props => {
    const dispatch = useDispatch();
  //  const [showCategoryAddButton, setshowCategoryAddButton] = useState(true)
   // const [showCategoryViewButton, setshowCategoryViewButton] = useState(true)
  
    function AdminOptions(){
    return( 
        <div style={{display:"flex", padding:"15px"}}> 
            <br /> 
            <CategoryAddForm />
            {
            !props.selectedCategory?
            '':
            <>
                <br />
                <button className="ui button" onClick={()=> deleteCategories(props.selectedCategory.id)}>Delete Category</button> 
                <br />
                <br />
                <CategoryEditForm />
            </>
            }
        </div>
    )
   }
   return AdminOptions();
}

const mapStateToProps = state => ({ 
    selectedCategory:state.currentCategory,
    selectCategory: state.selectCategory
})
const mapDispatchToProps = dispatch => ({ 
    deleteCategories: async (category) => {
        dispatch(deleteCategories(category)) 
    } 
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptions)
 