import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/config.js";
import {useState, useEffect} from 'react';

function InfoPage ({player}) {

    const [text, setText] =useState("");
    
    
    console.log(12);
    
      useEffect(() => {
      
      onSnapshot(doc(db, "players",player.id),  (docSnap) => {

        fetchText(docSnap.data().textId.toString());
          
          
      });  
      }, []);
      
      const fetchText = async (id) => {
           
           
           const q = doc(db, "texts", id);
           const docSnap = await getDoc(q);
      

           setText(docSnap.data()); 
     
    }

    return(
        <>
            <h3>Мы кое-что хотим вам рассказать, {player.name}:</h3>

            {text ? <div className="text-toread">{text.content}</div> : <p>Loading....</p>}

            <h3>Запомнили?</h3>
        </>

    )
}

export default InfoPage