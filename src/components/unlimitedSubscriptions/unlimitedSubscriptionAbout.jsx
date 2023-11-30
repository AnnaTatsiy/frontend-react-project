import {Alert} from "react-bootstrap";
import useCustomerContext from "../context/customerContext.jsx";


export default function UnlimitedSubscriptionAbout(){

    const {subscription} = useCustomerContext();

    const date = (subscription) ? new Date(subscription.open).setMonth(new Date(subscription.open).getMonth() + subscription.unlimited_price_list.validity_period) : new Date()
    const setStyle = date >= new Date() ? "success" : "danger";

    return (
        <>
            {subscription && <Alert className={"min-height"} variant={setStyle}>
                <Alert.Heading><span className={"ms-3 fs-6"}><b>Об абонементе:</b></span></Alert.Heading>
                <p>
                    <ul className={"list-style-none m-1 fs-6"}>
                        <li>Дата оформления: <b>{new Date(subscription.open).toLocaleString().slice(0,10)}</b></li>
                        <li>Период действия: <b>{subscription.unlimited_price_list.validity_period} мес.</b></li>
                        <li>
                            <ul className={"m-1 fs-6"}>
                                <li>Тариф: <b>{subscription.unlimited_price_list.subscription_type.title}</b></li>
                                <li>SPA: <b>{subscription.unlimited_price_list.subscription_type.spa === 0 ? "Нет" : "Да"}</b></li>
                                <li>Бассейн: <b>{subscription.unlimited_price_list.subscription_type.pool === 0 ? "Нет" : "Да"}</b></li>
                                <li>Групповые тренировки: <b>{subscription.unlimited_price_list.subscription_type.group === 0 ? "Нет" : "Да"}</b></li>
                            </ul>
                        </li>
                    </ul>
                </p>
                <hr />
                <p className="mb-0 ms-1 fs-6">
                    <b>{ setStyle === "success" ? `Абонемент еще активен, срок активности абонемента истекает ${new Date(date).toLocaleString().slice(0,10)}` : "У абонемента истек срок действия!"}</b>
                </p>
            </Alert>}
        </>
        );
}