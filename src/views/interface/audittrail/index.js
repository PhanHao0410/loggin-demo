import React, { useState } from "react";
import './style.scss';
function AuditTrail() {

    return (
        <div className="AuditTrail">
            <div className="overall-container">
                <div className="overall-content">
                    <p className="content">Audit Trail</p>
                    <div className="title-content">
                        Audit Trail
                    </div>
                    <div className="toolbars-content">
                        <div className="folder-tools">
                            <div className="creat-new-list"><i className="fas fa-sliders-h"></i></div>
                        </div>
                    </div>
                    <div className="data-table-container">
                        <table className="data-table-title">
                            <thead className="thead-data-table">
                                <tr>
                                    <th className="border-rights border-bottoms align-left">Timestamp <i className="fas fa-arrow-down"></i></th>
                                    <th className="border-rights border-bottoms align-right">User</th>
                                    <th className="border-rights border-bottoms align-right">Page ID</th>
                                    <th className="border-rights border-bottoms align-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>16/5/2022</td>
                                    <td className="align-right">Phan Hào</td>
                                    <td className="align-right">546</td>
                                    <td className="align-right">Logn out</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default (AuditTrail);