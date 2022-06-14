import React, {useState} from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { getCategories, setCategory } from '../actions'; 
import axios from 'axios';

const CategoryAddForm = props => {
    
    const [showButton, setShowButton] = useState(true);
    const [category, setNewCategory] = useState("");
    const [message, setMessage] = useState(""); 
    const dispatch = useDispatch();

    const handleSubmit = async e => {
          e.preventDefault();
          const categoryName = {category}
          console.log(categoryName)
        
            const newCategory = await fetch('https://restaurant-selections.herokuapp.com/categories', {
            method:'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(categoryName) 
    })
     try{
         
            setNewCategory(""); 
            setMessage("Created successfully"); 
            setShowButton(true)
           const response = await axios
           .get('https://restaurant-selections.herokuapp.com/categories') 
           .catch((err) => {
               console.log("err",err)
           }) 
           dispatch(setCategory(response.data)); 
        }  
        catch (err){
            setMessage(`There was an issue: ${err}`);
        }
          

      }
    
    return(
        <div>
            {showButton ? 
            <button className="ui button" onClick={()=> setShowButton(false) }>Add a Category</button>
            :
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setNewCategory(e.target.value)}
                type="text"
                name="category"
                value={category}
                placeholder="Name"  
                className="ui input"
                />
                <button  className="ui button" type="submit">Save</button>
                <button className="ui button" onClick={()=> setShowButton(true) }>Cancel</button> 
            </form>
            }
            {message}
        </div>
    )}

    
    const mapDispatchToProps = dispatch => {
        return {
          getCategories: () => dispatch(getCategories())
        } 
    }
    export default connect(null, mapDispatchToProps)(CategoryAddForm);

