// context-қандай данный болатынын провайдерде/Provider жазамыз 



import { useState, useEffect } from "react";

import userService  from "../services/user.service";
import UserContext from "./user";


function UserProvider({ children }) {
    const [user, setUser] = useState(null);


    useEffect(() => {
        updateUser()
    }, [])



    function updateUser() {
        userService
            .getUser()
            .then((response) => response.data)
            .then((data) => {
                setUser(data)
            })
            .catch((err) => setUser(null))
    }



    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}


export default UserProvider;