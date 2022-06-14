import React, {useEffect} from 'react';   
import CategoryOptions from './CategoryOptions';
import {  useDispatch, connect } from 'react-redux'; 
import axios from 'axios';
import { setCategory, selectCategory, selectRestaurant } from '../actions'; 

const CategoryDropDown = props =>  { 
    const dispatch = useDispatch(); 
 
    const getCategories = async () => { 
        const response = await axios
        .get('https://restaurant-selections.herokuapp.com/categories') 
        .catch((err) => {
            console.log("err",err)
        }) 
        console.log(response.data)
        dispatch(setCategory(response.data));
    }
    useEffect(() => { 
        getCategories() 
    },[]) 
    
    const setOption = (props.categories).map((category) => { 
        return (
            <option  
                value={category.categoryNum}
                id={category._id}
                key={category._id}
                >
                {category.categoryName}
            </option>
        )
    })
    return ( 
        <div>
            <label className="ui label">Select a Category</label>
            <select value={!props.selectedCategoryNum?'-1':props.selectedCategoryNum.categoryNum} class="ui dropdown" onChange={e =>props.selectedCategory(e) } >
                <option value='-1'>Select One</option>
                {setOption}
            </select> 
            {props.currentLoggedInAs==='admin'?<CategoryOptions />:'' }
            <br />

        </div>
    )
}

const mapStateToProps = state => ( 
    {  
        categories: state.categories.categories ,
        setCategory : {setCategory},
        selectedCategoryNum : state.currentCategory  ,
        currentLoggedInAs : state.currentLoggedInAs  
});

const mapDispatchToProps = (dispatch) => ({

    /*@yossi: The below function is getting different details from the selected option which I'm storing 
    in the state. I know this is not the best way to do this - is there another way? */
     
      selectedCategory: e => {  
        const id=e.target.childNodes[e.target.selectedIndex].getAttribute('id') 
        const categoryNum=e.target.childNodes[e.target.selectedIndex].getAttribute('value') 
        const categoryName=e.target.childNodes[e.target.selectedIndex].innerHTML  
        console.log(`selected category ${categoryNum}`)
        dispatch(selectCategory({categoryNum, id, categoryName}))
        dispatch(selectRestaurant(null))
      }    
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropDown)

 








