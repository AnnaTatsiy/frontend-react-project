import {Route, Routes} from "react-router-dom";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import AuthLayouts from "./components/layouts/authLayouts.jsx";
import GuestLayouts from "./components/layouts/guestLayouts.jsx";
import Schedule from "./components/schedule/schedule.jsx";
import ForCustomers from "./components/controlledTabs/forCustomers.jsx";
import ForCoaches from "./components/controlledTabs/forCoaches.jsx";
import ForWorkouts from "./components/controlledTabs/forWorkouts.jsx";
import GroupWorkoutDetails from "./components/groupWorkouts/groupWorkoutDetails.jsx";
import GroupWorkoutBySchedule from "./components/groupWorkouts/groupWorkoutBySchedule.jsx";
import AvailableWorkoutsList from "./components/groupWorkouts/availableWorkoutsList.jsx";
import Settings from "./components/settings.jsx";
import SignUpPersonalWorkoutsByCoach from "./components/signUpPersonalWorkouts/signUpPersonalWorkoutsByCoach.jsx";
import {useEffect} from "react";
import {getAllCoaches} from "./actions/coaches/action.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllCustomers} from "./actions/customers/action.jsx";
import PersonalScheduleForEdit from "./components/personalSchedule/personalScheduleForEdit.jsx";
import SignUpPersonalAvailableWorkoutsList
    from "./components/signUpPersonalWorkouts/signUpPersonalAvailableWorkoutsList.jsx";
import Notifications from "./components/notifications/notifications.jsx";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCoaches())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])

    //все тренеры
    const coaches = useSelector(state => state.coaches.dataList);
    //все клиенты
    const customers = useSelector(state => state.customers.dataList);

    return (
        <Routes>
            <Route element={<AuthLayouts/>}>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/notifications"} element={<Notifications/>}/>

                <Route path={"/schedule"} element={<Schedule coaches={coaches}/>}/>
                <Route path={"/customers"} element={<ForCustomers dataListCustomers={customers} dataListCoaches={coaches} dispatch={dispatch}/>}/>
                <Route path={"/coaches"} element={<ForCoaches dataList={coaches} dispatch={dispatch}/>}/>
                <Route path={"/group-workouts"} element={<ForWorkouts dataListCustomers={customers} dataListCoaches={coaches}/>}/>
                <Route path={"/group-workouts/selected-by-id"} element={<GroupWorkoutDetails/>}/>
                <Route path={"/group-workouts/select-workouts-by-schedule"} element={<GroupWorkoutBySchedule/>}/>
                <Route path={"/settings"} element={<Settings/>}></Route>

                <Route path={"/personal-workouts/select-workouts-by-coach"} element={<SignUpPersonalWorkoutsByCoach/>}/>

                <Route path={"/get-available-workouts"} element={<AvailableWorkoutsList/>}/>

                <Route path={"/get-schedule-edit"} element={<PersonalScheduleForEdit/>}/>
                <Route path={"/get-available-personal-workouts"} element={<SignUpPersonalAvailableWorkoutsList/>}/>

            </Route>
            <Route element={<GuestLayouts/>}>
                <Route path={"/login"} element={<Login/>}/>
            </Route>
        </Routes>
    )
}

export default App
