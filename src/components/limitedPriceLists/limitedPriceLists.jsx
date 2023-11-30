import {useEffect, useState} from "react";
import {getAllLimitedPriceLists, getLimitedPriceLists} from "../../actions/limitedPriceLists/action";
import {Table} from "react-bootstrap";
import CoachOption from "../coaches/coachOption";
import LimitedPriceListTableData from "./limitedPriceListTableData";
import MyPaginate from "../paginate";
import {useSelector} from "react-redux";

export default function LimitedPriceLists({dispatch, dataList}){

    // текущая страница
    const [page, setPage] = useState(1);

    // вызов ф-ии получения прайс-листа от сервера
    useEffect(() => {
        dispatch(getLimitedPriceLists(page));
    }, [dispatch, page])

    useEffect(() => {
        dispatch(getAllLimitedPriceLists())
    }, [dispatch])

    const prices = useSelector(state => state.limitedPriceLists.list);
    const fullPriceLists = useSelector(state => state.limitedPriceLists.fullList);

    //номер последней страницы
    const lastPage = useSelector(state => state.limitedPriceLists.lastPage);

    // состояние для фильтрации
    const [searchValue, setSearchValue] = useState('');

    // список отфильтрованных прайс-листов по серии-номеру паспорта тренера
    const filteredPrices = fullPriceLists.filter(price =>
        price.coach.passport.includes(searchValue)
    );

    //проверка отобразить всех или по критерию поиска
    const viewPrices = ((searchValue.length !== 0) ? filteredPrices : prices);

    return (
        <>
                <div className={"row mt-3 mb-3 max-width-form-control"}>
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
                        <label htmlFor="exampleDataList" className="font-size-alert form-label p-3 text-secondary">ФИО или серия-номер
                            паспорта:</label>
                    </div>
                </div>

            {(viewPrices.length !== 0) ? <>
            <Table>
                <thead>
                <tr>
                    <th>ФИО тренера</th>
                    <th>Кол-во тренировок</th>
                    <th>Стоимость</th>
                </tr>
                </thead>
                <tbody>
                {viewPrices.map((item) => (
                    <LimitedPriceListTableData key={item.id} price={item}/>
                ))}
                </tbody>
            </Table>

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            /> </> : <p className={"ms-1 text-dark"}>По вашему запросу ничего не найдено</p>  }
        </>
    )
}