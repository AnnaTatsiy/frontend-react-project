import {Alert, Tab, Tabs} from "react-bootstrap";
import AvailableWorkoutsTableData from "./availableWorkoutsTableData.jsx";
import {useState} from "react";

export default function AvailableWorkoutsTabs({workouts}){
    const [key, setKey] = useState('current');

    return (<>
        {workouts.length !== 0 ? <>
        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-2 mt-3"
        >
            <Tab eventKey="current" title={(workouts[0].event !== undefined) ? new Date(workouts[0].event).toLocaleString().slice(0,10) : ''}>
                <table className={"table mt-3"}>
                    <thead>
                    <tr>
                        <th>День</th>
                        <th>Время</th>
                        <th>Тренер</th>
                        <th>Тип</th>
                        <th>Зал</th>
                    </tr>
                    </thead>

                    <tbody>
                    {workouts.filter((a) => a.event === workouts[0].event).map((item) => (
                        <AvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                    </tbody>
                </table>
            </Tab>

            {workouts[workouts.length -1].event !== workouts[0].event &&
            <Tab eventKey="next" title={(workouts[workouts.length -1].event !== undefined) ? new Date(workouts[workouts.length -1].event).toLocaleString().slice(0,10) : ''}>
                <table className={"table mt-3"}>
                    <thead>
                    <tr>
                        <th>День</th>
                        <th>Время</th>
                        <th>Тренер</th>
                        <th>Тип</th>
                        <th>Зал</th>
                    </tr>
                    </thead>

                    <tbody>
                    {workouts.filter((a) => a.event === workouts[workouts.length -1].event).map((item) => (
                        <AvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                    </tbody>
                </table>
            </Tab>}
        </Tabs>
        </> : <Alert variant={"secondary"} className={"mt-3"}>Нет тренировок на этот день недели</Alert>}
    </>);
}