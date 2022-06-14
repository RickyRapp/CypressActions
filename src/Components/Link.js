import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {selectLoggedIn} from '../actions'; 


const Link = ({ className, loginType, href, children }) => {
  const currentPath = window.location.pathname.slice(1)
  const dispatch = useDispatch();
  const loggedState = useSelector(state => state.currentLoggedInAs) 
 // const newLoggedInAs = !loginType && currentPath ? currentPath : loginType 
 const newLoggedInAs = loginType

  const navigatePage = (event) => { 
    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
    dispatch(selectLoggedIn({type: 'LOGGED_IN', payload: newLoggedInAs}));
  };
 
  return (
    <a style={{padding:'5px'}}  onClick={navigatePage} className={className} href={href}>
      {children}
    </a>
  );
};
 
const mapStateToProps = state => {  
  return { loggedInAs: state.loggedInAs };
};
 
export default connect(mapStateToProps, {selectLoggedIn} )(Link)
