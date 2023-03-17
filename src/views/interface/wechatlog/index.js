import React, { useState } from "react";
import './style.scss';
function WechatLog() {

    return (
        <div className="WechatLog">
            <div className="overall-container">
                <div className="overall-content">
                    <p className="content">Wechat Log</p>
                    <div className="title-content">
                        Wechat Log
                    </div>
                    <div className="toolbars-content">
                        <div className="folder-tools">
                            <div className="search-in-meeting">
                                <i class="fas fa-search"></i>
                                <input placeholder="Search by User" />
                            </div>
                            <div className="creat-new-list"><i class="fas fa-sliders-h"></i></div>

                        </div>
                    </div>
                    <div className="data-table-container">
                    </div>
                </div>
            </div>

        </div>
    )
}
export default (WechatLog);