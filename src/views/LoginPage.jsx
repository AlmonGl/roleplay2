import FullPageLoader from '../components/FullPageLoader.jsx';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { setUserLogin, checkUser, setUserId } from '../store/usersSlice.js';
import { useDispatch } from 'react-redux';
import { db } from "../firebase/config.js";
function LoginPage() {
    
  //  const [isLoading, setIsLoading] = useState(true);
    
    const dispatch = useDispatch();
   
    const [loginAttempt, setLoginAttempt] = useState('');
    

    useEffect(() => {
        if (loginAttempt != '') { 
        const getIdbyLogin = async () => {
            const docRef = query(collection(db, "players"), where("login", "==", loginAttempt));
            const docSnap = await getDocs(docRef);
            
            dispatch(setUserLogin(loginAttempt));
            dispatch(setUserId(docSnap.docs[0].id));
        }
        getIdbyLogin();
    }
    }, [loginAttempt, dispatch])  

    async function handleLogIn(e) {
        
        e.preventDefault();

        const login = document.getElementById('id-field').value;

        try {
            const userExists = await checkUser(login);
            
            if (userExists) {
                setLoginAttempt(login);
                
            } else {
                alert("no such user");
            }
        } catch (error) {
            console.error("Error checking user:", error);
            alert("Произошла ошибка при проверке пользователя");
        }
    }

   
   


    return (
        <>
           

            <div className="container login-page">
                <section>
                    <h1>Welcome!</h1>
                    
                    <form className="add-form login">
                        <div className="form-control">
                            <label>Login</label>
                            <input  type="text" name="id" id = "id-field" placeholder="Enter your login" />
                        </div>
                                               
                            
                                <button onClick={(e) => handleLogIn(e)} className="active btn btn-block">Login</button>
                               
                        
                       



                    </form>
                </section>
            </div>
        </>
    )
}

export default LoginPage
