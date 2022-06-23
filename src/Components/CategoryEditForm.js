import React, {useEffect, useState} from 'react';
import {  useDispatch, connect } from 'react-redux';  
import { setCategory, updateCategories } from '../actions'; 
import axios from 'axios';
import '../App.css';

const CategoryEditForm = props => {
     
    const currentCategoryName = props.currentCategory.categoryName
  //  console.log(currentCategoryName)
    const [showButton, setShowButton] = useState(true);
    const [category, setNewCategory] = useState("");
    const [message, setMessage] = useState("testing123"); 
    const [showStatus, setShowStatus] = useState(false); 
    const [currentStatus, setCurrentStatus] = useState(""); 
    const [testing, setTesting] = useState(false); 
    const dispatch = useDispatch()

    useEffect(()=>{
      setNewCategory(currentCategoryName)
    },[currentCategoryName]) 

    const handleSubmit = async e => {
          e.preventDefault(); 
          const categoryName = category
          const id=props.currentCategory.id 

          if(category.trim().length===0){ 
            setCurrentStatus("error")
            setMessage("Please enter valid category!")
            setShowStatus(true)
            setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowStatus(false)
                setShowButton(true) 
            }, 5000)    
            return;
          }
        
          await fetch(`https://restaurant-selections.herokuapp.com/categories/${id}`, {
          method:'PATCH', 
          headers: {"content-type":"application/json"}, 
          body: JSON.stringify({categoryName}) 
    })
    try {
        setNewCategory(""); 
        setMessage("testing 1123");
        setCurrentStatus("success");  
        setShowStatus(true)   
        const response = await axios
        .get('https://restaurant-selections.herokuapp.com/categories') 
        .catch((err) => {
         console.log("err",err)
        }) 
        dispatch(setCategory(response.data));  
      } 
    catch (err){
        setMessage(`There was an issue: ${err}`);
        setCurrentStatus("error");     
        setShowStatus(true);
    }
    setTimeout(() => {
        // After 3 seconds set the show value to false
        setShowStatus(false)
        setShowButton(true) 
    }, 5000)   
  }
    
    return(
        <div>
          <div>
            {showButton ? 
            <button id="editCategory" className="ui button" onClick={()=> setShowButton(false) }>Edit Category</button>
            :
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Category Name
                </label>
                <input required onChange={(e) => setNewCategory(e.target.value)}
                type="text"
                name="category"
                value={category}
                placeholder="Name"  
                className="ui input"
                />
                <br />
                <div>
                <button type="submit" className="ui button">Save Category</button>
                <button className="ui button" onClick={()=> setShowButton(true) }>Cancel</button> 
                </div>
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
                <div className="ui positive message success"> 
                    <div className="header">
                        Category successfully updated!
                    </div> 
                </div>
            :''}
        </div>
    )}

    
    const mapStateToProps = state => {
        return {
          currentCategory: state.currentCategory
        } 
    }
    
    const mapDispatchToProps = dispatch => {
        return {
            updateCategory: () => dispatch(updateCategories())
          }          
    }

    export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditForm);

