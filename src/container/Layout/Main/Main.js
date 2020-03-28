import React from "react";
import {Link} from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import Dashboard from "../../../components/Contents/Dashboard/Dashboard";

function Main() {

    return(
        <div id="page-top">
            <div id="wrapper">
                {/* Sidebar */}
                {/* <Sidebar/> */}
                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content" style={{height: window.innerHeight}}>
                    {/* Topbar */}
                    {/* <Topbar/> */}
                        {/* <div className="container-fluid"> */}

                            {/* Content */}
                            <Dashboard/>

                        {/* </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Main;