// компонент подвала
import {ToastContainer} from "react-toastify";
// <ToastContainer position="bottom-right" theme="dark"/>
export default function Footer() {
    return (
        <>
            <ToastContainer position="bottom-right" theme="dark"/>
            <div className="b-example-divider"></div>

            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                        </a>
                        <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2023 SportClub</span>
                    </div>
                </footer>
            </div>
        </>
    )
}