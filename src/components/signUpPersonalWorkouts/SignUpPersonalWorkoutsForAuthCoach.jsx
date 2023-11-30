import {useEffect, useState} from "react";
import axios from "axios";
import SignUpPersonalWorkoutsByCoachTab from "./signUpPersonalWorkoutsByCoachTab.jsx";
import ReactPaginate from "react-paginate";
import useWindowSize from "../../helpers/useWindowSize.js";
import {getLabel, sortSignUpPersonalWorkouts} from "../../helpers/utils.js";

export default function SignUpPersonalWorkoutsForAuthCoach() {

    // текущая страница
    const [page, setPage] = useState(2);
    // сколько людей записаны на текущей недели
    const [count, setCount] = useState(0);
    // тренировки
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/coach/get-sign-up-personal-workouts-by-auth-coach/${page}`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setWorkouts(response.data.original)
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [page])

    useEffect(() => {
        if (workouts.length !== 0) {
            setCount(workouts.filter(w => w.customer_id !== null).length)
        }
    }, [page, workouts])

    const size = useWindowSize();

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <div className={"max-width-schedule ms-auto"}>
                {(workouts instanceof Array) ?
                    <div>
                        {(workouts.length !== 0) ? <>

                            <p>Ваши персональные тренировки:</p>

                            <p className={"text-success fs-6"}>Количество тренировок: {count}</p>
                            <p className={"text-primary fs-6"}>Количество записанных
                                клиентов: {workouts.length - count}</p>

                            <ul className="nav nav-pills mb-3" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="monday-tab" data-bs-toggle="pill"
                                            data-bs-target="#monday1"
                                            type="button" role="tab" aria-controls="monday" aria-selected="true">ПН
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="tuesday-tab" data-bs-toggle="pill"
                                            data-bs-target="#tuesday1"
                                            type="button" role="tab" aria-controls="tuesday" aria-selected="false">ВТ
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="wednesday-tab" data-bs-toggle="pill"
                                            data-bs-target="#wednesday1"
                                            type="button" role="tab" aria-controls="wednesday" aria-selected="false">СР
                                    </button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="thursday-tab" data-bs-toggle="pill"
                                            data-bs-target="#thursday1"
                                            type="button" role="tab" aria-controls="thursday" aria-selected="false">ЧТ
                                    </button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="friday-tab" data-bs-toggle="pill"
                                            data-bs-target="#friday1"
                                            type="button" role="tab" aria-controls="friday" aria-selected="false">ПТ
                                    </button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="saturday-tab" data-bs-toggle="pill"
                                            data-bs-target="#saturday1"
                                            type="button" role="tab" aria-controls="saturday" aria-selected="false">СБ
                                    </button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="sunday-tab" data-bs-toggle="pill"
                                            data-bs-target="#sunday1"
                                            type="button" role="tab" aria-controls="sunday" aria-selected="false">ВС
                                    </button>
                                </li>

                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="monday1" role="tabpanel"
                                     aria-labelledby="monday-tab">
                                    <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts,1)}/>
                                </div>
                                <div className="tab-pane fade" id="tuesday1" role="tabpanel"
                                     aria-labelledby="tuesday-tab">
                                    <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts,2)}/>
                                </div>
                                <div className="tab-pane fade" id="wednesday1" role="tabpanel"
                                     aria-labelledby="wednesday-tab">
                                    <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts,3)}/>
                                </div>

                                <div className="tab-pane fade" id="thursday1" role="tabpanel"
                                     aria-labelledby="thursday-tab">
                                    <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts,4)}/>
                                </div>

                                <div className="tab-pane fade" id="friday1" role="tabpanel"
                                     aria-labelledby="friday-tab">
                                    <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts,5)}/>
                                </div>

                                <div className="tab-pane fade" id="saturday1" role="tabpanel"
                                     aria-labelledby="saturday-tab">
                                    <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts,6)}/>
                                </div>

                                <div className="tab-pane fade" id="sunday1" role="tabpanel"
                                     aria-labelledby="sunday-tab">
                                    <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts,7)}/>
                                </div>

                            </div>

                            </> : <p className={"text-dark m-3 mt-4"}>Нет тренировок на этой недели</p>
                        }

                        <div className={"mt-3 d-flex justify-content-center"}>
                            <ReactPaginate
                                initialPage={page - 1}
                                forcePage={page - 1}
                                previousLabel={''}
                                nextLabel={''}
                                pageCount={3}
                                marginPagesDisplayed={5}
                                pageRangeDisplayed={8}
                                onPageChange={(e) => (setPage(e.selected + 1))}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                activeClassName={'active'}
                                pageLabelBuilder={(page) => getLabel(page, size)}
                            />
                        </div>
                    </div> : <>Загрузка...</>}
            </div>
        </div>
    );
}