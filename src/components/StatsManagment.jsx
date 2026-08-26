
import { db } from "../firebase/config.js";
import PlayerStatsBlock from './PlayerStatsBlock.jsx';
import { useState, useEffect } from 'react';
import { collection,  onSnapshot} from "firebase/firestore";



function StatsManagment({ players }) {
    
        
    
        
    
    return (
      <>
           
            <h1>Stats:</h1>
           <div className="stats-container">
                    <div className="player-list">

                    {players.map(player =>

                        <PlayerStatsBlock key={player.id} player={player} />

                        )}

                    </div>
                </div>
           
    
      </>
    )
  }
  
  export default StatsManagment