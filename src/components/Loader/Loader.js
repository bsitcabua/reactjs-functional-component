import React from "react";
import {Spinner} from "reactstrap";

function Loader() {

    return (
        <div>
            <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
        </div>
    )
}

export default Loader;