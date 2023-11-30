// компонент вывода одного клиента

import {InfoSquareFill, PencilFill, Trash} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteCoach} from "../../actions/coaches/action.jsx";
import useWindowSize from "../../helpers/useWindowSize.js";

export default function CoachItem({coach, onClick, isHidden}){

    const dispatch = useDispatch();
    const size = useWindowSize();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(deleteCoach(JSON.stringify({ id: coach.id })))
    }

    return (
        <>
            <tr>
                <td data-label={'Паспорт'}>{coach.passport}</td>
                <td data-label={'Тренер'}>{coach.name.slice(0, 1)}. {coach.patronymic.slice(0, 1)}. {coach.surname}</td>
                <td data-label={'Телефон'}>{coach.number}</td>
                <td data-label={'Эл. почта'}>{coach.user.email}</td>
                <td data-label={'Прописка'}>{coach.registration}</td>

                {!isHidden &&
                    <td data-label={'Уволить'} className={(size.width) > 1200 ? "text-md-center" : ''}>
                        <form onSubmit={handleSubmit}>
                            <Button variant={"danger"} className={"ps-1 p-0 mt-2"} type={"submit"}>
                                <Trash className={"me-1"}/></Button>
                        </form>
                    </td>
                }

                <td data-label={'Редактировать'} className={(size.width) > 1200 ? "text-md-center" : ''}>
                    <Button variant={"success"} className={"ps-1 p-0 mt-2"} onClick={() => onClick(coach.id)}>
                        <PencilFill className={"me-1"}/></Button>
                </td>
                <td data-label={'Тренировки'} className={ (size.width) > 1200 ? "text-md-center mb-3" : 'mb-3'}>
                    <NavLink className={"fs-3"} to={`/personal-workouts/select-workouts-by-coach?id=${coach.id}&page=2`}
                             placeholder={"Показать тренировки..."}>
                        <InfoSquareFill/>
                    </NavLink>
                </td>
            </tr>
        </>
    )
}