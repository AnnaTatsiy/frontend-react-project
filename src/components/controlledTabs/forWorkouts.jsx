import {useState} from "react";
import {Col, Nav, NavItem, Row, Tab, Tabs} from "react-bootstrap";
import GroupWorkoutsList from "../groupWorkouts/groupWorkoutsList";
import SignUpPersonalWorkoutsList from "../signUpPersonalWorkouts/signUpPersonalWorkoutsList";
import Footer from "../footers/footer.jsx";
import useWindowSize from "../../helpers/useWindowSize.js";
import CoachesList from "../coaches/coachesList.jsx";
import LimitedPriceLists from "../limitedPriceLists/limitedPriceLists.jsx";

export default function ForWorkouts({dataListCustomers, dataListCoaches}) {

    const size = useWindowSize();
    const [key, setKey] = useState('group');

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
                                            <Nav.Link eventKey="first">Групповые тренировки</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="second">Персональные тренировки</Nav.Link>
                                        </NavItem>
                                    </Nav>
                                </Row>
                                <Row>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first"><GroupWorkoutsList dataListCustomers={dataListCustomers} dataListCoaches={dataListCoaches}/></Tab.Pane>
                                        <Tab.Pane eventKey="second"><SignUpPersonalWorkoutsList dataListCustomers={dataListCustomers}
                                                                                                 dataListCoaches={dataListCoaches}/></Tab.Pane>
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
                        <Tab eventKey="group" title="Групповые тренировки">
                            <GroupWorkoutsList dataListCustomers={dataListCustomers} dataListCoaches={dataListCoaches}/>
                        </Tab>
                        <Tab eventKey="personal" title="Персональные тренировки">
                            <SignUpPersonalWorkoutsList dataListCustomers={dataListCustomers}
                                                        dataListCoaches={dataListCoaches}/>
                        </Tab>
                    </Tabs>
                    }
                </div>
            </div>
            <Footer/>
        </>)
}