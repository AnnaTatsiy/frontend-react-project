import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllWorkoutTypes} from "../../actions/workoutTypes/action.jsx";
import {getAllGyms} from "../../actions/gyms/action.jsx";
import CoachOption from "../coaches/coachOption.jsx";
import GymOption from "../gyms/gymOption.jsx";
import WorkoutTypeOption from "../workoutTypes/workoutTypeOption.jsx";
import store from "../../main.jsx";
import {addSchedule, editSchedule} from "../../actions/schedules/action.jsx";
import {getAllCustomers} from "../../actions/customers/action.jsx";

export default function ScheduleFormModal(props){

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");

    const {handleSubmit, register, reset, formState: {errors}} = useForm();

    useEffect(() => {
        dispatch(getAllWorkoutTypes());
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])

    //все тренеры
    const coaches = useSelector(state => state.coaches.dataList);

    const types = useSelector(state => state.workoutTypes.list)

    useEffect(() => {
        dispatch(getAllGyms());
    }, [dispatch])

    const gyms = useSelector(state => state.gyms.list)

    useEffect(() => {

        setError("");
        setStatus(null)

        if (props.add || props.workout == null) {
            reset({
                id: 0,
                isAdd: true,
                day: props.day,
                gym: 1,
                time_begin: '',
                time_end: '',
                coach: '',
                workout_type: 1
            })
        } else {
            reset({
                id: props.workout.id,
                isAdd: false,
                day: props.workout.day_id,
                gym: props.workout.gym_id,
                time_begin: props.workout.time_begin,
                time_end: props.workout.time_end,
                coach: props.workout.coach.passport,
                workout_type: props.workout.workout_type_id
            })
        }

    }, [props.add, props.day, props.show, props.workout, reset]);

    useEffect( () => {

        if(status === "success"){

            setError("");
            setStatus(null)

            reset()
            props.onHide()
        }

    },[props, reset, status])

    const sendRequest = async () => {
        const state = store.getState();
        const errors  = state.schedules.errors;
        const status  = state.schedules.status;

        await setError(errors);
        await setStatus(status);
    };

    async function submitForm(data) {
        (data.id === 0) ? await dispatch(addSchedule(data)) : await dispatch(editSchedule(data))

        await sendRequest();
        setVisible(true);
    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.add === 'true' ? "Добавление" : "Редактирование"} тренировки
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <FormControl
                            {...register('id')}
                            type="number"
                            hidden={true}/>

                        <FormControl
                            {...register('isAdd')}
                            value={props.add}
                            hidden={true}/>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel  label="Выберите день недели">
                                <Form.Select
                                    {...register("day", {
                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    isInvalid={!!errors.day}>
                                    <option value="1">Понедельник</option>
                                    <option value="2">Вторник</option>
                                    <option value="3">Среда</option>
                                    <option value="4">Четверг</option>
                                    <option value="5">Пятница</option>
                                    <option value="6">Суббота</option>
                                    <option value="7">Воскресение</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.day?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId={"time_begin"} className={"mt-3 mb-4"}>
                            <FloatingLabel label={"Время начала тренировки:"}>
                                <FormControl
                                    type="time"
                                    {...register("time_begin", {
                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        },
                                    })}
                                    isInvalid={!!errors.time_begin}>
                                </FormControl>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.time_begin?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>

                            <div className="ms-1 error-text-size">
                                {status === "failed" && visible && !errors?.time_begin?.message ? (
                                    <div className={"text-danger"}>
                                        {error.time_begin}
                                    </div>) : ""}
                            </div>
                        </Form.Group>

                        <Form.Group controlId={"time_end"} className={"mt-3 mb-4"}>
                            <FloatingLabel label={"Время окончания тренировки:"}>
                                <FormControl
                                    type="time"
                                    {...register("time_end", {
                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        },
                                    })}
                                    isInvalid={!!errors.time_end}>
                                </FormControl>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.time_end?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>

                            <div className="ms-1 error-text-size">
                                {status === "failed" && visible && !errors?.time_end?.message ? (
                                    <div className={"text-danger"}>
                                        {error.time_end}
                                    </div>) : ""}
                            </div>
                        </Form.Group>

                        {coaches &&
                        <Form.Group>
                            <div className="form-floating">
                                <Form.Control
                                    {...register("coach", {
                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    isInvalid={!!errors.coach}
                                    type={"text"}
                                    list="datalistOptionsCoaches" id="dataListCoaches"
                                    onChange={() => setVisible(false)}
                                    placeholder="ФИО или серия-номер паспорта тренера"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.coach?.message}
                                </Form.Control.Feedback>
                                <datalist id="datalistOptionsCoaches">
                                    {coaches.map((item) => (
                                        <CoachOption key={item.id} coach={item}/>
                                    ))}
                                </datalist>
                                <label htmlFor="dataListCoaches" className="form-label text-secondary font-size-input-modal-form">ФИО или серия-номер
                                    паспорта тренера:</label>

                                <div className="ms-1 error-text-size">
                                    {status === "failed" && visible  && !errors?.coach?.message ? (
                                        <div className={"text-danger"}>
                                            {(error.coach === '') ? error.workouts_coach : error.coach}
                                        </div> ) : ""}
                                </div>
                            </div>
                        </Form.Group> }

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel label="Спортзал:">
                                <Form.Select
                                    {...register("gym")}
                                    placeholder="Спортзал">
                                    {gyms.map((item) => (
                                        <GymOption  key={item.id} gym={item}/>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>

                            <div className="ms-1 error-text-size">
                                {status === "failed" && visible ? (
                                    <div className={"text-danger"}>
                                        {error.workouts_gym}
                                    </div> ) : ""}
                            </div>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel label="Тип тренировки:">
                                <Form.Select
                                    {...register("workout_type")}
                                    placeholder="Тип тренировки">
                                    {types.map((item) => (
                                        <WorkoutTypeOption  key={item.id} type={item}/>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                        <Row className="mt-4 mb-2">
                            <Button className="mx-auto col-4" variant="success"
                                    type="submit"> {props.add === 'true' ? "Добавить" : "Редактировать"}</Button>
                        </Row>

                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}