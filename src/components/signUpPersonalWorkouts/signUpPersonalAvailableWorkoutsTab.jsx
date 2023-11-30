import {useState} from "react";
import {Alert, Tab, Tabs} from "react-bootstrap";
import SignUpPersonalAvailableWorkoutsTableData from "./signUpPersonalAvailableWorkoutsTableData.jsx";

export default function SignUpPersonalAvailableWorkoutsTab({workouts}){

    const [key, setKey] = useState('current');

    return (<>
        {workouts.length !== 0 ? <>
        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3"
        >
            <Tab eventKey="current" title={(workouts[0].date_begin !== undefined) ? new Date(workouts[0].date_begin).toLocaleString().slice(0,10) : ''}>
                <table className={"table mt-3"}>
                    <thead>
                    <tr>
                        <th>День</th>
                        <th className={"text-md-center"}>Время</th>
                    </tr>
                    </thead>

                    <tbody>
                    {workouts.filter((a) => a.date_begin === workouts[0].date_begin).map((item) => (
                        <SignUpPersonalAvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                    </tbody>
                </table>
            </Tab>

            {workouts[workouts.length -1].date_begin !== workouts[0].date_begin &&
            <Tab eventKey="next" title={(workouts[workouts.length -1].date_begin !== undefined) ? new Date(workouts[workouts.length -1].date_begin).toLocaleString().slice(0,10) : ''}>
                <table className={"table mt-3"}>
                    <thead>
                    <tr>
                        <th>День</th>
                        <th className={"text-md-center"}>Время</th>
                    </tr>
                    </thead>

                    <tbody>
                    {workouts.filter((a) => a.date_begin === workouts[workouts.length -1].date_begin).map((item) => (
                        <SignUpPersonalAvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                    </tbody>
                </table>
            </Tab> }

        </Tabs>
        </> : <Alert variant={"secondary"} className={"mt-4"}>Нет тренировок на этот день недели</Alert>}
    </>);
}
