import React, {useState} from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { getCategories, setCategory } from '../actions'; 
import axios from 'axios';

const CategoryAddForm = props => {
    
    const [showButton, setShowButton] = useState(true);
    const [category, setNewCategory] = useState("");
    const [message, setMessage] = useState("testing123"); 
    const [showStatus, setShowStatus] = useState(false); 
    const [currentStatus, setCurrentStatus] = useState(""); 
    const dispatch = useDispatch();

    const handleSubmit = async e => {
          e.preventDefault();
          const categoryName = {category}  
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
        
          const newCategory = await fetch('https://restaurant-selections.herokuapp.com/categories', {
          method:'POST',
          headers: {"content-type":"application/json"},
          body: JSON.stringify(categoryName) 
    })
     try{  
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
                <button id="addCategory" className="ui button" onClick={()=> setShowButton(false) }>Add a Category</button>
                :
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter Category Name
                    </label>
                    <input required id="categoryName"  onChange={(e) => setNewCategory(e.target.value)}
                    type="text"
                    name="category"
                    value={category}
                    placeholder="Name"  
                    className="ui input"
                    />
                    <br />  
                    <div>
                    <button className="ui button" type="submit">Save Category</button>
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
                    <div className="ui negative message success"> 
                        <div className="header">
                            Category successfully saved!
                        </div> 
                    </div>
            :''}
        </div>
    )}

    
    const mapDispatchToProps = dispatch => {
        return {
          getCategories: () => dispatch(getCategories())
        } 
    }
    export default connect(null, mapDispatchToProps)(CategoryAddForm);

