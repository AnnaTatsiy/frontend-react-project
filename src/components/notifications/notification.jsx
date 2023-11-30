
export default function Notification({notification}){

    return (
        <div className="d-flex text-body-secondary pt-3">
            <img src={"http://localhost:8000/users/" + notification.sender.image} alt="mdo" width="46"
                 height="46" className="mt-1 me-2 rounded-circle object-fit-image"/>
            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                    <strong className="text-gray-dark">{notification.sender.fullName}</strong>
                </div>
                <span className="d-block">{notification.message}</span>
                <small className="form-text">{new Date(notification.created_at).toLocaleString()}</small>
            </div>
        </div>
    );
}