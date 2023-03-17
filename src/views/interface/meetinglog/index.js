import React, { useState } from "react";
import './style.scss';
function MeetingLog() {

    return (
        <div className="MeetingLog">
            <div className="overall-container">
                <div className="overall-content">
                    <p className="content">Meeting Log</p>
                    <div className="title-content">
                        Meeting Log
                    </div>
                    <div className="toolbars-content">
                        <div className="title-tools">
                            <button className="btn-title-tools">China</button>
                        </div>
                        <div className="folder-tools">
                            <div className="search-in-meeting">
                                <i class="fas fa-search"></i>
                                <input placeholder="Search in Meeting" />
                            </div>
                            <div className="creat-new-list"><i class="fas fa-sliders-h"></i></div>
                            <div className="creat-new-list"><i class="fas fa-file-upload"></i></div>

                        </div>
                    </div>
                    <div className="data-table-container">
                        <div className="value-time-data">

                        </div>
                        <div className="value-permissions">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default (MeetingLog);