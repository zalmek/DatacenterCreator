import {useAuth} from "../store/data/slice.ts";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface CreationHistoryRowProps {
    creation: ({
        creationid: number,
        creationdate: string,
        creationformdate: string | null,
        creationcompleteddate: string | null,
        creationstatus: number,
        useremail: string,
        moderatoremail: string
    }),
}

export function CreationHistoryRow({creation}: CreationHistoryRowProps) {
    function creationStatusToColor(creationStatus?: number) {
        switch (creationStatus) {
            case 0:
                return '';
            case 3:
                return 'bg-danger-subtle';
            case 1:
                return 'bg-info-subtle';
            case 2:
                return 'bg-success-subtle';
            case 5:
                return 'bg-warning-subtle';
            case 4:
                return 'bg-info-subtle';

            default:
                return 'bg-dark';
        }
    }

    function creationStatusToString(creationStatus?: number) {
        switch (creationStatus) {
            case 0:
                return "Черновик";
            case 3:
                return "Отклонена";
            case 2:
                return "Завершена";
            case 1:
                return 'Сформирована';
            case 5:
                return 'Удалена';
            case 4:
                return 'Завершена(удалённый статус)';

            default:
                return 'Что-то пошло не так';
        }
    }

    function formatDateString(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    const bgColor = creationStatusToColor(creation.creationstatus);
    const auth = useAuth()
    const navigate = useNavigate()
    return (
        <tr key={creation.creationid}>
            <th className={bgColor} scope="row">
                <span className="badge text-bg-dark">{creation.creationid}</span>
            </th>
            {auth?.is_staff ? <td className={bgColor}>{creation.useremail}</td> : null}
            <td className={bgColor}>{creation.moderatoremail ? creation.moderatoremail :
                <span className="text-body-secondary">—</span>}</td>
            <td className={bgColor}>{creationStatusToString(creation.creationstatus)}</td>
            <td className={bgColor}>{formatDateString(creation.creationdate!)}</td>
            <td className={bgColor}>{creation.creationformdate ? formatDateString(creation.creationformdate) :
                <span className="text-body-secondary">—</span>}</td>
            <td className={bgColor}>{creation.creationcompleteddate ? formatDateString(creation.creationcompleteddate) :
                <span className="text-body-secondary">—</span>}</td>
            <td className={bgColor}>
                <button className="button-68" style={{backgroundColor: "blue",position: 'relative',padding: "0px", width: "100px", height: "39px"}} onClick={() => {
                    navigate("/creationHistory/" + creation.creationid)
                }}>
                    Открыть
                </button>
            </td>
            {auth?.is_staff ?
                <td className={bgColor}><button disabled={creation.creationstatus != 1} className="button-68" style={{position: 'relative',padding: "0px", width: "100px", height: "39px"}}
                                                onClick={() => {
                                                    axios.post("api/datacentercreations/" + creation.creationid + "/moderator", {"status": 2}).then(result => {
                                                        console.log(result)
                                                    })
                                                }}>
                    Завершить
                </button></td> : null}
            {auth?.is_staff ?
                <td className={bgColor}><Button disabled={creation.creationstatus != 1} className="button-68" style={{backgroundColor: "red",position: 'relative',padding: "0px", width: "100px", height: "39px"}}
                                                onClick={() => {
                                                    axios.post("api/datacentercreations/" + creation.creationid + "/moderator", {"status": 3}).then(result => {
                                                        console.log(result)
                                                    })
                                                }}>
                    Отклонить
                </Button></td> : null}
        </tr>
    )
}