import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";
import {addCustomer} from "../../actions/customers/action.jsx";
export default function UnlimitedSubscriptionFormModalWithAddCustomer(props){

    const dispatch = useDispatch();

    const {handleSubmit
        , register
        , reset
        , formState: {errors}} = useForm();

    useEffect( () => {

        if (props.customer == null) {
            reset({
                surname: '',
                name: '',
                patronymic: '',
                passport: '',
                birth: '',
                mail: '',
                number: '',
                registration: '',
                subscription_type: 0,
                validity_period: 0
            })
        } else {
            reset({
                surname: props.customer.surname,
                name: props.customer.name,
                patronymic: props.customer.patronymic,
                passport: props.customer.passport,
                birth: props.customer.birth,
                mail: props.customer.mail,
                number: props.customer.number,
                registration: props.customer.registration,
                subscription_type: 0,
                validity_period: 0
            })
        }
    },[props.show, reset])

    // отправка данных на сервер
    async function submitForm(data) {

        console.log(data)
        dispatch(addCustomer(data))

        reset()
        props.onHide()
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

                        <FormControl
                            {...register('surname')}
                            hidden={true}/>

                        <FormControl
                            {...register('name')}
                            hidden={true}/>

                        <FormControl
                            {...register('patronymic')}
                            hidden={true}/>

                        <FormControl
                            {...register('passport')}
                            hidden={true}/>

                        <FormControl
                            {...register('birth')}
                            type="date"
                            hidden={true}/>

                        <FormControl
                            {...register('mail')}
                            hidden={true}/>

                        <FormControl
                            {...register('number')}
                            hidden={true}/>

                        <FormControl
                            {...register('registration')}
                            hidden={true}/>

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