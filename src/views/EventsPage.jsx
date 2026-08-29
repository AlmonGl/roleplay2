
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
    
   // const pageTitle = "Events";
    console.log('event page render');
    useEffect(() => {
            
           onSnapshot(doc(db, "players", currentUserId), (docSnap1) => {
           setPlayer({...docSnap1.data(), id: docSnap1.id });
           });    


   }, []); 
    
    
    
    return(
    <>
     <div className="container">

     <Header pageTitle={''} />

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
       <Idle player={player}/> 
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

