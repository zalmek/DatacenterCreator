import {Link, useLocation} from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation()
    let currentLink = ''
    let translation = {
        "components": "Компоненты",
    }
    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(((crumb, index) => {
            currentLink += `/${crumb}`
            if (index == location.pathname.split('/')
                .filter(crumb => crumb !== '').length - 1) {
                return (
                    <div className="crumb" key={crumb}>
                        <h5>{crumb}</h5>
                    </div>
                )
            }
            else {
                return (
                    <div className="crumb" key={crumb}>
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