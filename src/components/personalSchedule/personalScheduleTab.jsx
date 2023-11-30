import PersonalScheduleTableData from "./personalScheduleTableData.jsx";
import {PlusCircleFill} from "react-bootstrap-icons";

export default function PersonalScheduleTab({workouts, onClick, day}){
    return (<>


            <div className="row row-cols-auto">
                {workouts.map((item) => (
                    <PersonalScheduleTableData key={item.id} workout={item} workouts={workouts}/>
                ))}

                <button  className={"bg-transparent border-white max-width-col max-height-col"} title={"Добавить тренировку"} onClick={() => onClick(day)
                }><p className={"ms-2 icon text-success"}><PlusCircleFill/></p></button>

            </div>


    </>);
}