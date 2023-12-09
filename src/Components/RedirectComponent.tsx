import {Navigate} from "react-router-dom";

function RedirectComponent() {
    return (
        <Navigate to={"/"}></Navigate>
    );
}

export default RedirectComponent;