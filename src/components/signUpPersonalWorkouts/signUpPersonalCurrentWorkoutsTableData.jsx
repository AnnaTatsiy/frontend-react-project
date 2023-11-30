import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteSignUpPersonalWorkouts} from "../../actions/signUpPersonalWorkouts/action.jsx";

export default function SignUpPersonalCurrentWorkoutsTableData(props){

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(deleteSignUpPersonalWorkouts(JSON.stringify({id: props.workout.id})))
    }

    return (
        <>
            <tr>
                <td>{props.workout.schedule.day.title}</td>
                <td className={"text-md-center"}>{props.workout.schedule.time_begin.slice(0, 5)}</td>
                <td className={"text-md-center"}>{new Date(props.workout.date_begin).toLocaleDateString()}</td>
                <td className={"text-md-end"}>
                        <Button variant="danger" className={"btn-sm"} onClick={() => onClick()}>Отменить</Button>
                </td>
            </tr>
        </>

    )
}