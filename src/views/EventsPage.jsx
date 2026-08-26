
import Header from '../components/Header.jsx';
import {useSelector} from 'react-redux';

import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import { selectCurrentUserLogin, selectCurrentUserId } from '../store/usersSlice.js';
import ChoicePage from './ChoicePage.jsx';
import InfoPage from './InfoPage.jsx';
import NavigateButtons from '../components/NavigateButtons.jsx';
import ItemUsageSelection from '../components/ItemUsageSelection.jsx';
import Idle from '../components/Idle.jsx';
import Task from '../components/Task.jsx';

function EventsPage() {
    const [player, setPlayer] = useState([]);
    
    const currentUserId = useSelector(selectCurrentUserId);
    
    const pageTitle = "Events";
    console.log('event page render');
    useEffect(() => {
            
           onSnapshot(doc(db, "players", currentUserId), (docSnap1) => {
           setPlayer({...docSnap1.data(), id: docSnap1.id });
           });    


   }, []); 
    
    
    
    return(
    <>
     <div className="container">

     <Header pageTitle={pageTitle} />

     {!player.id ? <p>Loading... </p>
     :
     
     player.status == "info" ?
     <InfoPage  player={player} /> 
     
     :   player.status == "dialog" ?
     <ChoicePage  player={player} /> 

     : player.status == "navigate" ?
     <NavigateButtons player={player} /> 

     : player.status == "item-use" ?
     <ItemUsageSelection player={player} /> 
     : player.status == "idle" ?
       <Idle /> 
     : player.status == "task" ?
       <Task player={player} /> 
     :
     <p>ERROR</p>
     }

     </div>
    </>
    ) 
  }
  


   export default EventsPage




 /*
 
 
 export default EventsPage
  

  const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleAddBook(e) {
        e.preventDefault();

        const newBook = {
            title: document.querySelector('input[name=title]').value,
            cover: document.querySelector('input[name=cover]').value,
            isRead: false,
            author: document.querySelector('input[name=author]').value,
            synopsis: document.querySelector('textarea[name=synopsis]').value
        }

        if (newBook.title && newBook.cover && newBook.author) {
            dispatch(addBook(newBook));
            alert('Book created successfully!');
            navigate("/");
        } else {
            alert('Please fill the mandatory fields.');
        }

    }
    
    const pageTitle = "Add Book";

    return (
      <>
        <div className="container">
            <Header pageTitle={pageTitle} />

            <form className="add-form">
                <div className="form-control">
                    <label>Title *</label>
                    <input type="text" name="title" placeholder="Add Book Title" />
                </div>
                <div className="form-control">
                    <label>Book Cover *</label>
                    <input type="text" name="cover" placeholder="Add Cover" />
                </div>

                <div className="form-control">
                <label>Author *</label>
                <input
                    type="text" name="author" placeholder="Add Author" />
                </div>

                <div className="form-control">
                <label>Synopsis</label>
                <textarea
                    type="text" name="synopsis" placeholder="Add a synopsis..." />
                </div>
                
                <button onClick={(e)=> handleAddBook(e)} className="btn btn-block">Save Book</button>
            </form>

        </div>

        
      </>
    ) */