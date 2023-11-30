import {Alert} from "react-bootstrap";
import useCustomerContext from "../context/customerContext.jsx";

export default function LimitedSubscriptionAbout() {

    const {subscriptionLimited, count} = useCustomerContext();
    const date = (subscriptionLimited) ? new Date(subscriptionLimited.open).setMonth(new Date(subscriptionLimited.open).getMonth() + 1) : new Date()
    const setStyle = (date >= new Date()) && (count > 0) ? "success" : "danger";

    return (
        <>
            {subscriptionLimited && subscriptionLimited.limited_price_list ? <Alert className={"min-height"} variant={setStyle}>
                <Alert.Heading><span className={"ms-3 fs-6"}><b>Об абонементе с тренером:</b></span></Alert.Heading>
                <p className={"min-height-p"}>
                    <ul className={"list-style-none m-1 fs-6"}>
                        <li>Дата оформления: <b>{new Date(subscriptionLimited.open).toLocaleString().slice(0, 10)}</b></li>
                        <li>Период действия: <b>1 месяц</b></li>
                        <li>Количество тренировок: <b>{subscriptionLimited.limited_price_list.amount_workout}</b></li>
                        <li>Количество оставшихся тренировок: <b>{count}</b></li>
                        <li>Ваш тренер: <b>{subscriptionLimited.limited_price_list.coach.name.slice(0, 1)}. {subscriptionLimited.limited_price_list.coach.patronymic.slice(0, 1)}. {subscriptionLimited.limited_price_list.coach.surname}</b>
                        </li>
                    </ul>
                </p>
                <hr/>
                <p className="mb-0 ms-1 fs-6">
                    <b>{setStyle === "success" ? `Абонемент еще активен, срок активности абонемента истекает ${new Date(date).toLocaleString().slice(0, 10)}` : "У абонемента истек срок действия!"}</b>
                </p>
            </Alert> : <Alert className={"min-height fs-6"} variant={"warning"}>
                <p>
                    У вас пока нет абонемента с тренером.
                    Если для вас это актуально, то обратитесь к администратору для оформления!
                </p>
            </Alert>}
        </>
    );
}