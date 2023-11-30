import {NavLink, Outlet} from "react-router-dom";
import useAuthContext from "../context/authContext.jsx";
import useCustomerContext from "../context/customerContext.jsx";
import useNotificationsContext from "../context/notificationsContext.jsx";

export default function UserLayouts({user, logout}) {
    const {image} = useAuthContext();
    const {countNotifications} = useNotificationsContext();

    const {subscription, subscriptionLimited, count} = useCustomerContext();

    const style =  `${(countNotifications > 0) ? 'border-danger' : ''} me-2 rounded-circle object-fit-image`

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">

                    <div className="dropdown">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            {image &&
                                <div className="item">
                                    {countNotifications > 0 &&
                                    <span
                                        className="notify-badge position-absolute translate-middle p-1 bg-danger rounded-circle"></span>
                                }
                                    <img src={"http://localhost:8000/users/" + image.path} alt="mdo" width="46"
                                         height="46" className={style}
                                    />
                                </div>
                            }
                            <span className={"text-light"}>{user.name}</span>
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><NavLink className="dropdown-item" to={"/"}>Профиль</NavLink></li>

                            <li><NavLink className="dropdown-item" to={"/notifications"}>
                                <div className="item">
                                    {countNotifications > 0 &&
                                      <span
                                          className="position-absolute mt-1 ms-3 start-100 translate-middle badge
                                          rounded-pill bg-danger">{countNotifications}
                                      </span>
                                    }
                                    Уведомления
                                </div>
                            </NavLink></li>

                            <li><NavLink className="dropdown-item" to={"/settings"}>Настройки</NavLink></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={logout}>Выход</button>
                            </li>
                        </ul>
                    </div>


                    <button className="navbar-toggler p-0 border-0" type="button" data-bs-toggle={'collapse'}
                            id="navbarSideCollapse"
                            data-bs-target={"#navbarsExampleDefault"}
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ms-auto">

                            {((user.role === "customer" && (subscription !== null && subscription.unlimited_price_list.subscription_type.group === 1)) ||
                                ((user.role === "customer" && (subscriptionLimited !== null && subscriptionLimited.open !== undefined)) &&
                                    (user.role === "customer" && count > 0))) ? <>

                                {subscription.unlimited_price_list.subscription_type.group === 1 &&
                                    <li className={"nav-item"}><NavLink to="/get-available-workouts"
                                                                        className="nav-link mx-2 link-light">Групповые
                                        тренировки</NavLink></li>
                                }
                                {(subscriptionLimited !== null && subscriptionLimited.open !== undefined && count > 0) &&
                                    <li className={"nav-item"}><NavLink className="nav-link mx-2 link-light"
                                                                        to={"/get-available-personal-workouts"}>Тренировки
                                        с тренером</NavLink></li>
                                }

                            </> : (user.role === "coach") ? <>
                                <li className={"nav-item"}><NavLink to="get-schedule-edit"
                                                                    className="nav-link mx-2 link-light">Изменить свое
                                    расписание</NavLink></li>
                                <li className={"nav-item"}><NavLink to="schedule" className="nav-link mx-2 link-light">Групповое
                                    расписание</NavLink></li>
                            </> : <></>}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="p-4"></div>

            <Outlet/>
        </>
    );
}