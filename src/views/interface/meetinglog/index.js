import React, { useState, useEffect } from "react";
import './style.scss';
import { getRequest } from "../../../services";
import ContentMeeting from "./contentmeeting";
import { Button, List, ListItem, Drawer, Divider, PaperProps } from "@mui/material";
import { height } from "@mui/system";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
function MeetingLog() {
    const [dataMeeting, setDataMeeting] = useState(null)
    const moment = require('moment')
    const [dataCurrentHis, setDataCurrentHis] = useState(null)
    const [modalDrawer, setModalDrawer] = useState(false)
    const [valueDateStart, setValueDateStart] = useState(null)
    const [valueDateEnd, setValueDateEnd] = useState(null)
    const [searchDateHistory, setSearchDateHistory] = useState('')
    const [searchInput, setSearchInput] = useState('')

    const toggleDrawer = (open) => (event) => {
        setModalDrawer(open)
    }

    useEffect(() => {
        const url = `meeting-logs/1?order=created_at&direction=desc&search=${searchInput}${searchDateHistory}`;
        getRequest(url, (data) => {
            console.log('check data wechat: ', data)
            setDataMeeting(data.list)
            setDataCurrentHis(data.list[0])
        })
    }, [searchDateHistory, searchInput])

    const clickApplyDate = () => {
        setModalDrawer(false)
        // { valueDateStart !== null ? console.log('check start date: ', moment(valueDateStart.$d).format('YYYY-MM-DD')) : console.log('') }
        // { valueDateEnd !== null ? console.log('check end date: ', moment(valueDateEnd.$d).format('DD/MM/YYYY')) : console.log('') }
        if (valueDateStart !== null && valueDateEnd === null) {
            setSearchDateHistory(`&start_date=${moment(valueDateStart.$d).unix()}`)
        }
        if (valueDateStart === null && valueDateEnd !== null) {
            setSearchDateHistory(`&end_date=${moment(valueDateEnd.$d).unix()}`)
        }
        if (valueDateStart !== null && valueDateEnd !== null) {
            setSearchDateHistory(`&start_date=${moment(valueDateStart.$d).unix()}&end_date=${moment(valueDateEnd.$d).unix()}`)
        }
        if (valueDateStart === null && valueDateEnd === null) {
            setSearchDateHistory(``)
        }
    }
    const clickResetDate = () => {
        setValueDateStart(null)
        setValueDateEnd(null)
    }
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
                                <i className="fas fa-search"></i>
                                <input placeholder="Search in Meeting" onChange={(event) => setSearchInput(event.target.value)} />
                            </div>
                            <div className="creat-new-list" onClick={toggleDrawer(true)}><i className="fas fa-sliders-h"></i></div>
                            <div className="creat-new-list"><i className="fas fa-file-upload"></i></div>

                        </div>
                    </div>
                    {dataMeeting && dataCurrentHis ?
                        <div className="data-table-container">
                            <div className="value-time-data">
                                {dataMeeting && dataCurrentHis && dataMeeting.map((item) => {
                                    return <div onClick={() => setDataCurrentHis(item)} className={item.id === dataCurrentHis.id ? "history-container choice-item" : "history-container"} key={item.id}>
                                        <div className="history-title-container">
                                            <div className="title-child">{item.name}</div>
                                            <div className="title-time">{moment.unix(item.created_at).format('DD/MM/YYYY')}</div>
                                        </div>
                                        <div className="history-content">{item.first_meeting_log_item === null ? '' :
                                            item.first_meeting_log_item.meeting_log_item_contents.map((content) => {
                                                return <>{content.value}</>
                                            })
                                        }</div>
                                    </div>
                                })}

                            </div>
                            <div className="value-permissions">
                                <ContentMeeting dataCurrentHis={dataCurrentHis && dataCurrentHis} />
                            </div>
                        </div>
                        :
                        <div className="error-results">No results found</div>
                    }
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

        </div>
    )
}
export default (MeetingLog);