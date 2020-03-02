import React from "react";
import {Link} from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

function Main() {

    return(
        <div id="page-top">
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                    {/* Topbar */}
                    <Topbar/>
                        <div className="container-fluid">

                            {/* Content */}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Main;