
export default function PersonalScheduleTableData({workout}) {


    return (
            <div className={"col"}>
                <div className={"alert alert-light border-primary max-width-col max-height-col"} role="alert">
                    <p className={"mt-1"}> {workout.time_begin.slice(0, 5)} </p>
                </div>
            </div>
    )
}