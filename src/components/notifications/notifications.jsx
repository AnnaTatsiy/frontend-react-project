import Footer from "../footers/footer.jsx";
import Notification from "./notification.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {allMarkAsRead, getAllNotifications, getUnreadNotifications} from "../../actions/notifications/action.jsx";
import {Button} from "react-bootstrap";
import UnreadNotification from "./unreadNotification.jsx";

export default function Notifications() {

    const dispatch = useDispatch();

    const unreadNotifications = useSelector(state => state.notifications.unreadNotifications);
    const notifications = useSelector(state => state.notifications.allNotifications)

    useEffect(() => {
        dispatch(getAllNotifications());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUnreadNotifications())
    }, [dispatch]);

    // отметить все как прочитанное
    const onClick = (e) => {
        e.preventDefault()
        dispatch(allMarkAsRead())
    }

    const labelBuilder = (length) => {
        switch (true) {
            case (length === 1 || (length % 10 === 1)):
                return `${length} непрочитанное уведомление`;
            default:
                return `${length} непрочитанных уведомлений`;
        }
    }

    return (
        <>
            <div className="container mt-5">

                {(unreadNotifications.length > 0) &&
                    <div className="d-flex align-items-center p-3 my-3 text-white bg-primary rounded shadow-sm">
                        <div className="lh-1">
                            <h1 className="h6 mb-0 text-white lh-1">
                                {`У вас ${labelBuilder(unreadNotifications.length)}`}
                            </h1>
                        </div>
                    </div>}

                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    {(unreadNotifications.length > 0) ? <>
                        <h6 className="border-bottom pb-2 mb-0">Не прочитанные:</h6>

                        {(unreadNotifications.length > 5) ? <>
                            <div className={"scrollbar scrollbar-primary"}>
                                <div className={"force-overflow"}>
                                    {unreadNotifications.map((n) => (
                                        <UnreadNotification key={n.id} notification={n}/>
                                    ))}
                                </div>
                            </div>
                        </> : <>
                            {unreadNotifications.map((n) => (
                                <UnreadNotification key={n.id} notification={n}/>
                            ))}
                        </>}

                        <small className="d-block text-end mt-3">
                            <Button onClick={(e) => onClick(e)} className={"btn-sm"} variant={"primary"}>Отметить
                                все как прочитанное</Button>
                        </small>

                    </> : <p className={"m-2 text-secondary"}>Нет новых уведомлений</p>}
                </div>


                <div className="my-4 p-3 bg-body rounded shadow-sm">
                    {(notifications.length > 0) ? <>
                        <h6 className="border-bottom pb-2 mb-0">Все уведомления:</h6>

                        {(notifications.length > 5) ? <>
                            <div className={"scrollbar scrollbar-primary"}>
                                <div className={"force-overflow"}>
                                    {notifications.length !== 0 &&
                                        notifications.map((n) => (
                                            <Notification key={n.id} notification={n}/>
                                        ))}
                                </div>
                            </div>
                        </> : <>   {notifications.map((n) => (
                            <Notification key={n.id} notification={n}/>
                        ))}
                        </>}

                    </> : <p className={"m-2 text-secondary"}>У вас пока нет уведомлений</p>}

                </div>
            </div>
            <Footer/>
        </>
    );
}