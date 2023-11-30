import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, Col, Table} from "react-bootstrap";
import CustomerOption from "../customers/customerOption";
import {getAllLimitedSubscriptions, getLimitedSubscriptions} from "../../actions/limitedSubscriptions/action";
import LimitedSubscriptionTableData from "./limitedSubscriptionTableData";
import LimitedSubscriptionFormModal from "./limitedSubscriptionFormModal";
import MyPaginate from "../paginate";

export default function LimitedSubscriptionsList({dispatch, dataList, coaches}){

    // текущая страница
    const [page, setPage] = useState(1);

    // вызов ф-ии получения всех подписок на тренировки с тренером
    useEffect(() => {
        dispatch(getLimitedSubscriptions(page));
    }, [dispatch, page])

    useEffect(() => {
        dispatch(getAllLimitedSubscriptions())
    }, [dispatch])

    //все подписки на тренировки с тренером
    const subscriptions = useSelector(state => state.limitedSubscription.list);
    const fullLists = useSelector(state => state.limitedSubscription.fullList);

    //номер последней страницы
    const lastPage = useSelector(state => state.limitedSubscription.lastPage);

    // состояние отображение модального окна
    let [formModalShow, setFormModalShow] = useState(false);

    // состояние для фильтрации абонементов
    const [searchValue, setSearchValue] = useState('');

    // список отфильтрованных абонементов по серии-номеру паспорта клиента
    const filteredSubscriptions = fullLists.filter(sub =>
        sub.customer.passport.includes(searchValue)
    );

    //проверка отобразить всех или по критерию поиска
    const viewSubscriptions = (((searchValue.length !== 0) ? filteredSubscriptions : subscriptions)).sort((a, b) => b.open.localeCompare(a.open));

    return (
        <>
            <Col>
                <div className={"row mt-2 max-width-form-control min-width-form-control"}>
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
                                <CustomerOption key={item.id} customer={item}/>
                            ))}
                        </datalist>
                        <label htmlFor="exampleDataList" className="font-size-alert form-label p-3 text-secondary">ФИО или серия-номер
                            паспорта клиента:</label>
                    </div>
                </div>

                <div className={"d-flex justify-content-end mt-3 mb-2"}>
                    <Button variant={"success"} className={"btn-sm"} onClick={() => {
                        setFormModalShow(true);
                    }}>Оформить тренировки</Button>

                </div>

            </Col>

            {viewSubscriptions.length !== 0 ? <>
            <Table className={"mt-3"}>
                <thead>
                <tr>
                    <th>ФИО клиента</th>
                    <th>ФИО тренера</th>
                    <th>Кол-во тренировок</th>
                    <th>Дата открытия</th>
                </tr>
                </thead>
                <tbody>
                {viewSubscriptions.map((item) => (
                    <LimitedSubscriptionTableData key={item.id} sub={item}/>
                ))}
                </tbody>
            </Table>

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            />    </> : <>
                <p className={"ms-1 text-black"}>По вашему запросу ничего не найдено</p>
            </>}

            <LimitedSubscriptionFormModal
                show={formModalShow}
                customers = {dataList}
                coaches = {coaches}
                onHide={() => setFormModalShow(false)}
            />
        </>
    )
}