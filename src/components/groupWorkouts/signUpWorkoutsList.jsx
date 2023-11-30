import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSignUpWorkouts} from "../../actions/groupWorkouts/action.jsx";
import {Alert} from "react-bootstrap";
import SignUpWorkoutsTableData from "./signUpWorkoutsTableData.jsx";

export default function SignUpWorkoutsList(){
    const dispatch = useDispatch();

    // вызов ф-ии получения списка групповых тренировок от сервера
    useEffect(() => {
        dispatch(getSignUpWorkouts())
    }, [dispatch])

    const workouts = useSelector(state => state.groupWorkouts.signUpWorkouts);

    return (
        <>
        {(workouts.length !== 0) ?
            <div className="mt-4 my-3 p-3 bg-body rounded shadow-sm">

            <p className={"mt-1"}>Ваши групповые тренировки:</p>

            <table className={"table"}>
                <thead>
                <tr>
                    <th>День</th>
                    <th>Время</th>
                    <th>Тренер</th>
                    <th>Тип</th>
                    <th>Зал</th>
                    <th>Дата</th>
                </tr>
                </thead>

                <tbody>
                {workouts.map((item) => (
                    <SignUpWorkoutsTableData key={item.id} workout={item}/>
                ))}
                </tbody>
            </table>
        </div> : <Alert className={"mt-4"} variant={"secondary"}>Нет ближайших записей на групповые тренировки</Alert>}
        </>

    );
}