export default function SignUpGroupWorkoutTableData({item}){
    return (
        <tr>
            <td data-label={"Паспорт"}>{item.customer.passport}</td>
            <td data-label={"ФИО клиента"}>{item.customer.name.slice(0, 1)}. {item.customer.patronymic.slice(0, 1)}. {item.customer.surname}</td>
            <td data-label={"Номер телефона"}>{item.customer.number}</td>
            <td data-label={"Эл. почта"} className={"mb-3"}>{item.customer.user.email}</td>
        </tr>
    )
}