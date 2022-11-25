import React from "react";
import success from '../../images/success.png';
import error from '../../images/error.png';

function InfoTooltip({ onClose, status: { isOpen, successful } }){

    React.useEffect(() => {
        if (!isOpen) return;
        const handleEscapeClose = (evt) => {
          if (evt.key === 'Escape') {
            onClose()
          };
        };
        document.addEventListener('keyup', handleEscapeClose);
        return () => {
          document.removeEventListener('keyup', handleEscapeClose);
        };
      }, [isOpen, onClose])
    

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__check">
                <button className="popup__close-button" onClick={onClose} />
                <img alt="Успешно" className="popup__check-img" src={
                   successful
                    ? success
                    : error}
                />
                <h2 className="popup__check_text">{
                    successful
                    ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    );
  }
  
  export default InfoTooltip;