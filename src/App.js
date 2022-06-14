//import CreateNewRestaurant from './forms/CreateNewRestaurant';
import React, {useState, useRef} from 'react'; 
//import DropDownNew from './dropdown';
import UserInfo from './Components/UserInfo';
import AdminInfo from './Components/AdminInfo';
import Header from './Components/Header';
import Route from './Components/Route'; 
 
const App = () => {  
  return (
    <div>   
      <Header />
      <Route path="/">
        <div className='ui header' style={{textAlign:"center"}}>Welcome!</div>
      </Route>
      <Route path="/user">
        <UserInfo />
      </Route>
      <Route path="/admin">
        <AdminInfo />
      </Route>
    </div>
    
  );
}

export default App;