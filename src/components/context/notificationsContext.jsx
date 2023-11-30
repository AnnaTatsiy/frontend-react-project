import {createContext, useContext, useEffect, useState} from "react";
import api from "../../api/axios.js";

const NotificationsContext = createContext({});

export const NotificationsProvider = ({children}) => {

    const [countNotifications, setCountNotifications] = useState(0);

    const getCount = () => {
      api.get("http://127.0.0.1:8000/api/get-count-unread-notification")
            .then((response) => {
                if (response.status === 200) {
                    setCountNotifications(response.data.count);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {
        getCount();

        const timer = setInterval(() => {
            getCount();
        }, 60000);

        // очистка интервала
        return () => clearInterval(timer);
    }, []);


    return <NotificationsContext.Provider value={{countNotifications}}>
        {children}
    </NotificationsContext.Provider>
}

export default function useNotificationsContext(){
    return useContext(NotificationsContext);
}