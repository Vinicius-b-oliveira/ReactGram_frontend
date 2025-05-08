import "./InfoCard.scss";

import { BsXLg } from "react-icons/bs";

const InfoCard = ({ message, closeInfoCard }) => {
    return (
        <>
            <div className="overlay"></div>

            <div className="info_card_container">
                <div className="info_card">
                    <h1>Aviso</h1>

                    <p>{message}</p>

                    <BsXLg className="close_icon" onClick={closeInfoCard} />
                </div>
            </div>
        </>
    );
};

export default InfoCard;
