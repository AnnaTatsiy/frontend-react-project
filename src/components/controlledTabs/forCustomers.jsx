import UnlimitedSubscriptionsList from "../unlimitedSubscriptions/unlimitedSubscriptionsList";
import CustomersList from "../customers/customersList";
import LimitedSubscriptionsList from "../limitedSubscriptions/limitedSubscriptionsList";
import {useState} from "react";
import {Col, Nav, NavItem, Row, Tab, Tabs} from "react-bootstrap";
import Footer from "../footers/footer.jsx";
import useWindowSize from "../../helpers/useWindowSize.js";

export default function ForCustomers({dataListCustomers, dataListCoaches, dispatch}) {

    const size = useWindowSize();
    const [key, setKey] = useState('customers');

    return (
        <>
            <div className="container mt-2">
                <div className="my-3 p-3 bg-body rounded shadow-sm min-height-container">
                    {(size.width < 770) ?
                        <Tab.Container
                            id="left-tabs-example" defaultActiveKey="first">
                            <Col>
                                <Row className={"m-1"}>
                                    <Nav variant="pills" className="flex-column">
                                        <NavItem>
                                            <Nav.Link eventKey="first">Клиенты</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="second">Абонементы</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="thirth">Тренировки с тренерами</Nav.Link>
                                        </NavItem>
                                    </Nav>
                                </Row>
                                <Row>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first"><CustomersList dispatch={dispatch} dataList={dataListCustomers}/></Tab.Pane>
                                        <Tab.Pane eventKey="second"><UnlimitedSubscriptionsList dispatch={dispatch} dataList={dataListCustomers} coaches={dataListCoaches}/></Tab.Pane>
                                        <Tab.Pane eventKey="thirth"><LimitedSubscriptionsList dispatch={dispatch} dataList={dataListCustomers}
                                                                                              coaches={dataListCoaches}/></Tab.Pane>
                                    </Tab.Content>
                                </Row>
                            </Col>
                        </Tab.Container> :
                    <Tabs
                        id="controlled-tab"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="customers" title="Клиенты">
                            <CustomersList dispatch={dispatch} dataList={dataListCustomers}/>
                        </Tab>
                        <Tab eventKey="subscriptions" title="Абонементы">
                            <UnlimitedSubscriptionsList dispatch={dispatch} dataList={dataListCustomers}
                                                        coaches={dataListCoaches}/>
                        </Tab>
                        <Tab eventKey="workouts" title="Тренировки с тренерами">
                            <LimitedSubscriptionsList dispatch={dispatch} dataList={dataListCustomers}
                                                      coaches={dataListCoaches}/>
                        </Tab>

                    </Tabs>}
                </div>
            </div>

            <Footer/> </>
    )
}