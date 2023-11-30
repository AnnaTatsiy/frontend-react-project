
import {NavLink, Outlet} from "react-router-dom";

export default function AdminLayouts({user, logout}) {

    const setActive = ({isActive}) => "nav-link " + (isActive ? "active" : "");

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">SportClub</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className={setActive}>Расписание</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/customers" className={setActive}>Клиенты</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/coaches" className={setActive}>Тренеры</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/group-workouts" className={setActive}>Тренировки</NavLink>
                                {!user &&
                                    <NavLink to={"/login"} className={setActive}>Вход</NavLink>
                                }
                            </li>

                        </ul>
                        <form className="d-flex justify-content-end">
                            {user &&
                                <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                    }} className="btn btn-primary">Выход</button>
                                </div>}
                        </form>
                    </div>
                </div>
            </nav>


            <Outlet/>
        </>
    );
}