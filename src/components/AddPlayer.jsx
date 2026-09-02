import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase/config.js";
import { PlayerTokenIcons } from "../data/ItemsList.js"

function AddPlayerForm() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      // Ссылка на новый документ с автоматически сгенерированным ID
      
        
      // Создаём документ сразу с данными
        await setDoc(doc(db, "players", Math.random().toString(36).substring(2, 12)), {
            name: name.trim(),
            group: group.trim(),
            login: Math.random().toString(36).substring(3, 7),
            icon: PlayerTokenIcons[Math.floor(Math.random() * PlayerTokenIcons.length)],
            color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
            currentAction: '',
            currentActionBonus: -1,
            currentMap: 1,
            description: "На этой вкладке отображаются твои характеристики и найденные предметы.Используй панель сверху, чтобы переключится на вкладку событий.",
            items: [],
            movePoints: 2,
            status: 'idle',
            score: 10,
            row: 1,
            col: 1,
            x: 1,
            y: 1,
            HP: 20
        });
      alert('Игрок добавлен!');
      setName('');
      setGroup('');
      setShowForm(false);
    } catch (error) {
      console.error('Ошибка добавления игрока:', error);
      alert('Не удалось добавить игрока');
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Закрыть' : 'Добавить игрока'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
          <div>
            <label htmlFor="name">Имя:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="group">Группа:</label>
            <input
              id="group"
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
           </div>
            
          <button type="submit">Сохранить</button>
        </form>
      )}
    </div>
  );
}

export default AddPlayerForm;