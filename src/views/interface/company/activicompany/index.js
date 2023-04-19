import React, { useState, useEffect } from "react";
import { getRequest } from '../../../../services';
import { useHistory, useParams } from "react-router-dom";
import CompanyHistory from "../companyhistory";
import Moment from 'react-moment';


import "./style.scss"
function ActivityCompany() {
    const [dataCompany, setDataCompany] = useState([]);
    const [historySelecter, setHistorySelecter] = useState({})
    const history = useHistory();
    const params = useParams()
    const [currentActivity, setCurrentActivity] = useState(null);
    const moment = require('moment');

    useEffect(() => {
        const url = `companies/${params.id}/activities?order=name&direction=desc&keyword=&is_get_all=true`;
        getRequest(url, (data) => {
            console.log('check data acitivies: ', data)
            setDataCompany(data.list)
            setCurrentActivity(data.list.find((item) => { return item.is_email_conversation === true }))
            // setCurrentActivity(data.list[])
        })
    }, [params.id])
    const clickHistoryAcitiviCompany = (item) => {
        setCurrentActivity(item)
        history.push(`?activity_id=${item.id}`)
    }

    return (
        <div className="Activity">
            <div className="data-table-container">
                <div className="history-total-file">
                    {dataCompany.map((item) => {
                        return <>{item.is_email_conversation === true &&
                            <div div className={item.id === currentActivity.id ? "value-time-data-selector" : "value-time-data"} key={item.id} onClick={() => clickHistoryAcitiviCompany(item)}>
                                <div className="activities-user-date">
                                    <div className="activities-user">{item.sender_name}</div>
                                    <div className="activities-date">{moment.unix(item.created_at).format("DD/MM/YYYY")}</div>
                                </div>
                                <div className="title-history-file">
                                    <p>{item.title}</p>
                                    <i className="far fa-copy"></i>
                                </div>
                                <div className="content-history-user">
                                    {item.content_preview}
                                </div>
                            </div >
                        }</>
                    })}
                </div>
                <div className="value-permissions">
                    <div className="activities-confidential">
                        <CompanyHistory currentActivity={currentActivity} />
                    </div>
                </div>
            </div>

        </div >
    )

}
export default (ActivityCompany)