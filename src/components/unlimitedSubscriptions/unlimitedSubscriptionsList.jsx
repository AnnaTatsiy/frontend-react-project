import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUnlimitedSubscriptions, getUnlimitedSubscriptions} from "../../actions/unlimitedSubscriptions/action";
import {Button, Col, Table} from "react-bootstrap";
import CustomerOption from "../customers/customerOption";
import UnlimitedSubscriptionTableData from "./unlimitedSubscriptionTableData";
import UnlimitedSubscriptionFormModal from "./unlimitedSubscriptionFormModal";
import MyPaginate from "../paginate";

export default function UnlimitedSubscriptionsList({dispatch, dataList, coaches}){

    // текущая страница
    const [page, setPage] = useState(1);

    // абонементы
    const subscriptions = useSelector(state => state.unlimitedSubscription.list);
    const fullLists = useSelector(state => state.unlimitedSubscription.fullList);

    // вызов ф-ии получения списка абонементов от сервера
    useEffect(() => {
        dispatch(getUnlimitedSubscriptions(page));
    }, [dispatch, page])

    useEffect(() => {
        dispatch(getAllUnlimitedSubscriptions())
    }, [dispatch])

    //номер последней страницы
    const lastPage = useSelector(state => state.unlimitedSubscription.lastPage);

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

                <div className={"d-flex justify-content-end mt-3"}>
                    <Button variant={"success"} className={"btn-sm"} onClick={() => {
                        setFormModalShow(true);
                    }}>Оформить абонемент</Button>

                </div>

            </Col>

            {viewSubscriptions.length !== 0 ? <>
            <Table className={"mt-2"}>
                <thead>
                <tr>
                    <th>ФИО клиента</th>
                    <th>Тип абонемента</th>
                    <th>Период действия</th>
                    <th>Дата открытия</th>
                </tr>
                </thead>
                <tbody>
                {viewSubscriptions.map((item) => (
                    <UnlimitedSubscriptionTableData key={item.id} sub={item}/>
                ))}
                </tbody>
            </Table>

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            />        </> : <>
                <p className={"ms-1 text-black"}>По вашему запросу ничего не найдено</p>
            </>}

            <UnlimitedSubscriptionFormModal
                show={formModalShow}
                customers = {dataList}
                coaches = {coaches}
                onHide={() => setFormModalShow(false)}
            />
        </>
    )
}