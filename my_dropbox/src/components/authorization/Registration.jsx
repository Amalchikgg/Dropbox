import React, {useState, useEffect} from 'react';
import './authorization.scss'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../../actions/user';

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Sign In</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <Link to='/'><button className="authorization__btn" onClick={() => registration(email, password)}>Sign In</button></Link>
        </div>
    );
};

export default Registration;
