import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {filteringGroupWorkouts, getGroupWorkouts} from "../../actions/groupWorkouts/action";
import {Alert, Button, Table} from "react-bootstrap";
import GroupWorkoutsTableData from "./groupWorkoutsTableData";
import GroupWorkoutModalForm from "./groupWorkoutModalForm";
import GroupWorkoutsFilter from "./groupWorkoutsFilter";
import MyPaginate from "../paginate";

export default function GroupWorkoutsList({dataListCoaches, dataListCustomers}){
    const dispatch = useDispatch();

    // текущая страница
    const curr_page = useSelector(state => state.groupWorkouts.selectedPage);
    const [page, setPage] = useState((isNaN(curr_page)) ? 1 : curr_page);

    // данные отфильтрованные или нет
    const isFiltered =  useSelector(state => state.groupWorkouts.isFiltered);

    useEffect(() => {
        setPage(1);
    }, [isFiltered]);
    
    // вызов ф-ии получения списка групповых тренировок от сервера
    useEffect(() => {
        const params = ({...(JSON.parse(localStorage.getItem('filter'))), page: page});
        (isFiltered) ? dispatch(filteringGroupWorkouts(params)): dispatch(getGroupWorkouts(page))
    }, [dispatch, isFiltered, page])
    
    // состояние отображение модального окна
    let [formModalShow, setFormModalShow] = useState(false);
    let [filterModalShow, setFilterModalShow] = useState(false);

    let workout = useRef(null);

    const onClickForFormEdit = (id) => {
        setFormModalShow(true);
        workout.current = workouts.filter((item) => item.id === id)[0];
    }

    //список групповых тренировок
    const workouts = useSelector(state => state.groupWorkouts.list)

    //номер последней страницы
    const lastPage = useSelector(state => state.groupWorkouts.lastPage);

    return (
        <>
            <div className={"d-flex justify-content-end mt-3 mb-2"}>
                <Button variant={"secondary"} className={"me-2 btn-sm"} onClick={() => dispatch(getGroupWorkouts(page))}>Сброс</Button>
                <Button variant={"primary"} className={"btn-sm"}  onClick={() => setFilterModalShow(true)}>Открыть фильтр</Button>
            </div>

            {workouts !== undefined ? <>
            <Table>
                <thead>
                <tr>
                    <th>День</th>
                    <th>Время</th>
                    <th>Тренер</th>
                    <th>Тип</th>
                    <th>Зал</th>
                    <th>Отмена</th>
                    <th>Дата проведения</th>
                    <th className={"text-primary"}>Узнать детали...</th>
                </tr>
                </thead>
                <tbody>
                {workouts.map((item) => (
                    <GroupWorkoutsTableData key={item.id} workout={item} onClick={onClickForFormEdit}/>
                ))}
                </tbody>
            </Table>

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            />
            </> : <>
                <p className={"ms-1 text-black"}>По вашему запросу ничего не найдено</p>
            </>}

            <GroupWorkoutModalForm
                show={formModalShow}
                workout={workout.current}
                onHide={() => setFormModalShow(false)}
            />

            <GroupWorkoutsFilter
                show={filterModalShow}
                dataListCustomers = {dataListCustomers}
                dataListCoaches = {dataListCoaches}
                onHide={() => setFilterModalShow(false)}
            />
        </>
    );
}