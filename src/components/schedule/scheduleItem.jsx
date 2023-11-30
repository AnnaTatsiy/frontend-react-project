//компонент вывода расписания одного дня
import {NavLink} from "react-router-dom";
import {InfoSquareFill, PencilFill, Trash} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {deleteSchedule} from "../../actions/schedules/action.jsx";
import {Button} from "react-bootstrap";
import useWindowSize from "../../helpers/useWindowSize.js";

export default function ScheduleItem({schedule, onClick, isHidden, user}) {

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(deleteSchedule(JSON.stringify({id: schedule.id})))
    }

    const size = useWindowSize();

    return (
        <>
            <tr>
                <td data-label={"Время занятий"}>{schedule.time_begin.slice(0, 5)} - {schedule.time_end.slice(0, 5)}</td>
                <td data-label={"Тип тренировки"}>{schedule.workout_type.title}</td>
                <td data-label={"Тренер"}>{schedule.coach.name.slice(0, 1)}. {schedule.coach.patronymic.slice(0, 1)}. {schedule.coach.surname}</td>
                <td data-label={"№ Зала"} className={(user.role !== "admin") ? "mb-3" : ''}>{schedule.gym.title.replace("№", "")}</td>

                {user.role === "admin" &&
                    <>
                        {!isHidden &&
                            <td className={(size.width) > 1200 ? "text-md-center" : ''}>
                                <form onSubmit={handleSubmit}>
                                    <Button variant={"danger"} className={"ps-1 p-0 mt-2"} type={"submit"}>
                                        <Trash className={"me-1"}/></Button>

                                </form>
                            </td>
                        }

                        <td className={(size.width) > 1200 ? "text-md-center" : ''}>
                            <Button variant={"success"} className={"ps-1 p-0 mt-2"}
                                    onClick={() => onClick(schedule.id)}>
                                <PencilFill className={"me-1"}/></Button>
                        </td>

                        <td className={(size.width) > 1200 ? "text-md-center mb-3" : 'mb-3'} >
                            <NavLink className={"fs-3"}
                                     to={`/group-workouts/select-workouts-by-schedule?id=${schedule.id}`}
                                     placeholder={"Показать тренировки..."}>
                                <InfoSquareFill/>
                            </NavLink>
                        </td>

                    </>
                }
            </tr>
        </>
    )
}