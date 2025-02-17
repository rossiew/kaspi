// Логаут: 
// Пост сұранысын қабылдайды,  и котроллер логаут функциясы орындалады

// Ол аутентификацияны жояды
// Сессияларды жояды 
// Қате болса шығарып береді, ал жоқ болса сәтті шығып кеткені туралы хабарлама келеді


import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/user';
import userService from '../services/user.service';

function LogoutForm() {
    const { updateUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
    }

    return (
        <form onSubmit={handleLogout}>

            {error && (
                <div className='err'>
                    {error}. Please try again!
                </div>
            )}

            <button type="submit" disabled={loading}>
                Logout
            </button>
        </form>
    );
}

export default LogoutForm;
