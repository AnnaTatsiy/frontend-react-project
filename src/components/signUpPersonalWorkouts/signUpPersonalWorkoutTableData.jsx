export default function SignUpPersonalWorkoutTableData({workout}){

    return (
        <>
            <tr>
                <td data-label={'Дата'}>{new Date(workout.date_begin).toLocaleDateString()}</td>
                <td data-label={'Время'}>{workout.schedule.time_begin.slice(0, 5)}</td>
                <td data-label={'Серия-номер тренера'}>{(workout.schedule.coach) ? workout.schedule.coach.passport : "-"}</td>
                <td data-label={'Тренер'}>{(workout.schedule.coach) ? `${workout.schedule.coach.name.slice(0, 1)}. ${workout.schedule.coach.patronymic.slice(0, 1)}. ${workout.schedule.coach.surname}` : "-"}</td>
                <td data-label={'Серия-номер клиента'}>{(workout.customer) ? `${workout.customer.passport}` : "-"}</td>
                <td data-label={'Клиент'} className={"mb-3"}>{(workout.customer) ? `${workout.customer.name.slice(0, 1)}. ${workout.customer.patronymic.slice(0, 1)}. ${workout.customer.surname}`: "-" }</td>
            </tr>
        </>
    )
}