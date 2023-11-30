import {PlusCircleFill} from "react-bootstrap-icons";
import PersonalScheduleForEditTableData from "./personalScheduleForEditTableData.jsx";

export default function PersonalScheduleForEditTab(props){
    return (<>

        {(props.view !== undefined) ? <>
            <div className="row row-cols-auto mt-4">
                {props.view.map((item) => (
                    <PersonalScheduleForEditTableData key={item.id} workout={item} workouts={props.workouts} onEdit={props.onEdit}/>
                ))}

                <button  className={"bg-transparent border-white max-width-col max-height-col"} title={"Добавить тренировку"} onClick={() => props.onClick(props.day)
                }><p className={"ms-2 icon text-success"}><PlusCircleFill/></p></button>

            </div>
        </> : <p className={"text-dark m-3 mt-4"}>Нет тренировок назначенных на этот день недели</p>}

    </>);
}