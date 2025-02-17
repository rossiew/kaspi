import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import UserContext from "../context/user";
import CartContext from '../context/CartContext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import userService from '../services/user.service';

function Header() {
    const [clients, setClients] = useState(true);
    const [bussines, setBussines] = useState(true);
    const [gid, setGid] = useState(true);
    const { user, updateUser } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        setLoading(true);
        

        userService.logout()
            .then((res) => {
                if (res.status === 200) {
                    updateUser(null); 
                    setLoading(false);
                    navigate("/"); 
                }
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
      

    };

    return (
        <header className='header'>
            <div className='all_headers'>
                <div className='image'>
                    <Link to="/">
                        <img src='https://kaspi.kz/img/Logo.svg' alt='Kaspi Logo' />
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '50px', cursor: 'pointer' }} className="links text-gray-600">
                    <p to="/clients" onMouseEnter={() => setClients(false)}
                        onMouseLeave={() => setClients(true)}>Клиентам</p>

                    <p to="/buss" onMouseEnter={() => setBussines(false)}
                        onMouseLeave={() => setBussines(true)}>Бизнесу</p>

                    <p to="/gid" onMouseEnter={() => setGid(false)}
                        onMouseLeave={() => setGid(true)}>Kaspi Гид</p>
                </div>

             

                <div className="relative group">
                    <div className="text-red-500  cursor-pointer">
                        {user ? user.fullname : <AccountCircleOutlinedIcon />}
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2  mt-2 bg-white  top-11 text-black text-xl rounded-2xl p-7    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col space-y-2  ">
                            {!user ? (
                                <>
                                    <Link to="/login" className="logg">Войти</Link>
                                    <Link to="/register" className="regg">Зарегистрироваться</Link>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleLogout} className="logout">Выйти</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* этот код для dropdown */}
            {!clients && (
                <div className='cleen flex gap-24'
                    style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 1 }}>
                    <div className='xx flex-col flex gap-4'>
                        <Link to="/clients"><h1 className=' text-black font-semibold text-xl'>Продукты Kaspi.kz</h1></Link>
                        <Link to="/clients">Kaspi Gold</Link>
                        <Link to="/clients">Kaspi Gold для ребенка </Link>
                        <Link to="/clients">Kaspi Red</Link>

                    </div>
                    <div className='hhh flex flex-col gap-4'>
                        <Link to="/clients"><h1 className=' text-black font-semibold text-xl'>Сервисы Kaspi.kz</h1></Link>
                        <Link to="/clients">Магазин</Link>
                        <Link to="/clients">Travel</Link>
                        <Link to="/clients">Платежи</Link>
             
                    </div>
                </div>
            )}

            {/* этот код для dropdown */}
            {!bussines && (
                <div className='bussen flex gap-11'
                    style={{ position: 'absolute', top: '23%', left: '57%', transform: 'translate(-50%, -50%)', opacity: 1 }}>
                    <div className=' flex flex-col gap-2'>
                        <Link to="/buss">Kaspi Pay</Link>
                        <Link to="/buss">Бизнес Кредит</Link>
                        <Link to="/buss">Кредит для ИП</Link>
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <Link to="/buss">Продавать В Интернет-магазине на Kaspi.kz</Link>
                        <Link to="/buss">Принимать платежи с Kaspi.kz</Link>
                        <Link to="/buss">Kaspi Гид</Link>
                    </div>
                </div>
            )}

            {/* этот код для dropdown */}
            {!gid && (
                <div className='gaid flex flex-col gap-2'
                    style={{ position: 'absolute', top: '19%', left: '38%', transform: 'translate(-50%, -50%)', opacity: 1 }}>
                    <Link to="/gid">Клиентам</Link>
                    <Link to="/gid">Бизнесу</Link>
                </div>
            )}
        </header>
    );
}

export default Header;
