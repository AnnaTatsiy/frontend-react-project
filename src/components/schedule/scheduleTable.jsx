import ScheduleItem from "./scheduleItem.jsx";
import useWindowSize from "../../helpers/useWindowSize.js";

export default function ScheduleTable({workouts, onClick, isHidden, user}) {

    return (<>
        <table className={"table mt-3"}>
            <thead>
            <tr>
                <th>Время занятий</th>
                <th>Тип тренировки</th>
                <th>Тренер</th>
                <th>№ Зала</th>
                {user.role === "admin" &&
                    <>
                        {!isHidden && <th className={"text-md-center text-danger"}>Удалить</th>}
                        <th className={"text-success text-md-center"}>Редактировать</th>
                        <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                    </>}
            </tr>
            </thead>

            <tbody>
            {workouts.map((item) => (
                <ScheduleItem key={item.id} schedule={item} isHidden={isHidden} onClick={onClick} user={user}/>
            ))}
            </tbody>
        </table>
    </>);
}