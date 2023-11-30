import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPersonalScheduleEdit, getPersonalScheduleForEdit} from "../../actions/PersonalSchedules/action.jsx";
import Footer from "../footers/footer.jsx";
import PersonalScheduleForEditAddModalForm from "./personalScheduleForEditAddModalForm.jsx";
import PersonalScheduleForEditTab from "./personalScheduleForEditTab.jsx";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MyProgressBar from "../progressBar.jsx";
import {sortPersonalSchedules} from "../../helpers/utils.js";

export default function PersonalScheduleForEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let [formModalShow, setFormModalShow] = useState(false);
    let [isDelete, setDelete] = useState(false);
    let workouts = []

    const [day, setDay] = useState(1);

    //заполненность расписания
    const [fullness, setFullness] = useState({
        fact: 1,
        required: 1,
        recommend: 1
    });

    // получаем заполненность расписания
    useEffect(() => {

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

    }, [dispatch])

    //Получаем расписание
    useEffect(() => {
        dispatch(getPersonalScheduleForEdit())
    }, [dispatch])

    // данные о редактировании
    const response = useSelector(state => state.personalSchedule.forEdit)
    if(response.answer !== undefined && response.answer !== null) {
         workouts = response.answer;
    }
    const onClick = (day) => {
        setFormModalShow(true);
        setDay(day);
    }

    useEffect(() => {
        if(workouts !== undefined) {
            setFullness({
                fact: workouts.length,
                required: fullness.required,
                recommend: fullness.recommend
            })
        }
    }, [workouts.length])

    const onClickReset = () => {
        dispatch(getPersonalScheduleForEdit())
    }

    async function handleSubmit(e) {
        await e.preventDefault();
        await dispatch(getPersonalScheduleEdit(JSON.stringify({data: workouts})))
        navigate('/');
    }

    return (
        <>
                <div className="container mt-4">
                    <div className="my-3 p-3 bg-body rounded shadow-sm">
                        <div className={"max-width-schedule ms-auto"}>
                        <>
                            {(response.answer instanceof Array) ?
                                <div className={"min-height-container"}>
                                    {(response.answer.length !== 0) ? <>

                                            <div className={"d-flex justify-content-end mb-3 mt-1"}>
                                                <form onSubmit={handleSubmit}>
                                                    <Button className={"me-1"} type={"submit"}
                                                            disabled={workouts.length < fullness.required}
                                                            variant={"success"}>Сохранить</Button>
                                                </form>
                                                <Button onClick={onClickReset} to={""}>Сброс</Button>
                                            </div>

                                            <MyProgressBar fullness={fullness}/>

                                            <ul className="nav nav-pills mb-3" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="monday-tab"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#monday"
                                                            type="button" role="tab" aria-controls="monday"
                                                            aria-selected="true">ПН
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="tuesday-tab" data-bs-toggle="pill"
                                                            data-bs-target="#tuesday"
                                                            type="button" role="tab" aria-controls="tuesday"
                                                            aria-selected="false">ВТ
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="wednesday-tab"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#wednesday"
                                                            type="button" role="tab" aria-controls="wednesday"
                                                            aria-selected="false">СР
                                                    </button>
                                                </li>

                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="thursday-tab" data-bs-toggle="pill"
                                                            data-bs-target="#thursday"
                                                            type="button" role="tab" aria-controls="thursday"
                                                            aria-selected="false">ЧТ
                                                    </button>
                                                </li>

                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="friday-tab" data-bs-toggle="pill"
                                                            data-bs-target="#friday"
                                                            type="button" role="tab" aria-controls="friday"
                                                            aria-selected="false">ПТ
                                                    </button>
                                                </li>

                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="saturday-tab" data-bs-toggle="pill"
                                                            data-bs-target="#saturday"
                                                            type="button" role="tab" aria-controls="saturday"
                                                            aria-selected="false">СБ
                                                    </button>
                                                </li>

                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="sunday-tab" data-bs-toggle="pill"
                                                            data-bs-target="#sunday"
                                                            type="button" role="tab" aria-controls="sunday"
                                                            aria-selected="false">ВС
                                                    </button>
                                                </li>

                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="monday" role="tabpanel"
                                                     aria-labelledby="monday-tab">
                                                    <PersonalScheduleForEditTab workouts={workouts}
                                                                                view={sortPersonalSchedules(workouts, 1)}
                                                                                onClick={onClick} day={1}
                                                                                onEdit={() => setDelete(!isDelete)}/>
                                                </div>
                                                <div className="tab-pane fade" id="tuesday" role="tabpanel"
                                                     aria-labelledby="tuesday-tab">
                                                    <PersonalScheduleForEditTab
                                                        workouts={workouts}
                                                        view={sortPersonalSchedules(workouts, 2)}
                                                        onClick={onClick}
                                                        day={2}  onEdit={() => setDelete(!isDelete)}/>
                                                </div>
                                                <div className="tab-pane fade" id="wednesday" role="tabpanel"
                                                     aria-labelledby="wednesday-tab">
                                                    <PersonalScheduleForEditTab
                                                        workouts={workouts}
                                                        view={sortPersonalSchedules(workouts, 3)}
                                                        onClick={onClick}
                                                        day={3}  onEdit={() => setDelete(!isDelete)}/>
                                                </div>

                                                <div className="tab-pane fade" id="thursday" role="tabpanel"
                                                     aria-labelledby="thursday-tab">
                                                    <PersonalScheduleForEditTab
                                                        workouts={workouts}
                                                        view={sortPersonalSchedules(workouts, 4)}
                                                        onClick={onClick}
                                                        day={4}  onEdit={() => setDelete(!isDelete)}/>
                                                </div>

                                                <div className="tab-pane fade" id="friday" role="tabpanel"
                                                     aria-labelledby="friday-tab">
                                                    <PersonalScheduleForEditTab
                                                        workouts={workouts}
                                                        view={sortPersonalSchedules(workouts, 5)}
                                                        onClick={onClick}
                                                        day={5}  onEdit={() => setDelete(!isDelete)}/>
                                                </div>

                                                <div className="tab-pane fade" id="saturday" role="tabpanel"
                                                     aria-labelledby="saturday-tab">
                                                    <PersonalScheduleForEditTab
                                                        workouts={workouts}
                                                        view={sortPersonalSchedules(workouts, 6)}
                                                        onClick={onClick}
                                                        day={6} onEdit={() => setDelete(!isDelete)}/>
                                                </div>

                                                <div className="tab-pane fade" id="sunday" role="tabpanel"
                                                     aria-labelledby="sunday-tab">
                                                    <PersonalScheduleForEditTab
                                                        workouts={workouts}
                                                        view={sortPersonalSchedules(workouts, 7)}
                                                        onClick={onClick}
                                                        day={7} onEdit={() => setDelete(!isDelete)}/>
                                                </div>

                                            </div>

                                        </> :
                                        <p className={"text-dark m-3 mt-4"}>У вас не выставлены тренировки. Нажмите
                                            добавить!</p>}

                                </div> : <p className={"d-flex justify-content-start text-danger"}>{response.error}</p>}

                            <PersonalScheduleForEditAddModalForm
                                show={formModalShow}
                                day={day}
                                workouts={workouts}
                                onHide={() => setFormModalShow(false)}
                            />

                        </>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}