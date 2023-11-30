
export default function LimitedSubscriptionTableData({sub}){

    return (
        <>
            <tr>
                <td data-label={'ФИО клиента'}>{sub.customer.surname} {sub.customer.name} {sub.customer.patronymic}</td>
                <td data-label={'ФИО тренера'}>{sub.limited_price_list.coach.surname} {sub.limited_price_list.coach.name} {sub.limited_price_list.coach.patronymic}</td>
                <td data-label={'Кол-во тренировок'}>{sub.limited_price_list.amount_workout}</td>
                <td data-label={'Дата открытия'} className={"mb-3"}>{new Date(sub.open).toLocaleDateString()}</td>
            </tr>
        </>
    )
}