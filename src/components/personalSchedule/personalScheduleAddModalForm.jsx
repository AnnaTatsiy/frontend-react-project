import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import store from '../../main.jsx';
import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addPersonalSchedule} from "../../actions/PersonalSchedules/action.jsx";

export default function PersonalScheduleAddModalForm(props) {

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");

    // методы для управления формой
    const {handleSubmit, register, reset, formState: {errors}} = useForm();

    useEffect(() => {

        setError("");
        setStatus(null)

        reset({
            time: ''
        })

    }, [props.show, reset]);

    useEffect(() => {

        if (status === "success") {

            setError("");
            setStatus(null)

            reset()
            props.onHide()
        }

    }, [props, reset, status])

    const sendRequest = async () => {
        const state = store.getState();
        const errors  = state.personalSchedule.errors;
        const status  = state.personalSchedule.status;

        await setError(errors);
        await setStatus(status);
    };

    // отправка данных на сервер
    async function submitCoachForm(data) {
        await dispatch(addPersonalSchedule(data))

        await sendRequest();
        setVisible(true);
    }

    return (<>
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление тренировки
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(submitCoachForm)}>

                    <FormControl
                        {...register('day')}
                        type="number"
                        value={props.day}
                        hidden={true}/>

                    <Form.Group controlId={"time"} className={"m-3 mb-4"}>
                        <FloatingLabel label={"Время начала тренировки:"}>
                            <FormControl
                                type="time"
                                {...register("time", {
                                    required: {
                                        value: true,
                                        message: "Поле обязательно к заполнению!"
                                    },
                                })}
                                isInvalid={!!errors.time}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.time?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="ms-1 error-text-size">
                            {status === "failed" && visible && !errors?.time?.message ? (
                                <div className={"text-danger"}>
                                    {(error.time) !== '' ? error.time : error.workouts}
                                </div>) : ""}
                        </div>

                    </Form.Group>


                    <Row className="mt-3 mb-2">
                        <Button className="mx-auto col-sm-4 btn-sm" variant="success"
                                type="submit">Добавить</Button>
                    </Row>

                </Form>
            </Modal.Body>

        </Modal>
    </>);
}