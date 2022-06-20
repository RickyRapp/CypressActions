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

        const deleteCategoriesNew = async id => { 
            await axios.delete(`https://restaurant-selections.herokuapp.com/categories/${id}`) 
            .catch((err) => {
                console.log("err",err)
            })           
            const response = await axios
            .get('https://restaurant-selections.herokuapp.com/categories') 
            .catch((err) => {
             console.log("err",err)
            }) 
            dispatch(setCategory(response.data));  
          }

    return( 
        <div style={{display:"flex", padding:"15px", justifyContent: "center"}}> 
            <br /> 
            <CategoryAddForm />
            {
            !props.selectedCategory?
            '':
            <>
                <br />
                <div>
                    <button id="deleteCategory" className="ui button" onClick={() => {if(window.confirm('Are you sure to delete this record?')){  deleteCategoriesNew(props.selectedCategory.id)};}}>Delete Category</button>
                </div>
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
 