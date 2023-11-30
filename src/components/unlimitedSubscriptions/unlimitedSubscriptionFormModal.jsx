import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Button, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import CoachOption from "../coaches/coachOption";
import CustomerOption from "../customers/customerOption";
import {useDispatch} from "react-redux";
import store from "../../main.jsx";
import {addUnlimitedSubscription} from "../../actions/unlimitedSubscriptions/action.jsx";

export default function UnlimitedSubscriptionFormModal(props){

    const dispatch = useDispatch();

    const {handleSubmit, register, reset, formState: {errors}} = useForm();

    let [isAddLim, setIsAddLim] = useState(true);

    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");

    useEffect( () => {

        setError("");
        setStatus(null)
        
        reset({
            customer:null,
            subscription_type:0,
            validity_period:0,
            is_add_lim:false,
            coach:null,
            amount_workout:0
        })
    },[props.show, reset])

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
        const errors  = state.unlimitedSubscription.errors;
        const status  = state.unlimitedSubscription.status;

        await setError(errors);
        await setStatus(status);
    };

    // отправка данных на сервер
    async function submitForm(data) {
        await dispatch(addUnlimitedSubscription(data))

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
                        Оформление абонемента
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(submitForm)}>

                        <Form.Group className={"mt-3"}>
                            <div className="form-floating">
                                <Form.Control
                                    {...register("customer", {

                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    isInvalid={!!errors.customer}
                                    type={"text"}
                                    list="datalistOptionsCustomers" id="dataListCustomers"
                                    onChange={() => setVisible(false)}
                                    placeholder="ФИО или серия-номер паспорта клиента"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.customer?.message}
                                </Form.Control.Feedback>
                                <datalist id="datalistOptionsCustomers">
                                    {props.customers.map((item) => (
                                        <CustomerOption key={item.id} customer={item}/>
                                    ))}
                                </datalist>
                                <label htmlFor="dataListCustomers" className="form-label text-secondary font-size-input-modal-form">ФИО или
                                    серия-номер
                                    паспорта клиента:</label>

                                <div className="ms-1 error-text-size">
                                    {status === "failed"  && visible && !errors?.customer?.message ? (
                                        <div className={"text-danger"}>
                                            {error.customer}
                                        </div> ) : ""}
                                </div>

                            </div>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel label="Выберите тип абонемент">
                            <Form.Select
                                {...register("subscription_type", {
                                    required: {
                                        value: true,
                                        message: "Поле обязательно к заполнению!"
                                    }
                                })}
                                isInvalid={!!errors.subscription_type}
                                placeholder="Тип абонемент">
                                <option value="1">Простой</option>
                                <option value="2">Простой+</option>
                                <option value="3">Умный</option>
                                <option value="4">Все включено</option>
                            </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.subscription_type?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel  label="Выберите период действия абонемента">
                                <Form.Select
                                    {...register("validity_period", {
                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    isInvalid={!!errors.validity_period}
                                    placeholder="Период действия абонемента">
                                    <option value="1">1 месяц</option>
                                    <option value="3">3 месяца</option>
                                    <option value="6">6 месяцев</option>
                                    <option value="12">12 месяцев</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.validity_period?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className={"mt-3 ms-1"}>
                        <Form.Check
                            {...register("is_add_lim")}
                            label={`Добавить тренировки с тренером`}
                            checked={isAddLim}
                            onChange={() => setIsAddLim(!isAddLim)}
                        />
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <div className="form-floating">
                                <Form.Control
                                    {...register("coach", {
                                        required: {
                                            value:isAddLim,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    isInvalid={!!errors.coach}
                                    type={"text"}
                                    disabled={!isAddLim}
                                    list="datalistOptionsCoaches" id="dataListCoaches"
                                    onChange={() => setVisible(false)}
                                    placeholder="ФИО или серия-номер паспорта тренера"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.coach?.message}
                                </Form.Control.Feedback>
                                <datalist id="datalistOptionsCoaches">
                                    {props.coaches.map((item) => (
                                        <CoachOption key={item.id} coach={item}/>
                                    ))}
                                </datalist>
                                <label htmlFor="dataListCoaches" className="form-label text-secondary font-size-input-modal-form">ФИО или серия-номер
                                    паспорта тренера:</label>

                                <div className="ms-1 error-text-size">
                                    {status === "failed" && visible  && !errors?.coach?.message ? (
                                        <div className={"text-danger"}>
                                            {error.coach}
                                        </div> ) : ""}
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel label="Выберите количество тренировок в абонементе">
                                <Form.Select
                                    {...register("amount_workout", {
                                        required: {
                                            value: isAddLim,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    disabled={!isAddLim}
                                    isInvalid={!!errors.amount_workout}
                                    placeholder="Количество тренировок в абонементе">
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.amount_workout?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Row className="mt-3 mb-2">
                            <Button className="mx-auto col-4" variant="success"
                                    type="submit">Оформить</Button>
                        </Row>

                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}