import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./components/context/authContext.jsx";
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import './assets/lib/bootstrap/css/bootstrap.min.css';
import './assets/lib/bootstrap/js/bootstrap.bundle.min.js';

import scheduleReducer from "./reducers/schedules/scheduleReducer";
import customersReducer from "./reducers/customers/customerReducer";
import coachesReducer from "./reducers/coaches/coachesReducer"
import limitedPriceListReducer from "./reducers/limitedPriceLists/limitedPriceListReducer";
import unlimitedSubscriptionReducer from "./reducers/unlimitedSubscriptions/unlimitedSubscriptionReducer";
import limitedSubscriptionReducer from "./reducers/limitedSubscriptions/limitedSubscriptionReducer";
import groupWorkoutReducer from "./reducers/groupWorkouts/groupWorkoutReducer";
import signUpGroupWorkoutsReducer from "./reducers/signUpGroupWorkouts/signUpGroupWorkoutReducer";
import gymReducer from "./reducers/gyms/gymReducer";
import workoutTypeReducer from "./reducers/workoutTypes/workoutTypeReducer";
import signUpPersonalWorkoutReducer from "./reducers/signUpPersonalWorkouts/signUpPersonalWorkoutReducer";
import personalScheduleReducer from "./reducers/personalSchedules/personalScheduleReducer.jsx";
import {CustomerProvider} from "./components/context/customerContext.jsx";
import notificationReducer from "./reducers/notifications/notificationReducer.jsx";
import {NotificationsProvider} from "./components/context/notificationsContext.jsx";

const store = configureStore({

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),

    reducer: {
        schedules: scheduleReducer,
        customers: customersReducer,
        coaches: coachesReducer,
        limitedPriceLists: limitedPriceListReducer,
        unlimitedSubscription: unlimitedSubscriptionReducer,
        limitedSubscription: limitedSubscriptionReducer,
        groupWorkouts: groupWorkoutReducer,
        signUpGroupWorkouts: signUpGroupWorkoutsReducer,
        gyms:gymReducer,
        workoutTypes: workoutTypeReducer,
        signUpPersonalWorkouts: signUpPersonalWorkoutReducer,
        personalSchedule: personalScheduleReducer,
        notifications: notificationReducer
    }
})

export default store;

// <React.StrictMode>  </React.StrictMode>
ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <CustomerProvider>
                    <NotificationsProvider>
                        <App/>
                    </NotificationsProvider>
                </CustomerProvider>
            </AuthProvider>
        </BrowserRouter>
        </Provider>,
)

