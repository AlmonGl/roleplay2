import { useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc, arrayUnion,  arrayRemove, setDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { ItemsList } from "../data/ItemsList.js"

const ActionSelector = ({ players }) => {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [coordX, setCoordX] = useState('');
    const [coordY, setCoordY] = useState('');
    const [itemId, setItemId] = useState('');
    const actions = [
        { id: 0, name: "frog" },
        { id: 1, name: "sheep" },
        { id: 2, name: "teleport" },
        { id: 3, name: "removeItem" },
        { id: 4, name: "addItem" },
        { id: 5, name: "removeNeutral" }
    ]
    const handleRemoveToken = async (mapId, x, y) => {
        const mapSnap2 = await getDoc(doc(db, "maps", mapId.toString()));
        const mapData = mapSnap2.data();
        const map3 = [];
        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 6; j++) {
                row.push({
                    type: mapData[i][j].type,

                    treasure: mapData[i][j].treasure,
                    exit: mapData[i][j].exit,
                    monster: mapData[i][j].monster,
                    
                    player: null,
                    players: mapData[i][j].players

                });
            }


            map3.push(row);

        }
        map3[x][y].treasure = -1;
        map3[x][y].monster = -1;
        console.log(map3);
        setDoc(doc(db, "maps", mapId.toString()), { ...map3 });

        
    }

    const handleSubmit = () => {

        switch (selectedAction) {
            case '0':
                updateDoc(doc(db, "players", selectedPlayer), { icon: "🐸" });
                break;
            case '1':
                updateDoc(doc(db, "players", selectedPlayer), { icon: "🐑"   });
                break;
            case '2':
                updateDoc(doc(db, "players", selectedPlayer), { row: coordX, col: coordY,});
                break;
            case '3':
                updateDoc(doc(db, "players", selectedPlayer), { items: arrayRemove(ItemsList[itemId]) });
                break;
            case '4':
                updateDoc(doc(db, "players", selectedPlayer), { items: arrayUnion(ItemsList[itemId]) });
                break;
            case '5':

                handleRemoveToken(itemId, coordX, coordY);
                
                break;
            default:
                console.log("Неизвестный фрукт.");
        }

        console.log({
            player: selectedPlayer,
            action: selectedAction,
            x: coordX,
            y: coordY
        });
        // Здесь будет логика выполнения действия
    };
    



    return (
        <div className = "fl">
            <select
                className = "select-actions2"
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
            >
                <option value="">Выберите игрока</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                        {player.name}
                    </option>
                ))}
            </select>

            <select
                className="select-actions2"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
            >
                <option value="">Выберите действие</option>
                {actions.map(action => (
                    <option key={action.id} value={action.id}>
                        {action.name}
                    </option>
                ))}
            </select>

            <select
                className="select-actions2"
                value={coordX}
                onChange={(e) => setCoordX(e.target.value)}
            >
                <option value="">X</option>
                {[0, 1, 2, 3, 4, 5].map(x => (
                    <option key={x} value={x}>{x}</option>
                ))}
            </select>

            <select
                className="select-actions2"
                value={coordY}
                onChange={(e) => setCoordY(e.target.value)}
            >
                <option value="">Y</option>
                {[0, 1, 2, 3, 4, 5].map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </select>

            <select
                className="select-actions2"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
            >
                <option value="">Item</option>
                {ItemsList.map(y => (
                    <option key={y.id} value={y.id}>{y.id} {y.name}</option>
                ))}
            </select>

            <button className = "btn" onClick={handleSubmit}>
                Выполнить действие
            </button>
        </div>
    );
};

export default ActionSelector