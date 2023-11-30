import {markAsReadById} from "../../actions/notifications/action.jsx";
import {useDispatch} from "react-redux";
import {Button} from "react-bootstrap";

export default function UnreadNotification({notification}){

    const dispatch = useDispatch();

    // отметить как прочитанное
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(markAsReadById(JSON.stringify({ id: notification.id })))
    }

    return (
        <div className="d-flex text-body-secondary pt-3">
            <img src={"http://localhost:8000/users/" + notification.sender.image} alt="mdo" width="46"
                 height="46" className="mt-2 me-2 rounded-circle object-fit-image"/>
            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                     <strong className="text-gray-dark mt-2">{notification.sender.fullName}</strong>
                    <form onSubmit={handleSubmit}>
                        <Button type={"submit"} variant={"primary"} className={"btn-sm me-2"}>Прочитано</Button>
                    </form>
                </div>
                <span className="d-block">{notification.message}</span>
                <small className="form-text">{new Date(notification.created_at).toLocaleString()}</small>
            </div>
        </div>
    );
}