import "./Photo.scss";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux

const Photo = () => {
    return (
        <div>
            <h1>Photo</h1>
        </div>
    );
};

export default Photo;
