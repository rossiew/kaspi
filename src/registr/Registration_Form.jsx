//Регистрация: 

// Пост сұраныс келеді, одан кейін эмейл мен пассуорд
//  параметрлері тексеріледі, и controller. register функциясы орындалады

// Контролер 
// Юзер туралы мәлімет алады
// Оның бар жоғын тексереді, паролды хэшироват етеді, базаға 
// тіркейді, сәтті болса юзерді тіркейді

import React, { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import userService from '../services/user.service';
import UserContext from '../context/user';

function RegistrationForm() {
    const { updateUser } = useContext(UserContext);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        fullname: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);
        userService.register(credentials)
            .then((res) => res.status)
            .then((status) => {
                if (status === 200) {
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
            });
    };

    return (
        <form onSubmit={submitForm} className=' form-registr flex text-center justify-center'>


            <div>
                <h1 className=' font-sans text-2xl text-center'>Зарегистрироваться</h1>
                <br />

                {error && (
                    <div className='err'>
                        {error}. Пожалуйста проверьте снова!
                    </div>
                )}

                <input
                    type="text"
                    id="fullName"
                    className='emails-register'
                    placeholder="Имя"
                    disabled={loading}
                    value={credentials.fullname}
                    autoComplete="off"
                    onChange={(e) => setCredentials({ ...credentials, fullname: e.target.value })}
                />
                <br />

                <br />

                <div className=' text-xs  mr-40'>

                    {credentials.email.trim() === '' ? (
                        <p>Введите корректный e-mail.</p>
                    ) : (
                        <p>✔️</p>
                    )}
                </div>

                <input
                    type="email"
                    className='emails-register'
                    placeholder="Email"
                    name="email"
                    disabled={loading}
                    value={credentials.email}
                    autoComplete="off"
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />

                <br />

                <br />

                <div className=' text-xs   mr-20'>

                    {credentials.password.trim().length <= 8 ? (
                        <p>Пароль должен быть длиннее 8 символов.</p>
                    ) : (
                        <p>✔️</p>
                    )}
                </div>


                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Пароль"
                    className='emails-register'
                    name="password"
                    disabled={loading}
                    autoComplete="off"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />

                <br /> <div className='text-xs  mr-56 m-1'>
                    <label>

                        <input
                            type="checkbox"
                            checked={passwordVisible}
                            onChange={() => setPasswordVisible(!passwordVisible)}
                        />
                        Показать пароль
                    </label>
                </div>
                <br />


                <div className='btn-registr flex   gap-7'>
                    <button className="btn-5  w-44" type="submit" disabled={loading}>
                        Зарегистрироваться
                    </button>

                    <div>
                        <button className='btn-6'>

                            <Link to="/login">Войти</Link>
                        </button>
                        <p className=' text-xs mr-16 text-slate-400 '>Уже есть аккаунт?</p>

                    </div>
                </div>
            </div>
        </form>
    );
}

export default RegistrationForm;
