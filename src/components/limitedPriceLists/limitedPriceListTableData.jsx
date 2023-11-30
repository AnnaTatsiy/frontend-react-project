
export default function LimitedPriceListTableData({price}){
    return (
        <>
            <tr>
                <td data-label={'ФИО тренера'}>{price.coach.surname} {price.coach.name} {price.coach.patronymic}</td>
                <td data-label={'Кол-во тренировок'}>{price.amount_workout}</td>
                <td className={'mb-3'} data-label={'Стоимость'}>{price.price}</td>
            </tr>
        </>
    )
}