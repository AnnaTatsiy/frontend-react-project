import CoachesList from "../coaches/coachesList";
import LimitedPriceLists from "../limitedPriceLists/limitedPriceLists";
import {useState} from "react";
import {Col, Nav, NavItem, Row, Tab, Tabs} from "react-bootstrap";
import Footer from "../footers/footer.jsx";
import useWindowSize from "../../helpers/useWindowSize.js";

export default function ForCoaches({dataList, dispatch}) {

    const size = useWindowSize();

    const [key, setKey] = useState('coaches');

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
                                        <Nav.Link eventKey="first">Тренеры</Nav.Link>
                                    </NavItem>
                                    <NavItem>
                                        <Nav.Link eventKey="second">Прайс на тренировки</Nav.Link>
                                    </NavItem>
                                </Nav>
                            </Row>
                            <Row>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first"><CoachesList dispatch={dispatch} dataList={dataList}/></Tab.Pane>
                                    <Tab.Pane eventKey="second"><LimitedPriceLists dispatch={dispatch} dataList={dataList}/></Tab.Pane>
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
                            <Tab eventKey="coaches" title="Тренеры">
                                <CoachesList dispatch={dispatch} dataList={dataList}/>
                            </Tab>
                            <Tab eventKey="price" title="Прайс на тренировки">
                                <LimitedPriceLists dispatch={dispatch} dataList={dataList}/>
                            </Tab>
                        </Tabs>
                    }
                </div>
            </div>
            <Footer/>
        </>
    )

}
