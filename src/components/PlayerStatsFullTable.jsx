import {useState, useEffect} from 'react';
import './PlayerStatsFullTable.css';
import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/config.js";

function PlayerStatsFullTable({player})
{

    const [fetchStatus, setFetchStatus] = useState("idle");
    const [stats, setStats] = useState("");
    
    const fetchStats = async (id) => {
           
        
      const q = query(collection(db, "stats"), where("player_id", "==", id));
           
      const docSnap = await getDocs(q);
          
         setStats(docSnap.docs[0].data());

      onSnapshot(doc(db, "stats", docSnap.docs[0].id), (dS) => {
           setStats(dS.data());
           });    
      setFetchStatus("success");
      
    } 
  
  
  useEffect(()=>{
    if(fetchStatus == "idle"){
      fetchStats(player.id);
     
    }

  }, []);
  
return (
    <>

  <div className="gurps-card"> 
    <div className="gurps-header">
      <div className="gurps-title">⚡ GURPS · Навыки</div>
      <div className="gurps-subtitle">Современный мир</div>
    </div>


    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Характеристика</th>
            
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>

        <tr><td><span className="skill-attr">Ловкость</span></td><td><span className="skill-diff">{stats.dexterity}</span></td></tr>
         <tr><td><span className="skill-attr">Сила</span></td><td><span className="skill-diff">{stats.strenght}</span></td></tr>
        </tbody>
      </table>
    </div>

    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Навык</th>
            <th>Атрибут / Сложность</th>
            <th>База</th>
          </tr>
        </thead>
        <tbody>
          
          
          <tr><td>Стрельба (пистолет)</td><td><span className="skill-attr">DX</span><span className="skill-diff">Средний</span></td><td>DX-0</td></tr>
          <tr><td>Рукопашный бой</td><td><span className="skill-attr">DX</span><span className="skill-diff">Средний</span></td><td>DX-0</td></tr>
          <tr><td>Скрытность</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Наблюдательность</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Обыск</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Первая помощь</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Дипломатия</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Трудный</span></td><td>IQ-2</td></tr>
          <tr><td>Запугивание</td><td><span className="skill-attr">Will</span><span className="skill-diff">Средний</span></td><td>Will-0</td></tr>
          <tr><td>Уличное чутьё</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Взлом (механический)</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Электроника (ремонт)</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Компьютеры (взлом)</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Трудный</span></td><td>IQ-2</td></tr>
          <tr><td>Выживание (город)</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Слежка</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Маскировка</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Вождение (мотоцикл)</td><td><span className="skill-attr">DX</span><span className="skill-diff">Средний</span></td><td>DX-0</td></tr>
          <tr><td>Лазание</td><td><span className="skill-attr">DX</span><span className="skill-diff">Средний</span></td><td>DX-0</td></tr>
          <tr><td>Плавание</td><td><span className="skill-attr">HT</span><span className="skill-diff">Лёгкий</span></td><td>HT+0</td></tr>
          <tr><td>Акробатика</td><td><span className="skill-attr">DX</span><span className="skill-diff">Трудный</span></td><td>DX-2</td></tr>
          <tr><td>Метание</td><td><span className="skill-attr">DX</span><span className="skill-diff">Средний</span></td><td>DX-0</td></tr>
          <tr><td>Тяжёлое оружие (пулемёт)</td><td><span className="skill-attr">DX</span><span className="skill-diff">Средний</span></td><td>DX-0</td></tr>
          <tr><td>Тактика</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Трудный</span></td><td>IQ-2</td></tr>
          <tr><td>Лидерство</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Торговля</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Администрирование</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Криминалистика</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Трудный</span></td><td>IQ-2</td></tr>
          <tr><td>Психология (прикладная)</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Трудный</span></td><td>IQ-2</td></tr>
          <tr><td>Фотография</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Средний</span></td><td>IQ-0</td></tr>
          <tr><td>Знание (текущие события)</td><td><span className="skill-attr">IQ</span><span className="skill-diff">Лёгкий</span></td><td>IQ+0</td></tr>
        </tbody>
      </table>
    </div>

    <div className="footer-note">
      <span>🎲 3d6 · бросок мастерства</span>
      <span>📖 GURPS Basic Set</span>
      <span>⚙️ Реалистичная кампания</span>
    </div>
  </div>
</>
)
}

export default PlayerStatsFullTable



       