import {Button, Form, FormControl} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addSignUpGroupWorkout} from "../../actions/signUpGroupWorkouts/action.jsx";
import {useState} from "react";

export default function AvailableWorkoutsTableData({workout}) {
    const dispatch = useDispatch();
    const {handleSubmit, register} = useForm();
    const [disable, setDisable] = useState(false);

    // отправка данных на сервер
    function submitForm(data) {
        dispatch(addSignUpGroupWorkout(data));
        setDisable(true);
    }

    return (
        <>
            <tr>
                <td data-label="День">{workout.schedule.day.title}</td>
                <td data-label="Время">{workout.schedule.time_begin.slice(0, 5)}</td>
                <td data-label="Тренер">{workout.schedule.coach.name.slice(0, 1)}. {workout.schedule.coach.patronymic.slice(0, 1)}. {workout.schedule.coach.surname}</td>
                <td data-label="Тип">{workout.schedule.workout_type.title}</td>
                <td data-label="Зал">{workout.schedule.gym.title}</td>
                <td className={"text-md-center"}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <FormControl
                            {...register('id')}
                            type="number"
                            value={workout.id}
                            readOnly={true}
                            hidden={true}
                            />
                        <Button disabled={disable} className={"btn-sm mb-3"} variant="success" type="submit">Записаться</Button>
                    </Form>
                </td>
            </tr>
        </>
    )
}