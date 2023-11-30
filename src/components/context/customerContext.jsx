import {useDispatch, useSelector} from "react-redux";
import {createContext, useContext, useEffect} from "react";
import {getAboutSubscription} from "../../actions/unlimitedSubscriptions/action.jsx";
import {getAboutLimitedSubscription} from "../../actions/limitedSubscriptions/action.jsx";
import useAuthContext from "./authContext.jsx";
import {getAmountWorkouts} from "../../actions/signUpPersonalWorkouts/action.jsx";

const CustomerContext = createContext({});

export const CustomerProvider = ({children}) => {
    const {user} = useAuthContext();

    const dispatch = useDispatch();

    // если авторизовался клиент - то получаем информацию о его абонементах
    const subscription =  useSelector(state => state.unlimitedSubscription.selectedSubscription);
    const subscriptionLimited = useSelector(state => state.limitedSubscription.selectedSubscription);
    const count = useSelector(state => state.signUpPersonalWorkouts.count);

    useEffect( () => {
        async function fetchData() {
            await dispatch(getAboutSubscription())  }
        fetchData();
    }, [dispatch, user])

    useEffect( () => {
        async function fetchData() {
            await dispatch(getAboutLimitedSubscription())  }
        fetchData();
    }, [dispatch, user])

    useEffect( () => {
        async function fetchData() {
            await dispatch(getAmountWorkouts())  }
        fetchData();
    }, [dispatch, user])


    return <CustomerContext.Provider value={{subscription, subscriptionLimited, count}}>
        {children}
    </CustomerContext.Provider>
}

export default function useCustomerContext(){
    return useContext(CustomerContext);
}