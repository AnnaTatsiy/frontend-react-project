import {Button} from "react-bootstrap";
import {Trash} from "react-bootstrap-icons";

export default function PersonalScheduleForEditTableData(props){
    const onClick = () => {
        props.workouts.splice(props.workouts.indexOf(props.workout), 1)
        props.onEdit()
    }

    return (
            <div className={"col"}>
                <div className={"alert alert-light border-primary max-width-col max-height-col my-block"} role="alert">

                    <Button variant={"danger"} className={"ps-1 p-0 my-block-button my-margin"} onClick={() => onClick()}>
                        <Trash className={"me-1"}/></Button>

                    <p className={"mt-2"}> {props.workout.time_begin.slice(0, 5)} </p>
                </div>
            </div>
    )
}