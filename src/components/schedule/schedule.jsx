import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getSchedule} from "../../actions/schedules/action";
import ScheduleTable from "./scheduleTable.jsx";
import {Button} from "react-bootstrap";
import ScheduleFormModal from "./scheduleFormModal.jsx";
import useAuthContext from "../context/authContext.jsx";
import Footer from "../footers/footer.jsx";

export default function Schedule({coaches}) {

    const {user} = useAuthContext();

    const dispatch = useDispatch();

    const [isHidden, setHidden] = useState(true);
    // состояние отображение модального окна
    let [formModalShow, setFormModalShow] = useState(false);

    // вызов ф-ии получения расписания от сервера
    useEffect(() => {
        if (!formModalShow) {
            dispatch(getSchedule());
        }
    }, [dispatch, formModalShow])

    // состояние режима добавления/редактирования
    const [isAddForm, setIsAddForm] = useState(false);

    //тренер которого будем редактировать
    let workout = useRef(null);

    const onClickForFormEdit = (id) => {
        setFormModalShow(true);
        setIsAddForm(false);
        workout.current = schedule.filter((item) => item.id === id)[0];
    }

    // расписание
    const schedule = useSelector(state => state.schedules.list);

    // сортирую тренировки по дням недели
    const workOnMonday = schedule.filter(node => node.day_id === 1).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnTuesday = schedule.filter(node => node.day_id === 2).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnWednesday = schedule.filter(node => node.day_id === 3).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnThursday = schedule.filter(node => node.day_id === 4).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnFriday = schedule.filter(node => node.day_id === 5).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnSaturday = schedule.filter(node => node.day_id === 6).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnSunday = schedule.filter(node => node.day_id === 7).sort((a, b) => a.time_begin.localeCompare(b.time_begin));

    return (
        <>
            <div className="container">
                <div className={
                (user.role === "admin") ? 'my-3 p-3 bg-body rounded shadow-sm min-height-container'
                    :'my-3 p-3 bg-body rounded shadow-sm min-height-container mt-4' }>
                    <ul className="nav nav-pills mt-2 mb-2" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="monday-tab" data-bs-toggle="pill"
                                    data-bs-target="#monday"
                                    type="button" role="tab" aria-controls="monday" aria-selected="true">ПН
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="tuesday-tab" data-bs-toggle="pill"
                                    data-bs-target="#tuesday"
                                    type="button" role="tab" aria-controls="tuesday" aria-selected="false">ВТ
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="wednesday-tab" data-bs-toggle="pill"
                                    data-bs-target="#wednesday"
                                    type="button" role="tab" aria-controls="wednesday" aria-selected="false">СР
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="thursday-tab" data-bs-toggle="pill"
                                    data-bs-target="#thursday"
                                    type="button" role="tab" aria-controls="thursday" aria-selected="false">ЧТ
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="friday-tab" data-bs-toggle="pill"
                                    data-bs-target="#friday"
                                    type="button" role="tab" aria-controls="friday" aria-selected="false">ПТ
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="saturday-tab" data-bs-toggle="pill"
                                    data-bs-target="#saturday"
                                    type="button" role="tab" aria-controls="saturday" aria-selected="false">СБ
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="sunday-tab" data-bs-toggle="pill"
                                    data-bs-target="#sunday"
                                    type="button" role="tab" aria-controls="sunday" aria-selected="false">ВС
                            </button>
                        </li>

                    </ul>

                    {user.role === "admin" && <>

                            <div className="row m-2 mb-3 max-width-form-control">
                                    <div className="form-check">
                                        <input checked={!isHidden} onClick={() => setHidden(!isHidden)}
                                               className="form-check-input"
                                               type="checkbox" role="switch" id="flexSwitchCheck"></input>
                                        <label className="form-check-label text-dark" htmlFor="flexSwitchCheck">Колонка
                                            удаления тренировок</label>
                                    </div>
                            </div>

                        <div className={"d-flex justify-content-end"}>
                            <Button variant={"success"} className={"btn-sm"} onClick={() => {
                                setFormModalShow(true);
                                setIsAddForm(true);
                                workout.current = null;
                            }}>Добавить тренировку</Button>
                        </div>

                        <ScheduleFormModal
                            show={formModalShow}
                            add={isAddForm ? 'true' : null}
                            workout={workout.current}
                            onHide={() => setFormModalShow(false)}
                            coaches={coaches}
                        />

                    </>}

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="monday" role="tabpanel"
                             aria-labelledby="monday-tab">
                            <ScheduleTable workouts={workOnMonday} onClick={onClickForFormEdit}
                                           isHidden={isHidden} user={user}/>
                        </div>
                        <div className="tab-pane fade" id="tuesday" role="tabpanel"
                             aria-labelledby="tuesday-tab">
                            <ScheduleTable workouts={workOnTuesday} onClick={onClickForFormEdit}
                                           isHidden={isHidden} user={user}/>
                        </div>
                        <div className="tab-pane fade" id="wednesday" role="tabpanel"
                             aria-labelledby="wednesday-tab">
                            <ScheduleTable workouts={workOnWednesday} onClick={onClickForFormEdit}
                                           isHidden={isHidden} user={user}/>
                        </div>

                        <div className="tab-pane fade" id="thursday" role="tabpanel"
                             aria-labelledby="thursday-tab">
                            <ScheduleTable workouts={workOnThursday} onClick={onClickForFormEdit}
                                           isHidden={isHidden} user={user}/>
                        </div>

                        <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="friday-tab">
                            <ScheduleTable workouts={workOnFriday} onClick={onClickForFormEdit}
                                           isHidden={isHidden} user={user}/>
                        </div>

                        <div className="tab-pane fade" id="saturday" role="tabpanel"
                             aria-labelledby="saturday-tab">
                            <ScheduleTable workouts={workOnSaturday} onClick={onClickForFormEdit}
                                           isHidden={isHidden} user={user}/>
                        </div>

                        <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="sunday-tab">
                            <ScheduleTable workouts={workOnSunday} onClick={onClickForFormEdit}
                                           isHidden={isHidden} user={user}/>
                        </div>
                    </div>
                </div>
            </div>

            {user.role !== "admin" &&
                <Footer/>
            }
        </>
    )
}

