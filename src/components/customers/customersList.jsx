import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import CustomerTableData from "./customerTableData";
import {getCustomers} from "../../actions/customers/action";
import {Button, Col, Table} from "react-bootstrap";
import CustomerFormModal from "./customerFormModal.jsx";
import CustomerOption from "./customerOption";
import MyPaginate from "../paginate";

export default function CustomersList({dispatch, dataList}) {

    // текущая страница
    const [page, setPage] = useState(1);

    // вызов ф-ии получения списка клиентов от сервера
    useEffect(() => {
        dispatch(getCustomers(page));
    }, [dispatch, page])

    //клиенты
    const customers = useSelector(state => state.customers.list)

    //номер последней страницы
    const lastPage = useSelector(state => state.customers.lastPage);

    // состояние отображение модального окна
    let [formModalShow, setFormModalShow] = useState(false);

    // состояние режима добавления/редактирования
    const [isAddForm, setIsAddForm] = useState(false);

    //клиент которого будем редактировать
    let customer = useRef(null);

    // состояние для фильтрации клиентов
    const [searchValue, setSearchValue] = useState('');
    const onClickForFormEdit = (id) => {

        setFormModalShow(true);
        setIsAddForm(false);
        customer.current = viewCustomers.filter((item) => item.id === id)[0];
    }

    // найти клиента по паспорту
    const filteredCustomers = dataList.filter(customer =>
        customer.passport.includes(searchValue)
    );

    //проверка отобразить всех или по критерию поиска
    const viewCustomers = ((searchValue.length !== 0) ? filteredCustomers : customers).sort((a, b) => b.updated_at.localeCompare(a.updated_at));

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
                            <label htmlFor="exampleDataList" className="font-size-alert form-label p-3 text-secondary">ФИО
                                или серия-номер
                                паспорта:</label>
                        </div>
                </div>

                <div className={"d-flex justify-content-end mt-3 mb-2"}>
                    <Button variant={"success"} className={"btn-sm"} onClick={() => {
                        setFormModalShow(true);
                        setIsAddForm(true);
                        customer.current = null;
                    }}>Добавить клиента</Button>

                </div>

            </Col>

            {viewCustomers.length !== 0 ? <>

                <Table>
                    <thead>
                    <tr>
                        <th>Паспорт</th>
                        <th>Клиент</th>
                        <th>Телефон</th>
                        <th>Эл. почта</th>
                        <th>Место проживания</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {viewCustomers.map((item) => (
                        <CustomerTableData key={item.id} customer={item} onClick={onClickForFormEdit}/>
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

            <CustomerFormModal
                show={formModalShow}
                add={isAddForm ? 'true' : null}
                customer={customer.current}
                onHide={() => setFormModalShow(false)}
            />

        </>
    )

}

