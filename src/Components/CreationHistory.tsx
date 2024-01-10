import {useEffect, useState} from "react";
import axios from "axios";
import {CreationHistoryRow} from "./CreationHistoryRow.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../store/data/slice.ts";
import Card from "react-bootstrap/Card";
import {LoadingIndicator} from "./LoadingIndicator.tsx";


export function CreationHistory() {
    const [creations, setCreations] = useState()
    const [refresh, changeRefresh] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0)
    const auth = useAuth()
    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<string | undefined>()

    function filterString(beginDate: Date | undefined, endDate: Date | undefined, status: string | number | undefined) {
        let string = "?"
        if (beginDate !== undefined && endDate != undefined) {
            string = string + "start_date=" + beginDate.toJSON() + "&end_date=" + endDate.toJSON()
        }
        if (status !== undefined) {
            if (string.length > 2) {
                string = string + "&status=" + status
            } else
                string = string + "status=" + status
        }
        return string
    }

    function creationStringToStatus(creationStatus?: string) {
        switch (creationStatus) {
            case "Черновик":
                return 0;
            case "Отклонена":
                return 3;
            case "Сформирована":
                return 1;
            case "Завершена":
                return 2;
            case "Удалена":
                return 5;
            case "Одобрена(удалённый статус)":
                return 4;

            default:
                return undefined;
        }
    }

    useEffect(() => {
        axios.get("api/datacentercreations/").then((result) => {
            setCreations(result.data.creations)
        })
    }, [refresh]);

    useEffect(() => {
        setCounter((prevState) => prevState + 1)
        if (counter % 3000 == 0) {
            changeRefresh(!refresh)
        }
    }, [counter]);

    const filtersPanel = auth?.is_staff ? (
        <Card className="card card-body">
            <h5>Фильтрация</h5>
            <div className="input-group mb-3">
                <input type="date" className="form-control" placeholder="Начальная дата"
                       onChange={(event) => setBeginDate(new Date(event.target.value))}/>
                <span className="input-group-text">—</span>
                <input type="date" className="form-control" placeholder="Конечная дата"
                       onChange={(event) => setEndDate(new Date(event.target.value))}/>
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Имя пользователя"
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Статус"
                       onChange={(event) => setStatus(event.target.value)}/>
            </div>
            <button className="btn btn-primary" onClick={
                () => {
                    axios.get("/api/datacentercreations/" + filterString(beginDate, endDate, creationStringToStatus(status))).then((result) => {
                        console.log(result)
                        setCreations(result.data.creations)
                    }, []).then(
                        () => setCreations((prevState) => {
                            if (username !== undefined) {
                                prevState.filter((creation) => creation.user.includes(username))
                            }
                        }))
                }
            }>Применить
            </button>
        </Card>
    ) : (
        <></>
    );

    if (creations !== undefined) {
        return (<>
            <div>
                <h3>Список заявок</h3>
                {filtersPanel}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        {auth?.is_staff ? <th scope="col">Создатель</th> : null}
                        <th scope="col">Модератор</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Создана</th>
                        <th scope="col">Сформирована</th>
                        <th scope="col">Завершена</th>
                        <th scope="col">Список компонентов</th>
                    </tr>
                    </thead>
                    <tbody>{creations.map((creation) => <CreationHistoryRow creation={creation}
                                                                            key={creation.creationid}/>)}</tbody>
                </table>
            </div>
        </>)
    } else {
        return (
            <LoadingIndicator></LoadingIndicator>
        )
    }
}