import {Alert, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getGroupWorkoutById} from "../../actions/groupWorkouts/action";
import {useSearchParams} from "react-router-dom";
import SignUpGroupWorkoutsList from "../signUpGroupWorkouts/signUpGroupWorkoutsList";
import Footer from "../footers/footer.jsx";

export default function GroupWorkoutDetails() {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroupWorkoutById(searchParams.get('id')))
    }, [dispatch, searchParams])

    const [show, setShow] = useState(true);
    const workout = useSelector(state => state.groupWorkouts.selectedWorkout);

    return (workout !== null) ?
        (
            <>
            <div className="container mt-5">
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <div className={"ms-auto"}>
                                <Alert show={show} variant="info">
                                    <Alert.Heading className={"fs-5"}>Информация о тренировке:</Alert.Heading>
                                    <p>
                                        <ul className={"fs-6"}>
                                            <li>День: <b>{workout.schedule.day.title}</b></li>
                                            <li>Время: <b>{workout.schedule.time_begin.slice(0, 5)} - {workout.schedule.time_end.slice(0, 5)}</b>
                                            </li>
                                            <li>Тренер: <b>{workout.schedule.coach.name.slice(0, 1)}. {workout.schedule.coach.patronymic.slice(0, 1)}. {workout.schedule.coach.surname}</b>
                                            </li>
                                            <li>Тип: <b>{workout.schedule.workout_type.title}</b></li>
                                            <li>Спортзал: <b>{workout.schedule.gym.title}</b></li>
                                            <li>Дата: <b>{new Date(workout.event).toLocaleDateString()}</b>
                                            </li>
                                        </ul>
                                    </p>
                                </Alert>

                                <Alert variant={(workout.cancelled === 0) ? "success" : "warning"}>
                                    <Alert.Heading className={"fs-5"}>{(workout.cancelled === 0) ? "Запись на тренировку активна!" : "Предупреждение!"}</Alert.Heading>
                                    <p className={"fs-6"}>
                                        {(workout.cancelled === 0) ?
                                            "Статус тренировки активный! Она будет проведена и сейчас на нее активна запись."
                                            : `Тренировка отменена! Причина: ${workout.reason} Запись недоступна.`}
                                    </p>
                                </Alert>

                                <SignUpGroupWorkoutsList id={searchParams.get('id')}/></div>
                    </div>
                </div>
                <Footer/>
            </>

        ) : (<>Загрузка...</>);
}




