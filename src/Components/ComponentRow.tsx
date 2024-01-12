import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";


export function ComponentRow({component}: ComponentRowProps) {
    const navigate = useNavigate()

    function numberToStatus(status: number) {
        if (status==1){
            return "Доступен"
        }
        else
            return "Недоступен"
    }

    return (
        <tr key={component.componentid}>
            <th className={""} scope="row">
                <span className="badge text-bg-dark">{component.componentid}</span>
            </th>
            <td className={""}>
                <div
                    style={{
                        height: '3rem',
                        position: 'relative'
                    }}
                >
                    <img
                        src={component.componentimage}
                        alt="Minimap image"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            resize: 'both',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            margin: 'auto',
                            width: 'auto',
                            height: 'auto',
                            border: '1px solid black'
                        }}
                    />
                </div>
            </td>
            <td className={""}>{component.componentname}</td>
            <td className={""}>{component.componentprice}</td>
            <td className={""} width={4000} style={{textOverflow: "clip"}}>{component.componentdescription}</td>
            <td className={""}>{numberToStatus(component.componentstatus)}</td>
            <td className={""}>
                <Button className="button-29" onClick={() => {navigate("/components/"+component.componentid)}}>
                    Открыть
                </Button>
            </td>
        </tr>
    );
}