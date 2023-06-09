import React from 'react';
import './navbar.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__header">DROPBOX</div>
                {!isAuth && <div className="navbar__login"><Link to="/login">Login</Link></div> }
                {!isAuth && <div className="navbar__registration"><Link to="/registration">Sign In</Link></div> }
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout()) }>Logout</div> }
            </div>
        </div>
    );
};

export default Navbar;
