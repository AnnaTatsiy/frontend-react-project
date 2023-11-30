import {useEffect, useRef, useState} from "react";
import CoachItem from "./coachItem";
import {Button, Col, Table} from "react-bootstrap";
import CoachFormModal from "./coachFormModal.jsx";
import CoachOption from "./coachOption";
import 'react-toastify/dist/ReactToastify.css';
import MyPaginate from "../paginate";
import {useSelector} from "react-redux";
import {getCoaches} from "../../actions/coaches/action.jsx";
import useWindowSize from "../../helpers/useWindowSize.js";

export default function CoachesList({dispatch, dataList}) {

    // текущая страница
    const [page, setPage] = useState(1);
    const [free, setFree] = useState(false);
    const [isHidden, setHidden] = useState(true);

    // вызов ф-ии получения списка тренеров от сервера
    useEffect(() => {
        dispatch(getCoaches(page));
    }, [dispatch, page])

    //тренеры
    const coaches = useSelector(state => state.coaches.list)

    //номер последней страницы
    const lastPage = useSelector(state => state.coaches.lastPage);

    // состояние отображение модального окна
    let [formModalShow, setFormModalShow] = useState(false);

    // состояние режима добавления/редактирования
    const [isAddForm, setIsAddForm] = useState(false);

    //тренер которого будем редактировать
    let coach = useRef(null);

    // состояние для фильтрации тренеров
    const [searchValue, setSearchValue] = useState('');

    const onClickForFormEdit = (id) => {
        setFormModalShow(true);
        setIsAddForm(false);
        coach.current = viewCoaches.filter((item) => item.id === id)[0];
    }

    // список отфильтрованных тренеров по серии-номеру паспорта
    const filteredCoaches = dataList.filter(coach => coach.passport.includes(searchValue));

    //проверка отобразить всех или по критерию поиска
    const viewCoaches_ = ((searchValue.length !== 0) ? filteredCoaches : coaches);
    const viewCoaches = (((free) ? viewCoaches_.filter(coach => coach.sale !== 0) : viewCoaches_)).sort((a, b) => b.updated_at.localeCompare(a.updated_at));;

    return (
        <>
            <Col>

                <div className="row mt-2">
                    <div className="col max-width-form-control min-width-form-control">
                        <div className="form-floating">
                            <input
                                className="form-control"
                                type={"text"} value={searchValue}
                                list="datalistOptions" id="exampleDataList"
                                placeholder="Type to search..."
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                                name={"passport"}/>
                            <datalist id="datalistOptions">
                                {dataList.map((item) => (
                                    <CoachOption key={item.id} coach={item}/>
                                ))}
                            </datalist>
                            <label htmlFor="exampleDataList" className="font-size-alert form-label p-3 text-secondary">ФИО или
                                серия-номер
                                паспорта:</label>
                        </div>
                    </div>
                    <div className="col mt-2 ms-3">

                        <div className={"row"}>

                            <div className="form-check">
                                <input checked={free} onClick={() => setFree(!free)} className="form-check-input"
                                       type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
                                <label className="form-check-label text-dark" htmlFor="flexSwitchCheckDefault">Тренеры с разрешенной продажей абонементов</label>
                            </div>

                            <div className="form-check">
                                <input checked={!isHidden} onClick={() => setHidden(!isHidden)}
                                       className="form-check-input"
                                       type="checkbox" role="switch" id="flexSwitchCheck"></input>
                                <label className="form-check-label text-dark" htmlFor="flexSwitchCheck">Колонка
                                    увольнения тренеров</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"d-flex justify-content-end mt-3 mb-3"}>
                    <Button variant={"success"} className={"btn-sm"} onClick={() => {
                        setFormModalShow(true);
                        setIsAddForm(true);
                        coach.current = null;
                    }}>Добавить тренера</Button>
                </div>
            </Col>

            {(viewCoaches.length !== 0) ? <>
                <Table>
                    <thead>
                    <tr>
                        <th>Паспорт</th>
                        <th>Тренер</th>
                        <th>Телефон</th>
                        <th>Эл. почта</th>
                        <th>Прописка</th>
                        {!isHidden && <th className={"text-danger"}>Уволить</th>}
                        <th>Редактировать</th>
                        <th>Тренировки</th>
                    </tr>
                    </thead>
                    <tbody>
                    {viewCoaches.map((item) => (
                        <CoachItem key={item.id} coach={item} onClick={onClickForFormEdit} isHidden={isHidden}/>
                    ))}
                    </tbody>
                </Table>

                <MyPaginate
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                /> </> : <p className={"ms-1 text-dark"}>По вашему запросу ничего не найдено</p>}

            <CoachFormModal
                show={formModalShow}
                add={isAddForm ? 'true' : null}
                coach={coach.current}
                onHide={() => setFormModalShow(false)}
            />
        </>
    )

}
