import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import './style.scss';
import { getRequest, postRequest } from '../../../../services/index'
import Moment from 'react-moment';
import { PATHS } from "../../../../constants";
function WechatMessage({ currentHistory }) {
    const [dataMessage, setDataMessage] = useState(null);
    const moment = require('moment')
    const history = useHistory();
    // console.log('check data from wechat to child: ', currentHistory)
    useEffect(() => {
        if (currentHistory !== null) {
            const url = `wechat/${currentHistory.id}/messages?order=id&offset=0&limit=20`;
            getRequest(url, (data) => {
                // console.log('check data message: ', data)
                setDataMessage(data.list)
            })
        }

    }, [currentHistory])
    // const clickSharedMediaLink = () => {
    //     history.push(`/wechat-log/${currentHistory.id}`)
    //     alert('hahahahah')
    // }
    return (
        <div className="Wechat-message">
            <div className="wechat-history-title">
                <div className="content-history-avatar">
                    {currentHistory &&
                        <>
                            <div className="content-box-avatar"><p>{currentHistory.remark.slice(0, 2)}</p></div>
                            <p>{currentHistory.remark}</p>
                        </>
                    }
                </div>
                <Link to={`/wechatlog/${currentHistory.id}/sharedMediaAndLink`} className="content-history-icon" replace>
                    <i className="fas fa-download" ></i>
                </Link>
            </div>
            <div className="history-message">
                {dataMessage && dataMessage.map((item) => {
                    return <div className="history-content-container" key={item.id}>
                        {item.message_type === 'text' &&
                            <>
                                <div className="history-time-send">{moment.unix(item.sent_at).format('DD/MM/YYYY')}</div>
                                <div className="message-history-container">
                                    <div className="message-item">{item.content}</div>
                                </div>
                            </>
                        }
                        {item.message_type === 'image' &&
                            <>
                                <div className="history-time-send">{moment.unix(item.sent_at).format('DD/MM/YYYY')}</div>
                                <div className="message-history-container">
                                    <img src={`${item.link}`} className="message-image" />
                                </div>
                            </>
                        }
                        {item.message_type === 'video' &&
                            <>
                                <div className="history-time-send">{moment.unix(item.sent_at).format('DD/MM/YYYY')}</div>
                                <div className="message-history-container">
                                    <video className="message-image" controls >
                                        <source src={`${item.link}`} type="video/mp4" />
                                    </video>
                                </div>
                            </>
                        }
                    </div>
                })}
            </div>

        </div>
    )

}
export default (WechatMessage)