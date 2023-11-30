import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {editCustomer, validateCustomer} from "../../actions/customers/action";
import {useDispatch} from "react-redux";
import store from "../../main.jsx";
import UnlimitedSubscriptionFormModalWithAddCustomer
    from "../unlimitedSubscriptions/unlimitedSubscriptionFormModalWithAddCustomer.jsx";

// компонент для добавления/редактирования клиента в модальном окне
export default function CustomerFormModal(props) {

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");

    const [data, setData] = useState(null);
    const [customer, setCustomer] = useState(null);

    let [formModalShowSub, setFormModalShowSub] = useState(false);

    // методы для управления формой
    const {handleSubmit, register, reset, formState: {errors}} = useForm();

    useEffect(() => {

        setError("");
        setStatus(null)

        if (props.add || props.customer == null) {
            reset({
                id: 0,
                isAdd: true,
                surname: '',
                name: '',
                patronymic: '',
                passport: '',
                birth: '',
                mail: '',
                number: '',
                registration: ''
            })
        } else {
            reset({
                id: props.customer.id,
                isAdd: false,
                surname: props.customer.surname,
                name: props.customer.name,
                patronymic: props.customer.patronymic,
                passport: props.customer.passport,
                birth: props.customer.birth,
                mail: props.customer.user.email,
                number: props.customer.number,
                registration: props.customer.registration
            })
        }

    }, [props.add, props.customer, props.show, reset]);

    useEffect( () => {

        if(status === "success"){

            setError("");
            setStatus(null)

            reset()
            props.onHide()

            if(props.add) {
                setFormModalShowSub(true);
                setCustomer(data);

                console.log(data)
            }
        }

    },[props, reset, status])

    const sendRequest = async () => {
        const state = store.getState();
        const errors  = state.customers.errors;
        const status  = state.customers.status;

        await setError(errors);
        await setStatus(status);
    };

    // отправка данных на сервер
    async function submitCustomerForm(data) {
        (data.id === 0) ? await dispatch(validateCustomer(data)) : await dispatch(editCustomer(data))

        setData(data);
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
                    {props.add === 'true' ? "Добавление" : "Редактирование"} клиента
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(submitCustomerForm)}>
                    <FormControl
                        {...register('id')}
                        type="number"
                        hidden={true}/>

                    <Form.Group controlId={"surname"}>
                        <FloatingLabel label={"Фамилия:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("surname", {

                                    required: {
                                        value: true,
                                        message: "Фамилия клиента должна быть указана!"
                                    },

                                    maxLength: {
                                        value: 50,
                                        message: "Фамилия клиента не может быть длинее 50 символов!"
                                    },

                                    minLength: {
                                        value: 2,
                                        message: "Фамилия клиента не может состоять из 1 символа!"
                                    },

                                    pattern: {
                                        value: /^[А-Я][а-я]+/g,
                                        message: "Фамилия должна содержать только кириллицу и начинаться с заглавной буквы!"
                                    }

                                })}
                                isInvalid={!!errors.surname}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.surname?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"name"}>
                        <FloatingLabel label={"Имя:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Имя клиента должно быть указано!"
                                    },

                                    maxLength: {
                                        value: 50,
                                        message: "Имя клиента не может быть длинее 50 символов!"
                                    },

                                    minLength: {
                                        value: 2,
                                        message: "Имя клиента не может состоять из 1 символа!"
                                    },

                                    pattern: {
                                        value: /^[А-Я][а-я]+/g,
                                        message: "Имя должно содержать только кириллицу и начинаться с заглавной буквы!"
                                    }
                                })}
                                isInvalid={!!errors.name}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.name?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"patronymic"}>
                        <FloatingLabel label={"Отчество:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("patronymic", {
                                    required: {
                                        value: true,
                                        message: "Отчество клиента должно быть указано!"
                                    },

                                    maxLength: {
                                        value: 50,
                                        message: "Отчество клиента не может быть длиннее 50 символов!"
                                    },

                                    minLength: {
                                        value: 2,
                                        message: "Отчество клиента не может состоять из 1 символа!"
                                    },

                                    pattern: {
                                        value: /^[А-Я][а-я]+/g,
                                        message: "Отчество должно содержать только кириллицу и начинаться с заглавной буквы!"
                                    }
                                })}
                                isInvalid={!!errors.patronymic}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.patronymic?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"passport"} className="mb-3">
                        <FloatingLabel label={"Номер и серия паспорта:"} >
                            <FormControl
                                type="text"
                                {...register("passport", {
                                    required: {
                                        value: true,
                                        message: "Номер и серия паспорта клиента должны быть указаны!"
                                    },

                                    maxLength: {
                                        value: 10,
                                        message: "Номер и серия паспорта не может быть длиннее 10 символов!"
                                    },

                                    minLength:{
                                        value: 7,
                                        message: "Номер и серия паспорта не может быть короче 7 символов!"
                                    },

                                    pattern: {
                                        value: /^[A-Z0-9_]+$/,
                                        message: "Номер и серия паспорта не может содержать пробельные символы и знаки препинания!"
                                    },

                                })}
                                isInvalid={!!errors.passport}
                                onChange={() => setVisible(false)}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.passport?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="ms-1 error-text-size">
                            {status === "failed" && visible  && !errors?.passport?.message ? (
                                <div className={"text-danger"}>
                                    {error.passport}
                                </div> ) : ""}
                        </div>

                    </Form.Group>

                    <Form.Group controlId={"birth"}>
                        <FloatingLabel label={"Дата рождения:"} className="mb-3">
                            <FormControl
                                type="date"
                                {...register("birth", {
                                    required: {
                                        value: true,
                                        message: "Дата рождения клиента должна быть указана!"
                                    },

                                    validate: {
                                        positive: (v) => new Date(v) < (new Date(new Date().getFullYear() - 14, new Date().getMonth(), new Date().getDate())) || 'Клиенту должно исполниться 14 лет!',
                                        lessThanTen: (v) => new Date(v) > (new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())) || 'Клиент должен быть моложе 100 лет!',
                                    }

                                })}
                                isInvalid={!!errors.birth}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.birth?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"mail"} className="mb-3">
                        <FloatingLabel label={"Электронная почта:"}>
                            <FormControl
                                type="text"
                                {...register("mail", {
                                    required: {
                                        value: true,
                                        message: "Электронная почта клиента должна быть указана!"
                                    },

                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Некорректный email адрес!"
                                    },
                                })}
                                isInvalid={!!errors.mail}
                                onChange={() => setVisible(false)}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.mail?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="ms-1 error-text-size">
                            {status === "failed" && visible  && !errors?.mail?.message ? (
                                <div className={"text-danger"}>
                                    {error.mail}
                                </div> ) : ""}
                        </div>

                    </Form.Group>

                    <Form.Group controlId={"number"} className="mb-3">
                        <FloatingLabel label={"Номер телефона:"}>
                            <FormControl
                                type="text"
                                {...register("number", {
                                    required: {
                                        value: true,
                                        message: "Номер телефона тренера должен быть указан!"
                                    },

                                    pattern: {
                                        value: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
                                        message: "Некорректный номер телефона!"
                                    },

                                })}
                                isInvalid={!!errors.number}
                                onChange={() => setVisible(false)}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.number?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="ms-1 error-text-size">
                            {status === "failed" && visible  && !errors?.number?.message ? (
                                <span className={"text-danger"}>
                                    {error.number}
                                </span> ) : ""}
                        </div>

                    </Form.Group>

                    <Form.Group controlId={"registration"}>
                        <FloatingLabel label={"Место проживания:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("registration", {
                                    required: {
                                        value: true,
                                        message: "Место проживания клиента должно быть указано!"
                                    },

                                    maxLength: {
                                        value: 250,
                                        message: "Место проживания клиента не может быть длинее 250 символов!"
                                    },

                                    minLength: {
                                        value: 15,
                                        message: "Место проживания клиента не может быть короче 15 символов!"
                                    }
                                })}
                                isInvalid={!!errors.registration}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.registration?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Row className="mt-3 mb-2">
                        <Button className="mx-auto col-4" variant="success"
                                type="submit"> {props.add === 'true' ? "Добавить" : "Сброс пароля"}</Button>
                    </Row>

                </Form>
            </Modal.Body>

        </Modal>

        <UnlimitedSubscriptionFormModalWithAddCustomer
            show={formModalShowSub}
            customer={customer}
            onHide={() => setFormModalShowSub(false)}
        />
    </>)
}