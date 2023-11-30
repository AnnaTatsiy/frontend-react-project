import {useState, useEffect} from "react";
import {getVariant} from "../helpers/utils.js";
import {ProgressBar} from "react-bootstrap";
import useWindowSize from "../helpers/useWindowSize.js";

export default function MyProgressBar({fullness}) {

    const size = useWindowSize();

    const [style, setStyle] = useState(
        {
            variant: "secondary",
            progress: 100,
            text: "Данные не получены",
            textColor: "text-secondary"
        }
    )

    useEffect(() => {

        const value = (fullness.fact !== 0) ? (fullness.fact * 100) / fullness.recommend : 1;

        setStyle({
            variant: (fullness.fact < fullness.required) ? "danger" : ((fullness.fact < fullness.recommend) ? "warning" : "primary"),
            progress: (value < 100) ? value : 100,
            text: getVariant(fullness),
            textColor: (fullness.fact < fullness.required) ? "text-danger" : ((fullness.fact < fullness.recommend) ? "text-warning" : "text-primary")
        })

    }, [fullness]);

    return (
        <div className="row">
            {size.width > 550 &&
                <div className="col">
                    <ProgressBar variant={style.variant} className={"mt-2 mb-2 progress"} animated
                                 now={style.progress}/>
                </div>}
            <div className="col mt-1">
                <p className={style.textColor}>{style.text}</p>
            </div>
        </div>
    );
}

