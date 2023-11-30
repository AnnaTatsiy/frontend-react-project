import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";

export default function PersonalScheduleForEditAddModalForm(props){

    // методы для управления формой
    const {handleSubmit, register, reset, formState: {errors}} = useForm();

    useEffect(() => {
        reset({
            time_begin: ''
        })
    }, [props.show, reset]);

    //Прибавить 1 час 30 минут ко времени
    function addMinutes(time) {
        const date = new Date(`2023-09-23T${time}:00`)
        return new Date(date.getTime() + 90*60000);
    }

    function validateByRange(value){
        const date = new Date(`2023-09-23T${value}:00`)
        const lo = new Date(`2023-09-23T06:00:00`)
        const hi = new Date(`2023-09-23T22:00:00`)

        return !(date < lo || date >= hi || addMinutes(value) > hi);
    }

    function validateByAnotherWorkout(value){
        let result = true;
        const date = new Date(`2023-09-23T${value}:00`)
        const incDate = addMinutes(value);

        const arr = props.workouts.filter(w => w.day_id === props.day)

        for (const w of arr) {
            let workout =  new Date(`2023-09-23T${w.time_begin}`)
            let incWorkout =  new Date(workout.getTime() + 90*60000);

            if(!((incDate <= workout) || (date >= incWorkout))){
                result = false;
                break;
            }
        }

        return result;
    }

    function submitForm(data){
        data.day_id = props.day
        props.workouts.push(data)
        reset();
        props.onHide()

        console.log('submit')
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
                <Form onSubmit={handleSubmit(submitForm)}>

                    <FormControl
                        {...register('id')}
                        type="number"
                        value={Math.random() * (100000 - 90000) + 90000}
                        hidden={true}/>

                    <FormControl
                        {...register('day_id')}
                        type="number"
                        value={props.day}
                        hidden={true}/>

                    <Form.Group controlId={"time_begin"} className={"m-3 mb-4"}>
                        <FloatingLabel label={"Время начала тренировки:"}>
                            <FormControl
                                type="time"
                                {...register("time_begin", {
                                    required: {
                                        value: true,
                                        message: "Поле обязательно к заполнению!"
                                    },

                                    validate:{
                                        positive: (v) => validateByRange(v) || 'Индивидуальные тренировки проходят с 6:00 утра до 22:00 вечера',
                                        lessThanTen: (v) =>  validateByAnotherWorkout(v) || 'Индивидуальные тренировки не могут пересекаться друг с другом',
                                    },

                                })}
                                isInvalid={!!errors.time_begin}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.time_begin?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>


                    <Row className="mt-3 mb-2">
                        <Button className="mx-auto col-sm-4" variant="success"
                                type="submit">Добавить</Button>
                    </Row>

                </Form>
            </Modal.Body>

        </Modal>
    </>);
}