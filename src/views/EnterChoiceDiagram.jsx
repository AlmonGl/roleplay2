// EnterChoiceDiagram.jsx
import { useMemo } from 'react';
import './EnterChoiceDiagram.scss';

function EnterChoiceDiagram({ players, admin }) {
    // Преобразуем всех игроков: добавляем числовое значение и флаг наличия ответа
    const playersData = useMemo(() => {
        return players.map(p => {
            const num = Number(p.lastEnterAnswer);

            const hasAnswer =
                p.lastEnterAnswer !== '' &&
                p.lastEnterAnswer !== null &&
                p.lastEnterAnswer !== undefined &&
                !isNaN(num);

            return {
                ...p,
                lastEnterAnswerNum: hasAnswer ? num : 0,
                hasAnswer
            };
        });
    }, [players]);

    // Максимальное значение для масштабирования.
    // Учитываем также правильный ответ.
    const maxValue = useMemo(() => {
        const values = playersData
            .filter(p => p.hasAnswer)
            .map(p => p.lastEnterAnswerNum);

        if (
            admin.showRightAnswer &&
            admin.rightAnswer !== null &&
            admin.rightAnswer !== undefined &&
            !isNaN(Number(admin.rightAnswer))
        ) {
            values.push(Number(admin.rightAnswer));
        }

        return values.length > 0 ? Math.max(...values) : 0;
    }, [playersData, admin.rightAnswer, admin.showRightAnswer]);

    const chartHeight = 600;
    const chartWidth = 900;

    // Ширина столбиков
    const columnWidth =
        playersData.length > 0
            ? (chartWidth / playersData.length) * 0.6
            : 0;

    const columnGap =
        playersData.length > 0
            ? (chartWidth / playersData.length) * 0.4
            : 0;

    // Позиция правильного ответа в пикселях.
    //
    // Значение 0 должно находиться внизу графика,
    // а максимальное значение — вверху.
    const rightAnswerHeight =
        admin.showRightAnswer &&
            admin.rightAnswer !== null &&
            admin.rightAnswer !== undefined &&
            !isNaN(Number(admin.rightAnswer)) &&
            maxValue > 0
            ? chartHeight -
            (Number(admin.rightAnswer) / maxValue) * chartHeight
            : null;

    return (
        <div className="answer-diagram">
            <div
                className="diagram-container"
                style={{
                    width: '1000px',
                    height: '800px'
                }}
            >
                <div
                    className="diagram-chart"
                    style={{
                        width: `${chartWidth}px`,
                        height: `${chartHeight}px`,
                        position: 'relative'
                    }}
                >
                    {/* Горизонтальная линия правильного ответа */}
                    {rightAnswerHeight !== null && (
                        <div
                            className="diagram-right-line-horizontal"
                            style={{
                                top: `${rightAnswerHeight}px`
                            }}
                        >
                            <span className="diagram-right-label">
                                {admin.rightAnswer}
                            </span>
                        </div>
                    )}

                    {/* Столбики игроков */}
                    <div
                        className="diagram-columns"
                        style={{
                            height: `${chartHeight}px`
                        }}
                    >
                        {playersData.map((player, index) => {
                            // Высота столбика
                            const heightPx =
                                maxValue > 0
                                    ? (player.lastEnterAnswerNum / maxValue) *
                                    chartHeight
                                    : 0;

                            // Отклонение от правильного ответа
                            const deviation =
                                admin.showRightAnswer && player.hasAnswer
                                    ? (
                                        player.lastEnterAnswerNum -
                                        Number(admin.rightAnswer)
                                    ).toFixed(2)
                                    : null;

                            return (
                                <div
                                    key={player.id || index}
                                    className="diagram-column-wrapper"
                                    style={{
                                        width: `${columnWidth}px`,
                                        marginRight:
                                            index === playersData.length - 1
                                                ? '0'
                                                : `${columnGap}px`
                                    }}
                                >
                                    {/* Отклонение */}
                                    {deviation !== null && (
                                        <div className="diagram-deviation">
                                            {` Ответ: ${player.lastEnterAnswerNum}`}
                                            
                                        </div>
                                    )}

                                    {/* Столбик */}
                                    <div
                                        className="diagram-column"
                                        style={{
                                            height: `${heightPx}px`,
                                            backgroundColor:
                                                player.color || '#ccc'
                                        }}
                                    />

                                    {/* Подпись */}
                                    <div className="diagram-player-info">
                                        <span className="diagram-icon-unicode">
                                            {player.icon || '1'}
                                        </span>

                                        <span className="diagram-name">
                                            {player.name}
                                        </span>
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