import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {signUpPersonalWorkout} from "../../actions/signUpPersonalWorkouts/action.jsx";

export default function SignUpPersonalAvailableWorkoutsTableData(props){

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(signUpPersonalWorkout(JSON.stringify({id: props.workout.id})))
    }

    return (
        <>
            <tr>
                <td data-label={"День"}>{props.workout.schedule.day.title}</td>
                <td data-label={"Время"} className={"text-md-center"}>{props.workout.schedule.time_begin.slice(0, 5)}</td>
                <td data-label={""} className={"text-md-end"}>
                    <Button variant="success" className={"btn-sm mb-2"} onClick={() => onClick()}>Записаться</Button>
                </td>
            </tr>
        </>
    )

}