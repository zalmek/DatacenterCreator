import {CreationHistoryRow} from "./CreationHistoryRow.tsx";
import {ComponentRow} from "./ComponentRow.tsx";

interface ComponentsTableViewProps {
    components: {
        componentprice: number;
        componentdescription: string;
        componentid: number;
        componentname: string;
        componentimage: string;
        componentstatus: number
    }[]
}

export function ComponentsTableView({components}: ComponentsTableViewProps) {
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Изображение</th>
                    <th scope="col">Название</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Статус</th>
                </tr>
                </thead>
                <tbody>{components.map((component) => <ComponentRow component={component}
                                                                    key={component.componentid}/>)}</tbody>
            </table>
        </>
    );
}