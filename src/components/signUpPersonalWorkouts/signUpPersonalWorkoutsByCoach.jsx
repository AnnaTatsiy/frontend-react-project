import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSignUpPersonalWorkoutsByCoach
} from "../../actions/signUpPersonalWorkouts/action.jsx";
import Footer from "../footers/footer.jsx";
import SignUpPersonalWorkoutsByCoachTab from "./signUpPersonalWorkoutsByCoachTab.jsx";
import ReactPaginate from "react-paginate";
import axios from "axios";
import MyProgressBar from "../progressBar.jsx";
import useWindowSize from "../../helpers/useWindowSize.js";
import {getLabel, sortSignUpPersonalWorkouts} from "../../helpers/utils.js";

export default function SignUpPersonalWorkoutsByCoach(){
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()

    // текущая страница
    const [page, setPage] = useState(2);

    //заполненность расписания
    const [fullness, setFullness] = useState({
        fact: 1,
        required: 1,
        recommend: 1
    });

    //сколько людей записаны на текущей недели
    const [count, setCount] = useState(0);
    
    //список тренировок
    const workouts = useSelector(state => state.signUpPersonalWorkouts.list);

    useEffect(() => {
        dispatch(getSignUpPersonalWorkoutsByCoach(searchParams.get('id'), page));
    }, [dispatch, page, searchParams])

    useEffect(() => {
        if(workouts.length !== 0) {
            setCount(workouts.filter(w => w.customer_id !== null).length)
        }
    }, [page, searchParams, workouts])

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/coaches/required-amount-workouts/${searchParams.get('id')}`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setFullness(response.data)
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [searchParams])

    const size = useWindowSize();

    return (
        <>
            <div className="container">
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <div className={"max-width-schedule ms-auto"}>

                            {(workouts instanceof Array) ?
                                <div className={"min-height-container"}>
                                    { (workouts.length !== 0) ? <>

                                        <p className={"text-success"}>Количество занятых записей: {count}</p>
                                        <p className={"text-primary"}>Количество свободных записей: {workouts.length - count}</p>

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
                                                <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts, 1)}/>
                                            </div>
                                            <div className="tab-pane fade" id="tuesday" role="tabpanel"
                                                 aria-labelledby="tuesday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts, 2)}/>
                                            </div>
                                            <div className="tab-pane fade" id="wednesday" role="tabpanel"
                                                 aria-labelledby="wednesday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts, 3)}/>
                                            </div>

                                            <div className="tab-pane fade" id="thursday" role="tabpanel"
                                                 aria-labelledby="thursday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts, 4)}/>
                                            </div>

                                            <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="friday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts, 5)}/>
                                            </div>

                                            <div className="tab-pane fade" id="saturday" role="tabpanel"
                                                 aria-labelledby="saturday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts, 6)}/>
                                            </div>

                                            <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="sunday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={sortSignUpPersonalWorkouts(workouts, 7)}/>
                                            </div>

                                        </div>

                                    </> : <p className={"text-dark m-3 mt-4"}>У тренера нет тренировок на этой недели</p>}


                                    <div className={"mt-3 d-flex justify-content-center"}>
                                        <ReactPaginate
                                            initialPage = {page - 1}
                                            forcePage = {page - 1}
                                            previousLabel={''}
                                            nextLabel={''}
                                            pageCount={3}
                                            marginPagesDisplayed={5}
                                            pageRangeDisplayed={8}
                                            onPageChange={(e) => (setPage(e.selected+1))}
                                            containerClassName={'pagination'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            activeClassName={'active'}
                                            pageLabelBuilder = {(page) => getLabel(page, size)}
                                        />
                                    </div>

                                </div> : <>Загрузка...</>}

                        </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}