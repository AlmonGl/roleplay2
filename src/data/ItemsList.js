////Обращение по ID номеру из ItemUsageSelection and ChoicePage

export const ItemsList = [
    { id: 0, name: 'Лук', icon: '🏹', description: 'Наносит 1 урон другому игроку или монстру', type: 'regular', target: "needed" },
    { id: 1, name: 'Кинжал', icon: '🗡', description: 'Наносит 1 урон другому игроку', type: 'regular', target: "needed" },
    { id: 2, name: 'Щит', icon: '🛡️', description: 'Защищает от всех атак монстра и игроков на один ход при использовании. Одно использование.', type: 'consumable', target: "yourself" },
    { id: 3, name: 'Зелье здоровья', icon: '🧪', description: 'Восстанавливает 7 HP любому игроку при использовании. Один заряд. ', type: 'consumable', target: "needed" },
    { id: 4, name: 'Свиток молнии', icon: '⚡', description: 'Наносит 3 урона монстру и всем игрокам другой команды. Один заряд.', type: 'consumable', target: "none" },
    { id: 5, name: 'Огненный шар', icon: '🔥', description: 'Наносит 5 урона выбранному игроку. Один заряд.', type: 'consumable', target: "needed" },
    { id: 6, name: 'Кольцо регенерации', icon: '💍', description: 'Восстанавливает 2 HP твоему персонажу при использовании.', type: 'regular' },
    { id: 7, name: 'Гриб', icon: '🍄', description: 'Дает подсказку при ответе на следующий вопрос. Один заряд.', type: 'consumable', target: "none" },
    { id: 8, name: 'Меч', icon: '🗡️', description: 'Позволяет атаковать игроков в соседней клетке в конце хода.', type: 'regular', target: "needed" },
    { id: 9, name: 'Ледяная стрела', icon: '🌊', description: 'Снижает сложность следующей атаки. Один заряд.', type: 'consumable', target: "monster" },
    { id: 10, name: 'Паутина', icon: '🕸️', description: 'Снижает урон от следующей атаки монстра до 0. Один заряд.', type: 'consumable', target: "monster" },
    { id: 11, name: 'Призрак', icon: '👻', description: 'Отмечает один неправильный вариант ответа', type: 'regular', target: "none" },
    { id: 12, name: 'Кубик', icon: '🎲', description: 'Отмечает три неправильных варианта ответа. Один заряд.', type: 'consumable', target: "none" },
];

//от атак игроков - каждый ход



export const PlayerTokenIcons = [
    "🐶", "🐱", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🗡️",
    "🐸", '🛡️', "🐧", "🐦", "🦄", "🐴", "🐢", "🐍", "🦖",
    "🦕", "🐳", "🐬", "🐟", "🐠", "🐡", "🦈", "🐙", "🦀", "🦞",
    "🦐", "🦑", "🦋", "🐌", "🐛", "🐜", "🐝", "🐞", "🦗", "🕷️",
    "🦂", "🦟", "🦠", "🌵", "🌲", "🌳", "🌴", "🍀", "🌹", "🥀"
];