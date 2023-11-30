import {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import SignUpPersonalAvailableWorkoutsTableData from "./signUpPersonalAvailableWorkoutsTableData.jsx";

export default function SignUpPersonalAvailableWorkoutsTabs({workouts}) {
    const [key, setKey] = useState('current');

    return (<>

        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-4"
        >
            <Tab eventKey="current" title={(workouts[0] === undefined) ? "" : new Date(workouts[0].date_begin).toLocaleString().slice(0, 10)}>
                <div className={"row position-absolute"}>
                    {workouts.filter((a) => a.schedule.time_begin === workouts[0].schedule.time_begin).map((item) => (
                        <SignUpPersonalAvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                </div>
            </Tab>
            <Tab eventKey="next"
                 title={(workouts[0] === undefined) ? "" : new Date(workouts[workouts.length - 1].date_begin).toLocaleString().slice(0, 10)}>
                <div className={"row position-absolute"}>
                    {workouts.filter((a) => a.schedule.time_begin === workouts[workouts.length - 1].schedule.time_begin).map((item) => (
                        <SignUpPersonalAvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                </div>
            </Tab>
        </Tabs>

    </>);
}