import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    getCurrentSignUpPersonalWorkouts,
} from "../../actions/signUpPersonalWorkouts/action.jsx"
import {Alert} from "react-bootstrap";
import SignUpPersonalCurrentWorkoutsTableData from "./signUpPersonalCurrentWorkoutsTableData.jsx";

export default function SignUpPersonalCurrentWorkoutsList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentSignUpPersonalWorkouts())
    }, [dispatch])

    const workouts = useSelector(state => state.signUpPersonalWorkouts.customerListCurrent);

    return (
        <>

            {(workouts instanceof Array && workouts.length !== 0) ?

                <div className="mt-4 my-3 p-3 bg-body rounded shadow-sm">
                    <p className={"mt-1"}>Ваши персональные тренировки:</p>

                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>День</th>
                            <th className={"text-md-center"}>Время</th>
                            <th className={"text-md-center"}>Дата</th>
                            <th className={"text-md-center"}></th>
                        </tr>
                        </thead>

                        <tbody>
                        {workouts.map((item) => (
                            <SignUpPersonalCurrentWorkoutsTableData key={item.id} workout={item}/>
                        ))}
                        </tbody>
                    </table>

                </div> : <Alert className={"mt-4"} variant={"secondary"}>Нет ближайших записей на персональные тренировки</Alert>}

        </>
    );
}