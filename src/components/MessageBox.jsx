
import './MessageBox.scss';

const MessageBox = ({
    message,
    buttonText,
    onButtonClick,
    className = ''
}) => {
    return (
        <div className='message-box'>
        <div className={`message-box ${className}`}>
            <div className="message-box__border">
                <div className="message-box__corner message-box__corner--tl"></div>
                <div className="message-box__corner message-box__corner--tr"></div>
                <div className="message-box__corner message-box__corner--bl"></div>
                <div className="message-box__corner message-box__corner--br"></div>

                <div className="message-box__content">
                    <p className="message-box__text">{message}</p>

                    <button
                        className="message-box__button"
                        onClick={onButtonClick}
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