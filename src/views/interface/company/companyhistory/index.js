import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../../services";
import './style.scss'
function CompanyHistory({ currentActivity }) {
    const params = useParams()
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        console.log('check currentActivity: ', currentActivity)
        if (currentActivity !== null) {
            const url = `companies/${params.id}/activities/email-conversation/${currentActivity.id}`
            getRequest(url, (data) => {
                console.log('Check data companyHistory: ', data)
                setDataList(data.list)
            })
        }

    }, [currentActivity])
    const html = '<p>hahahah baba is yellow <strong>kkkk very yellow</strong></p><p><strong>ichoo </strong></p>';

    return (
        <>
            {dataList.map((item) => {
                return <div className="CompanyHistory" key={item.id}>
                    <div className="company-history-container">
                        <div className="company-history-title">{item.title}</div>
                        {item.email_addresses.map((emailItem) => {
                            return <>
                                {emailItem.type === 'sender' ? <div className="company-history-email">{`From: ${emailItem.name}`}</div> : null}
                                {emailItem.type === 'recipients' ? <div className="company-history-email">{`To: ${emailItem.name}`}</div> : null}
                                {emailItem.type === 'cc_recipients' ? <div className="company-history-email">{`Cc: ${emailItem.name}`}</div> : null}
                            </>
                        })}
                        <div className="company-history-content">Email Content:</div>
                        <div dangerouslySetInnerHTML={{ __html: item.content.content }}></div>
                    </div>



                </div>
            })}

        </>
    )
}
export default (CompanyHistory)