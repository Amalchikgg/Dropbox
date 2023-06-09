import Navbar from "./navbar/Navbar";
import './app.scss';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";
import Registration from "./authorization/Registration";

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, [])

  return (
      <div className="app">
        <Navbar/>
        <div className="wrap">
          {
            !isAuth ?
              <Routes>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
              :
              <Routes>
                <Route path="/" element={<Disk/>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          }
        </div>
      </div>
  );
}

export default App;
