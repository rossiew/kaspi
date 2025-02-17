// Логин: 

// Пост сұранысын қабылдайды, и passport. authentic (local)  функциясын
//  қолдана отырып, юзердің кіруін орындайды. 

// Аутент: 
// Эмейл арқылы іздейді
// Юзер мен паролды тексеріп, сәтті болса тіркейді. 

// Ал контроллер аутентификацияның сәтті болғаны туралы ақпарат жібереді.


import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from '../api/axios.config';
import userService from '../services/user.service';
import UserContext from '../context/user';
import "../App.css"
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();




  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    userService.login(credentials)
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) {
          updateUser();
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.message);
        setCredentials({
          email: "",
          password: "",
          fullname: ""
        });
        setLoading(false);
      })

  }





  return (
    <form className='form-login' onSubmit={submitForm}>


      {
        error && (
          <div className='err'>
            {error}. Пожалуйста проверьте снова!
          </div>
        )
      }


      <h1 className=' font-sans text-2xl text-center'>Войти</h1>
      <br />

      <div className='emails '>
        <input
          type="email"
          value={credentials.email}
          autoComplete={false}
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
          placeholder="Email"
        />
      </div>
      <br />

      <div className='emails'>
        <input
          type="password"
          id="password"
          value={credentials.password}
          autoComplete={false}
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
          placeholder="Пароль"
        />
      </div>
      <br /><br />

      <div className='btns flex   gap-10'>
        <button className="btn-5" type="submit">
          Войти
        </button>

        <div>


          <button className='btn-6  w-44'>
            <Link to="/register">Зарегистрироваться</Link>
          </button>
          <p className=' text-xs mr-20 text-slate-400'>Впервые тут?</p>
        </div>
      </div>

    </form>
  );
};

export default LoginForm;
