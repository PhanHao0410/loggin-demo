import React, { useState, useEffect } from "react";
import './style.scss';
import { getRequest, postRequest } from '../../../services';
import Moment from 'react-moment';
import WechatMessage from "./wechat-message";
import { Button, List, ListItem, Drawer, Divider, PaperProps } from "@mui/material";
import { height } from "@mui/system";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
function WechatLog() {
    const [historyWechat, setHistoryWechat] = useState([])
    const [currentHistory, setCurrentHistory] = useState(null)
    const [modalDrawer, setModalDrawer] = useState(false)
    const [valueDateStart, setValueDateStart] = useState(null)
    const [valueDateEnd, setValueDateEnd] = useState(null)
    const [searchDateHistory, setSearchDateHistory] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const moment = require('moment')
    const toggleDrawer = (open) => (event) => {
        setModalDrawer(open)
    }
    useEffect(() => {
        const url = `wechat/users?name=${searchInput}&${searchDateHistory}offset=0`;
        getRequest(url, (data) => {
            // console.log('check data wechat: ', data)
            setHistoryWechat(data.list)
            setCurrentHistory(data.list[0])
        })
    }, [searchDateHistory, searchInput])
    const clickApplyDate = () => {
        setModalDrawer(false)
        // { valueDateStart !== null ? console.log('check start date: ', moment(valueDateStart.$d).format('YYYY-MM-DD')) : console.log('') }
        // { valueDateEnd !== null ? console.log('check end date: ', moment(valueDateEnd.$d).format('DD/MM/YYYY')) : console.log('') }
        if (valueDateStart !== null && valueDateEnd === null) {
            setSearchDateHistory(`start_date=${moment(valueDateStart.$d).format('YYYY-MM-DD')}&`)
        }
        if (valueDateStart === null && valueDateEnd !== null) {
            setSearchDateHistory(`end_date=${moment(valueDateEnd.$d).format('YYYY-MM-DD')}&`)
        }
        if (valueDateStart !== null && valueDateEnd !== null) {
            setSearchDateHistory(`start_date=${moment(valueDateStart.$d).format('YYYY-MM-DD')}&end_date=${moment(valueDateEnd.$d).format('YYYY-MM-DD')}&`)
        }
        if (valueDateStart === null && valueDateEnd === null) {
            setSearchDateHistory('')
        }
    }
    const clickResetDate = () => {
        setValueDateStart(null)
        setValueDateEnd(null)
    }
    const handleSearchInput = (event) => {
        setSearchInput(event.target.value)
    }
    // console.log('check data history wechat: ', historyWechat)
    // console.log('check data current history: ', currentHistory)
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
                                <i className="fas fa-search" onClick={() => setSearchDateHistory('start_date=2023-02-27&')}></i>
                                <input placeholder="Search by User" onChange={(event) => handleSearchInput(event)} value={searchInput} />
                            </div>
                            <div className="creat-new-list"><i className="fas fa-sliders-h" onClick={toggleDrawer(true)}></i></div>

                        </div>
                    </div>
                    <div className="data-table-container">
                        {historyWechat && currentHistory ?
                            <>
                                <div className="wechat-history" >
                                    {historyWechat && historyWechat.map((item) => {
                                        return <div className={item.id === currentHistory.id ? "wechat-history-item history-item-current" : "wechat-history-item"}
                                            key={item.id} onClick={() => setCurrentHistory(item)}>
                                            <div className="history-item-title">
                                                <div className="history-avatar-container">
                                                    <div className="avatar-title"><p>{item.remark.slice(0, 2)}</p></div>
                                                    <p>{item.remark}</p>
                                                </div>
                                                <div className="history-item-date">{moment.unix(item.latest_message.sent_at).format('DD/MM/YYYY')}</div>
                                            </div>
                                            <div className="history-item-content">{item.latest_message.content}</div>
                                        </div>
                                    })}
                                </div>
                                <div className="wechat-history-padding"></div>
                                <div className="wechat-history-content">
                                    {currentHistory && <WechatMessage currentHistory={currentHistory} />}
                                </div>
                            </>
                            : <div className="error-no-result">No result user and content</div>}
                    </div>
                </div>
            </div>
            <div >
                <Drawer
                    anchor={'right'}
                    open={modalDrawer}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        elevation: 8,
                        sx: {
                            width: 400,
                            height: 300,
                        }
                    }}
                >
                    <Divider />
                    <div className="modal-drawer">
                        <List>
                            <ListItem className="close-modal-date" onClick={toggleDrawer(false)}>
                                <i className="fas fa-times"></i>close</ListItem>
                            <ListItem className="date-range-container">
                                <div className="date-range-modal">Date Range</div>
                                <div className="start-end-date">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Start Date"
                                            className="start-date-picker"
                                            format="DD/MM/YYYY"
                                            value={valueDateStart}
                                            onChange={(newValue) => setValueDateStart(newValue)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="start-end-date">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="End Date"
                                            className="start-date-picker"
                                            format="DD/MM/YYYY"
                                            value={valueDateEnd}
                                            onChange={(newValue) => setValueDateEnd(newValue)}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </ListItem>
                            <ListItem className="action-modal">
                                <input className="reset-date" type="button" value='Reset' onClick={() => clickResetDate()} />
                                <input className="apply-date" type="button" value='Apply' onClick={() => clickApplyDate()} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>

        </div>
    )
}
export default (WechatLog);