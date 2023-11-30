import {useEffect, useState} from "react";
import axios from "axios";
import PersonalScheduleTab from "./personalScheduleTab.jsx";
import PersonalScheduleAddModalForm from "./personalScheduleAddModalForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalSchedule} from "../../actions/PersonalSchedules/action.jsx";
import MyProgressBar from "../progressBar.jsx";
import {sortPersonalSchedules} from "../../helpers/utils.js";

export default function PersonalSchedule() {

    const dispatch = useDispatch();

    //заполненность расписания
    const [fullness, setFullness] = useState({
        fact: 1,
        required: 1,
        recommend: 1
    });

    let [formModalShow, setFormModalShow] = useState(false);
    const [day, setDay] = useState(1);

    //Получаем заполненность расписания
    useEffect(() => {

        if (!formModalShow) {
            axios.get(`http://127.0.0.1:8000/api/coach/get-required-amount-workouts`, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'api/*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        setFullness(response.data.original)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }, [dispatch, formModalShow])

    //Получаем расписание
    useEffect(() => {
        if (!formModalShow) {
            dispatch(getPersonalSchedule())
        }
    }, [dispatch, formModalShow])

    // тренировки
    const workouts = useSelector(state => state.personalSchedule.list)

    const onClick = (day) => {
        setFormModalShow(true);
        setDay(day);
    }

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm mt-4">
            <div className={"max-width-schedule ms-auto"}>
                {(workouts instanceof Array) ?
                    <div>
                        {(workouts.length !== 0) ?
                            <p>Информация о расписании:</p> :
                            <p className={"text-success"}>Нажмите на кнопку плюс для добавления тренировок в
                                расписание!</p>}

                        <MyProgressBar fullness={fullness}/>

                        <ul className="nav nav-pills mb-3" id="myTab" role="tablist">
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
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="monday" role="tabpanel"
                                 aria-labelledby="monday-tab">
                                <PersonalScheduleTab
                                    workouts={sortPersonalSchedules(workouts,1)}
                                    onClick={onClick} day={1}/>
                            </div>
                            <div className="tab-pane fade" id="tuesday" role="tabpanel"
                                 aria-labelledby="tuesday-tab">
                                <PersonalScheduleTab workouts={sortPersonalSchedules(workouts,2)}
                                                     onClick={onClick} day={2}/>
                            </div>
                            <div className="tab-pane fade" id="wednesday" role="tabpanel"
                                 aria-labelledby="wednesday-tab">
                                <PersonalScheduleTab workouts={sortPersonalSchedules(workouts,3)}
                                                     onClick={onClick} day={3}/>
                            </div>

                            <div className="tab-pane fade" id="thursday" role="tabpanel"
                                 aria-labelledby="thursday-tab">
                                <PersonalScheduleTab workouts={sortPersonalSchedules(workouts,4)}
                                                     onClick={onClick} day={4}/>
                            </div>

                            <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="friday-tab">
                                <PersonalScheduleTab workouts={sortPersonalSchedules(workouts,5)}
                                                     onClick={onClick} day={5}/>
                            </div>

                            <div className="tab-pane fade" id="saturday" role="tabpanel"
                                 aria-labelledby="saturday-tab">
                                <PersonalScheduleTab workouts={sortPersonalSchedules(workouts,6)}
                                                     onClick={onClick} day={6}/>
                            </div>

                            <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="sunday-tab">
                                <PersonalScheduleTab workouts={sortPersonalSchedules(workouts,7)}
                                                     onClick={onClick} day={7}/>
                            </div>

                        </div>

                    </div> : <>Загрузка...</>}

                <PersonalScheduleAddModalForm
                    show={formModalShow}
                    day={day}
                    onHide={() => setFormModalShow(false)}
                />
            </div>
        </div>
    );
}