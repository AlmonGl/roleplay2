
import Header from '../components/Header.jsx';
import {useSelector} from 'react-redux';

import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import {  selectCurrentUserId } from '../store/usersSlice.js';
import PlayerStatsFullTable from '../components/PlayerStatsFullTable.jsx';
import PlayerCard from '../components/PlayerCard.jsx';
function BooksPage() {

    const [player, setPlayer] = useState([]);
    
    const currentUserId = useSelector(selectCurrentUserId);
   
    const pageTitle = `Привет, ${player.name}`;

    useEffect(() => {
            
           onSnapshot(doc(db, "players", currentUserId), (docSnap1) => {
           setPlayer({...docSnap1.data(), id: docSnap1.id });
           });    

   }, []);

    
 
    
    

    
    return (
      <>
        <div className="container">
            <Header pageTitle={pageTitle} />

                <PlayerCard player={player} />
            
           
             {/*player.id ? <PlayerStatsFullTable player = {player} /> : <p>Loading... </p> */}
          

        </div>
         </>
    )
  }
  
  export default BooksPage

