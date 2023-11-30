import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Form, FormControl} from "react-bootstrap";
import {deleteSignUpGroupWorkout} from "../../actions/signUpGroupWorkouts/action.jsx";

export default  function SignUpWorkoutsTableData({workout}){
    const dispatch = useDispatch();
    const {handleSubmit, register} = useForm();

    // отправка данных на сервер
    function submitForm(data) {
        dispatch(deleteSignUpGroupWorkout(data));
    }

    return (
        <>
            <tr>
                <td data-label="День">{workout.schedule.day.title}</td>
                <td data-label="Время">{workout.schedule.time_begin.slice(0, 5)}</td>
                <td data-label="Тренер">{workout.schedule.coach.name.slice(0, 1)}. {workout.schedule.coach.patronymic.slice(0, 1)}. {workout.schedule.coach.surname}</td>
                <td data-label="Тип">{workout.schedule.workout_type.title}</td>
                <td data-label="Зал">{workout.schedule.gym.title}</td>
                <td data-label="Дата">{new Date(workout.event).toLocaleDateString()}</td>
                <td className={"text-md-end"}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <FormControl
                            {...register('id')}
                            type="number"
                            value={workout.id}
                            readOnly={true}
                            hidden={true}/>

                        <Button variant="danger" className={"btn-sm mb-2"} type="submit">Отменить</Button>
                    </Form>
                </td>
            </tr>
        </>
    )
}