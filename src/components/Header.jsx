import { NavLink } from "react-router-dom";

import { auth } from "../firebase/config.js";
import { logOut, checkAdmin, selectCurrentUserLogin } from '../store/usersSlice.js';
import { useDispatch, useSelector} from 'react-redux';
import { use } from "react";


function Header({ pageTitle }) {

   const userLogin = useSelector(selectCurrentUserLogin);
   const userAdmin = checkAdmin(userLogin);
   const dispatch = useDispatch();
    
    function handleLogout() {

        if (confirm("Выйти?")) {
            dispatch(logOut());
           
        }
        
        
    }
    return (
      <>
            <br></br>
            <br></br>
            <h1>{pageTitle}</h1>
            <div>
                
                
            </div>
            <div className="buttons-container">

                    <NavLink to="/">
                      <button className="btn">
                          Stats
                      </button>
                    </NavLink>

                {userAdmin ?
                    <NavLink to="/global">
                        <button className="btn">
                            Global
                        </button>
                    </NavLink>
                    :
                    <NavLink to="/events">
                        <button className="btn">
                            Events
                        </button>
                    </NavLink>
                }
                <button onClick={() => handleLogout()} className="btn transparent">
                      Logout
                    </button>


            </div>
           
    
      </>
    )
  }
  
  export default Header

