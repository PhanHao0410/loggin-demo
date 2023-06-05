import React, { useState, useEffect } from "react";
import './style.scss';
import { getRequest } from "../../../../services";
function ContentMeeting({ dataCurrentHis }) {
    const [dataContent, setDataContent] = useState(null)

    useEffect(() => {
        if (dataCurrentHis !== null) {
            const url = `meeting-logs/${dataCurrentHis.id}/contents`
            getRequest(url, (data) => {
                console.log('check data content: ', data)
                setDataContent(data.list)
            })
        }

    }, [dataCurrentHis])
    return (
        <div className="ContentMeeting">
            <div className="content-meeting-container">
                <div className="meeting-title-container">
                    {dataCurrentHis && <div className="meeting-title-value">{dataCurrentHis.name}</div>}
                    <i className="fas fa-trash"></i>
                </div>
                <div className="meeting-tag-company">
                    {dataContent && dataContent.map((item) => {
                        return <>{item.title && <div className="tag-child" key={item.id}>{item.title}</div>}</>

                    })}
                </div>


                <div className="meeting-tag-content">
                    {dataContent && dataContent.map((item) => {
                        return <div key={item.id}>
                            {item.title && <div className="title-content-child">{item.title}</div>}
                            {item.title && item.meeting_log_item_contents && item.meeting_log_item_contents.map((content) => {
                                return <div>
                                    {content.type === 'text' && content.value && <div className="content-tag">{content.value}</div>}
                                    {content.type === 'table' && content.value && content.value.map((valueTable) => {
                                        return <div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th className="thead-number">{valueTable[0]}</th>
                                                        <th className="thead-title">{valueTable[1]}</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>

                                    })}
                                </div>
                            })}


                        </div>
                    })}

                </div>

            </div>
        </div>
    )
}
export default (ContentMeeting);