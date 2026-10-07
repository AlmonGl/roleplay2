import { useState } from 'react';
import './MessageBox.scss';

const MessageBox = ({
    message,
    buttonText,
    onButtonClick,
    className = ''
}) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClick = () => {
        if (isClosing) return; // защита от повторного клика
        setIsClosing(true);

        // Ждём завершения анимации затухания, потом вызываем колбэк
        setTimeout(() => {
            onButtonClick?.();
        }, 1000);
    };

    return (
        <div className='message-box'>
        <div className={`message-box ${isClosing ? 'message-box--closing' : ''} ${className}`}>
            <div className="message-box__border">
                <div className="message-box__corner message-box__corner--tl"></div>
                <div className="message-box__corner message-box__corner--tr"></div>
                <div className="message-box__corner message-box__corner--bl"></div>
                <div className="message-box__corner message-box__corner--br"></div>

                <div className="message-box__content">
                    <p className="message-box__text">{message}</p>

                    <button
                        className="message-box__button"
                        onClick={handleClick}
                        disabled={isClosing}
                    >
                        <span className="message-box__button-text">{buttonText}</span>
                        <div className="message-box__button-glow"></div>
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;