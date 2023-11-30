import useAuthContext from "./context/authContext.jsx";
import Image from "./image.jsx";
import Footer from "./footers/footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";


export default function Settings() {

    const coach = useSelector(state => state.coaches.authCoach);

    // признак доступна ли продажа абонементов
    const [sale, setSale] = useState(true);

    useEffect(() => {
        setSale((coach) ? coach.sale : true)
    }, [coach])

    const {getImage, user} = useAuthContext();

    const [lo, setLo] = useState(null);
    const [hi, setHi] = useState(null);

    const [error, setError] = useState("");
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    const onClick = (e) => {
        e.preventDefault();

        axios.get("http://127.0.0.1:8000/api/coach/change-sale", {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setSale(response.data.sale)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append("lo", lo);
        data.append("hi", hi);

        if (data.get('lo') === '' || data.get('hi') === '') {
            data.append("lo", null);
            data.append("hi", null);
        }

        axios.post("http://127.0.0.1:8000/api/coach/edit-limited-price", data, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setStatus(response.data.status);
                    setError(response.data.errors);
                    setMessage(response.data.message);

                    setTimeout(() => {
                        setStatus(null);
                        setError("");
                        setMessage("");
                    }, 100000);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (<>
        <div className="container mt-5">
            <div className="my-3 p-3 bg-body rounded shadow-sm min-height-container">
                <div className={"max-width-input m-auto"}>
                    <Image getImage={getImage}/>
                    {user.role === 'coach' && <div className={"ms-auto mb-3"}>

                        <form onSubmit={submitHandler} id="form">

                            <p className={"fs-6 mt-4"}>Выбрать стоимость абонемента:</p>

                            <div className="row g-2">
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="number" name={"lo"} onChange={(e) => {
                                            setLo(e.target.value)
                                        }} className="form-control form-control-sm" id="floatingInputGrid01"/>
                                        <label htmlFor="floatingInputGrid01">Стоимость 8 посещений</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="number" name={"hi"} onChange={(e) => {
                                            setHi(e.target.value)
                                        }} className="form-control form-control-sm" id="floatingInputGrid02"/>

                                        <label htmlFor="floatingInputGrid02">Стоимость 12 посещений</label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 ms-1 fs-6">
                                {status === "success" ? (
                                    <div className={"text-success"}>
                                        {message}
                                    </div>
                                ) : status === "failed" ? (
                                    <div className={"text-danger"}>
                                        {error}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className={"d-flex justify-content-end mt-3"}>
                                <button type="submit" className="btn btn-success btn-sm">
                                    Отправить
                                </button>
                            </div>
                        </form>

                            <div className="mt-5 mb-2">
                                <div className="row">
                                    <div className="col-10"><label className="form-check-label"
                                                                htmlFor="flexSwitchCheck">Продажа
                                        абонементов {sale ? 'разрешена' : 'запрещена'}</label></div>
                                    <div className="col">

                                        <div className={"d-flex justify-content-end"}>
                                        <input className="form-check-input" checked={sale}
                                                                onClick={onClick} type="checkbox"
                                                                id="flexSwitchCheck"/></div>
                                    </div>

                                </div>
                            </div>
                    </div>
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </>);
}