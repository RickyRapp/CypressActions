import React, { useEffect } from 'react';
import Link from './Link'
import {connect, useDispatch} from 'react-redux'; 
import { selectLoggedIn } from '../actions';

const Header = props => {   
 
    const currentPath = window.location.pathname.slice(1) 
    const dispatch = useDispatch();  

    useEffect(()=>{
        const newLoggedInAs = !props.currentLoggedInAs?currentPath:props.currentLoggedInAs
        dispatch(selectLoggedIn({type: 'LOGGED_IN', payload: newLoggedInAs}))
    })  

    return(  
        <div style={{textAlign:'center'}}>   
            <br />
            <Link loginType="" href="/" className={props.currentLoggedInAs===''||currentPath===''?"selected item":"item"}>
                Home
            </Link>
            <Link loginType="user" href="/user" className={props.currentLoggedInAs==='user'||currentPath==='user'?"selected item":"item"}>
                User
            </Link>
            <Link loginType="admin" href="/admin" className={props.currentLoggedInAs==='admin'||currentPath==='admin'?"selected item":"item"}>
                Admin
            </Link>
        </div>
    )
}


const mapStateToProps = state => { 
    return {
        currentLoggedInAs: state.currentLoggedInAs
    }
};  
  

export default connect(mapStateToProps)(Header);