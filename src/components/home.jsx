import useAuthContext from "./context/authContext.jsx";
import Footer from "./footers/footer.jsx";
import UnlimitedSubscriptionAbout from "./unlimitedSubscriptions/unlimitedSubscriptionAbout.jsx";
import LimitedSubscriptionAbout from "./limitedSubscriptions/limitedSubscriptionAbout.jsx";
import SignUpWorkoutsList from "./groupWorkouts/signUpWorkoutsList.jsx";
import PersonalSchedule from "./personalSchedule/personalSchedule.jsx";
import SignUpPersonalCurrentWorkoutsList from "./signUpPersonalWorkouts/signUpPersonalCurrentWorkoutsList.jsx";
import Schedule from "./schedule/schedule.jsx";
import useCustomerContext from "./context/customerContext.jsx";
import SignUpPersonalWorkoutsForAuthCoach from "./signUpPersonalWorkouts/SignUpPersonalWorkoutsForAuthCoach.jsx";

export default function Home() {
    const {user} = useAuthContext();
    const {subscription, subscriptionLimited} = useCustomerContext();

    return (
        <>
                            <div className="container">
                                {(user.role === 'customer') ? <>

                                {(subscription !== null && subscription.unlimited_price_list.subscription_type.group === 1) &&
                                    <SignUpWorkoutsList/>
                                }

                                    {(subscriptionLimited !== null && subscriptionLimited.open !== undefined) &&
                                        <SignUpPersonalCurrentWorkoutsList/>
                                    }

                                    <div className="row align-items-md-stretch mt-4">
                                        <div className="col-md-6">
                                            <div className="h-100 rounded-3">
                                                <UnlimitedSubscriptionAbout/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="h-100 rounded-3">
                                                <LimitedSubscriptionAbout/>
                                            </div>
                                        </div>
                                    </div>
                                </> : ((user.role === 'coach') ? <>
                                    <PersonalSchedule/>
                                    <SignUpPersonalWorkoutsForAuthCoach/>
                                </> : <Schedule/>)}
                            </div>
                <Footer/>
            </>
    );

}