import { doc, updateDoc, getDoc, setDoc, getDocs, query, collection, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config.js";
import './ItemUsageSelection.css';
import { useState } from 'react';

import { ItemsList } from '../data/ItemsList.js';



const ItemUsageSelection = ({ player }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTargets, setShowTargets] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [message, setMessage] = useState('');
    const [mockTargets, setMockTargets] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
 
    // Определяем, требует ли предмет выбора цели
    const needsTarget = (id) => {
        return ItemsList[id].target == 'needed';
    };

    // Моковые цели (в реальном приложении брать из игры)

    const setTargets = async () => {
        let playerList = [];
        const q = query(collection(db, "players"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((it) => {

            if (it.data().login != "558899" && it.data().active) {
                playerList.push({ id: it.id, ...it.data() })
            }

        });
        setMockTargets(playerList);

    }
    setTargets();

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setSelectedTarget(null);
        setMessage('');

        //const itemType = getItemType(item);
        setShowTargets(needsTarget(item.id));
    };

    const handleTargetSelect = (target) => {
        setSelectedTarget(target);
        setMessage(`Выбрана цель: ${target.name}`);
    };

    const handleUseItem = () => {
        if (!selectedItem) {
            setMessage('Выберите предмет для использования');
            return;
        }

        //const itemType = getItemType(selectedItem);

        if (needsTarget(selectedItem.id) && !selectedTarget) {
            setMessage('Выберите цель для использования предмета');
            return;
        }

        // Здесь будет логика использования предмета
        setMessage(
            `Предмет "${selectedItem.icon} ${selectedItem.name}" использован${selectedTarget ? ` на цель ${selectedTarget.name}` : ''
            }!`
            
        );
       
        updateDoc(doc(db, "players", player.id), {
            currentAction: `Предмет "${selectedItem.icon} ${selectedItem.name}" использован${selectedTarget ? ` на цель ${selectedTarget.name}` : ''}!`, 
            currentActionBonus: selectedItem.id

        });
        
        if (selectedItem.type == "consumable") {
            updateDoc(doc(db, "players", player.id), { items: arrayRemove(ItemsList[selectedItem.id]) });
        }
        
        // Сброс выбора
        setTimeout(() => {
            setSelectedItem(null);
            setShowTargets(false);
            setSelectedTarget(null);
            setMessage('');
            setIsOpen(false);
        }, 2000);
    };

    return (

        <div className="item-usage-container">
            <div className="item-usage-header">
                <h2
                    className="item-usage-title confirm-use-button"
                    onClick={() => {setIsOpen(!isOpen) } }
                >🗡️ Инвентарь</h2>
                
            </div>
            {isOpen && player.currentActionBonus == -1 ?
            
            
               
                    <div>
                        <p className="item-usage-subtitle">Выберите предмет для использования. Только один за раунд!</p>
                        <div className="items-vertical-list">
                            {player.items && player.items.length > 0 ? (
                                player.items.map((item, index) => {

                                    const isSelected = selectedItem?.id === item.id;

                                    return (
                                        <div
                                            key={item.id || index}
                                            className={`item-row ${isSelected ? 'item-row-selected' : ''}`}
                                            onClick={() => handleItemClick(item)}
                                        >
                                            <div className="item-row-icon">
                                                <span className="item-type-icon">{item.icon || '📦'}</span>
                                            </div>
                                            <div className="item-row-content">
                                                <div className="item-row-name">{item.name}</div>
                                                {item.description && (
                                                    <div className="item-row-description">{item.description}</div>
                                                )}

                                            </div>

                                        </div>
                                    );
                                })
                            ) : (
                                <div>
                                    <div className="items-empty">
                                        <span className="items-empty-icon">🎒</span>
                                        <p>Инвентарь пуст</p>
                                    </div>

                                </div>
                            )}
                        </div>

                        {showTargets && selectedItem && (
                            <div className="targets-section">
                                <h3 className="targets-title">
                                    Выберите цель для: {selectedItem.icon} {selectedItem.name}
                                </h3>
                                <div className="targets-list">
                                    {mockTargets.map(target => (
                                        <div
                                            key={target.id}
                                            className={`target-row ${selectedTarget?.id === target.id ? 'target-row-selected' : ''}`}
                                            onClick={() => handleTargetSelect(target)}
                                        >
                                            <span className="target-icon">{target.icon}</span>
                                            <span className="target-name">{target.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="item-message">
                                {message}
                            </div>
                        )}

                        <button
                            className="confirm-use-button"
                            onClick={handleUseItem}
                            disabled={!selectedItem}
                        >
                            Подтвердить использование
                        </button>
                    </div>
                : isOpen ? <div> В этот раунд уже использован.</div>
                : <p></p>
            }
        </div>
    );
};

export default ItemUsageSelection




                    /*<button
                                    className="item-use-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemClick(item);
                                    }}
                                >
                                    Использовать
                                </button>*/ 