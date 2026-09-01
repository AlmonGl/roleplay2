// EnterChoiceDiagram.jsx
import { useMemo } from 'react';
import './EnterChoiceDiagram.scss';

function EnterChoiceDiagram({ players, admin }) {
    // Преобразуем всех игроков: добавляем числовое значение и флаг наличия ответа
    const playersData = useMemo(() => {
        return players.map(p => {
            const num = Number(p.lastEnterAnswer);
            const hasAnswer = p.lastEnterAnswer !== '' && p.lastEnterAnswer !== null && p.lastEnterAnswer !== undefined && !isNaN(num);
            return {
                ...p,
                lastEnterAnswerNum: hasAnswer ? num : 0,
                hasAnswer
            };
        });
    }, [players]);

    // Максимальное значение для масштабирования (учитываем правильный ответ)
    const maxValue = useMemo(() => {
        const values = playersData.map(p => p.lastEnterAnswerNum);
        if (admin.showRightAnswer && admin.rightAnswer !== null && admin.rightAnswer !== undefined && !isNaN(Number(admin.rightAnswer))) {
            values.push(Number(admin.rightAnswer));
        }
        return values.length > 0 ? Math.max(...values) : 0;
    }, [playersData, admin.rightAnswer, admin.showRightAnswer]);

    // Высота области для столбиков
    const chartHeight = 600;
    const chartWidth = 900;

    // Ширина столбиков на основе всех игроков
    const columnWidth = playersData.length > 0 ? (chartWidth / playersData.length) * 0.6 : 0;
    const columnGap = playersData.length > 0 ? (chartWidth / playersData.length) * 0.4 : 0;

    // Высота, на которой находится правильный ответ (для горизонтальной линии)
    const rightAnswerHeight = maxValue > 0 ? (Number(admin.rightAnswer) / maxValue) * 100 : 0;
    console.log(maxValue);

    return (
        <div className="answer-diagram">
            <div className="diagram-container" style={{ width: '1000px', height: '800px' }}>
                <div className="diagram-chart" style={{ width: '900px', height: `${chartHeight}px` }}>
                    {/* Горизонтальная линия правильного ответа */}
                    {admin.showRightAnswer && (
                        <div
                            className="diagram-right-line-horizontal"
                            style={{ top: `${rightAnswerHeight}px` }}
                        >
                            <span className="diagram-right-label">{admin.rightAnswer}</span>
                        </div>
                    )}

                    {/* Столбики игроков */}
                    <div className="diagram-columns">
                        {playersData.map((player, index) => {
                            // Высота столбика пропорционально значению
                            const heightPercent = maxValue > 0 ? (player.lastEnterAnswerNum / maxValue) * 100 : 0;
                            const heightPx = (heightPercent / 100) * chartHeight;

                            // Отклонение от правильного ответа
                            const deviation = (admin.showRightAnswer && player.hasAnswer)
                                ? (player.lastEnterAnswerNum - Number(admin.rightAnswer)).toFixed(2)
                                : null;

                            return (
                                <div
                                    key={player.id || index}
                                    className="diagram-column-wrapper"
                                    style={{
                                        width: `${columnWidth}px`,
                                        marginRight: index === playersData.length - 1 ? '0' : `${columnGap}px`
                                    }}
                                >
                                    {/* Отклонение */}
                                    {deviation !== null && (
                                        <div className="diagram-deviation">
                                            {deviation > 0 ? `+${deviation}` : deviation}
                                        </div>
                                    )}

                                    {/* Столбик */}
                                    <div
                                        className="diagram-column"
                                        style={{
                                            height: `${heightPx}px`,
                                            backgroundColor: player.color || '#ccc'
                                        }}
                                    />

                                    {/* Подпись: юникод-иконка + имя */}
                                    <div className="diagram-player-info">
                                        <span className="diagram-icon-unicode">{player.icon || '1'}</span>
                                        <span className="diagram-name">{player.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnterChoiceDiagram;