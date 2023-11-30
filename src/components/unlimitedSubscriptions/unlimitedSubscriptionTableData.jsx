
export default function UnlimitedSubscriptionTableData({sub}){

    return (
        <>
            <tr>
                <td data-label={'ФИО клиента'}>{sub.customer.surname} {sub.customer.name} {sub.customer.patronymic}</td>
                <td data-label={'Тип абонемента'}>{sub.unlimited_price_list.subscription_type.title}</td>
                <td data-label={'Период действия'}>{sub.unlimited_price_list.validity_period} мес.</td>
                <td data-label={'Дата открытия'} className={"mb-3"}>{new Date(sub.open).toLocaleDateString()}</td>
            </tr>
        </>
    )
}