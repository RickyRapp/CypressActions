import React, {useState } from 'react'  
import {selectLoggedIn} from '../actions'; 
import { useDispatch } from 'react-redux';
 
const LoginScreen = () => {
    
    const [errorMessages, setErrorMessages] = useState({}); 
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState(""); 
    const dispatch = useDispatch()
  //  const navigate = useNavigate();

    const database = [
    {
        username: "user",
        password: "pass1"
    },
    {
        username: "admin",
        password: "pass2"
    }
    ];
  
    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    const renderErrorMessage = (name) =>
    name === errorMessages.name && ( 
        <div className="ui negative message error"><div class="header">{errorMessages.message}</div></div>
    );
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault(); 
        
          // Find user login info
        const userData = database.find((user) => user.username === userName);

        console.log(userData)

        // Compare user info
        if (userData) {
            if (userData.password !== password) { 
                setErrorMessages({ name: "pass", message: errors.pass }); 
            } else {  
                window.history.pushState({}, '', `/${userName}`); 
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
                dispatch(selectLoggedIn({type: 'LOGGED_IN', payload: userName})); 
                setIsSubmitted(true);
            }
        } 
        else {
    // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };
    
    // JSX code for login form
    const renderForm = (
        <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="input-container">
            <label>Username </label>
            <input onChange={ (e) => setUserName(e.target.value) } value={userName} type="text" id="uname" name="uname" required />
            {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
            <label>Password </label>
            <input onChange={ (e) => setPassword(e.target.value) } value={password} type="password" id="pass" name="pass" required />
            {renderErrorMessage("pass")}
            </div>
            <div style={{marginTop:"35px"}} className="button-container">
            <input type="submit" />
            </div>
        </form>
        </div>
    );

    console.log(errorMessages)
    return  (
        <div className="login-form">
            <div className="title">Sign In</div>
            {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
    )
     
}

export default LoginScreen;