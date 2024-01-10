import {Link, useLocation} from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation()
    let currentLink = ''
    let translation = {
        "components": "Компоненты",
        "creation": "Заявка",
        "componentForm": "Компонент",
        " ": "Главная",
        "creationHistory": "Заявки",
        "auth": "Авторизация",
        "register": "Регистрация",
    }
    let array = location.pathname.split('/')
    array.unshift(" ")
    const crumbs = array
        .filter(crumb => crumb !== '')
        .map(((crumb, index) => {
            currentLink = `/${crumb}`
            console.log(currentLink)
            console.log(crumb)
            if (index == array
                .filter(crumb => crumb !== '').length - 1) {
                return (
                    <div className="crumb" key={translation[crumb] ? translation[crumb] : crumb}>
                        <h5>{translation[crumb] ? translation[crumb] : crumb}</h5>
                    </div>
                )
            }
            else {
                return (
                    <div className="crumb" key={translation[crumb]}>
                        <Link to={currentLink}>{translation[crumb]}</Link> /
                    </div>
                )
            }
        }))
    return (
        <div className="breadcrumb">
            {crumbs}
        </div>
    )
}