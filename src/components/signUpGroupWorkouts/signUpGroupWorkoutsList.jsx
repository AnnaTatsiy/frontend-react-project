import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSignUpGroupWorkoutsById} from "../../actions/signUpGroupWorkouts/action";
import {Alert, Table} from "react-bootstrap";
import SignUpGroupWorkoutTableData from "./signUpGroupWorkoutTableData";

export default function SignUpGroupWorkoutsList({id}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSignUpGroupWorkoutsById(id));
    }, [dispatch, id])

    const customers = useSelector(state => state.signUpGroupWorkouts.list)

    return (customers.length !== 0) ? (
        <>
            <p className={"mt-4 ms-1"}>Клиенты записанные на тренировку:</p>

            <Table>
                <thead>
                <tr>
                    <th>Паспорт</th>
                    <th>ФИО клиента</th>
                    <th>Номер телефона</th>
                    <th>Эл. почта</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((item) => (
                    <SignUpGroupWorkoutTableData key={item.id} item={item}/>
                ))}
                </tbody>
            </Table>

            <div className={"d-flex justify-content-end"}>
                <p className={"fs-6"}>Общее количество клиентов записанных на тренировку: <b>{customers.length}</b></p>
            </div>
        </>
    ) : (

        <Alert variant="warning">
            <Alert.Heading className={"fs-5"}>Предупреждение!</Alert.Heading>
            <p className={"fs-6"}>
                Еще нет клиентов, которые были записаны на групповую тренировку!
            </p>
        </Alert>)

}