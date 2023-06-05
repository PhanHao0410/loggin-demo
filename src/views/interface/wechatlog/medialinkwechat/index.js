import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from '../../../../services/index';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './style.scss';
import MediaWechat from "./mediawechatlog";
import LinkWechat from "./linkwechatlog";
import { Button, List, ListItem, Drawer, Divider, PaperProps } from "@mui/material";
import { height } from "@mui/system";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Moment from "react-moment";

const TABS = ["Media", "Links"]
function WechatMediaLink() {
    const param = useParams();
    const [dataWechat, setDataWechat] = useState(null)
    const [currentTab, setCurrentTab] = useState(TABS[0])
    const [value, setValue] = useState(0);
    const [modalDrawer, setModalDrawer] = useState(false)
    const [valueDateStart, setValueDateStart] = useState(null)
    const [valueDateEnd, setValueDateEnd] = useState(null)
    const [searchDateHistory, setSearchDateHistory] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const moment = require('moment')
    const toggleDrawer = (open) => (event) => {
        setModalDrawer(open)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    console.log('check param id: ', param.id)


    useEffect(() => {
        const url = `wechat/user/${param.id}`
        getRequest(url, (data) => {
            setDataWechat(data)
        })
    }, [param])
    const clickApplyDate = () => {
        setModalDrawer(false)
        // { valueDateStart !== null ? console.log('check start date: ', moment(valueDateStart.$d).format('YYYY-MM-DD')) : console.log('') }
        // { valueDateEnd !== null ? console.log('check end date: ', moment(valueDateEnd.$d).format('DD/MM/YYYY')) : console.log('') }
        if (valueDateStart !== null && valueDateEnd === null) {
            setSearchDateHistory(`start_date=${moment(valueDateStart.$d).unix()}&end_date=NaN`)
        }
        if (valueDateStart === null && valueDateEnd !== null) {
            setSearchDateHistory(`start_date=NaN&end_date=${moment(valueDateEnd.$d).unix()}`)
        }
        if (valueDateStart !== null && valueDateEnd !== null) {
            setSearchDateHistory(`start_date=${moment(valueDateStart.$d).unix()}&end_date=${moment(valueDateEnd.$d).unix()}`)
        }
        if (valueDateStart === null && valueDateEnd === null) {
            setSearchDateHistory(`start_date=NaN&end_date=NaN`)
        }
    }
    const clickResetDate = () => {
        setValueDateStart(null)
        setValueDateEnd(null)
    }
    return (
        <div className="Media-And-Link">
            {dataWechat &&
                <>
                    <div className="title-container">
                        <div className="media-title-content">{`Wechat log > ${dataWechat.remark} > Shared Media & Links > ${value === 0 ? "MEDIA" : "LINKS"}`}</div>
                        <h3 className="media-title-main">Shared Media & Links</h3>
                    </div>
                    <div className="toolbars-content">
                        <div className="toolbar-content-title">
                            {/* {TABS.map((tab) => {
                                return <>
                                    <div className={tab === currentTab ? "content-title-selector" : "content-title-static"} onClick={() => setCurrentTab(tab)}>{tab}</div>
                                </>
                            })} */}
                            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <Tabs value={value} onChange={handleChange} centered>
                                    <Tab label="Media" />
                                    <Tab label="Links" />
                                </Tabs>
                            </Box>
                        </div>
                        <div className="folder-tools">
                            <div className="search-in-meeting">
                                <i className="fas fa-search"></i>
                                <input placeholder="Search by User" onChange={(event) => setSearchInput(event.target.value)} />
                            </div>
                            <div className="creat-new-list" onClick={toggleDrawer(true)}><i className="fas fa-sliders-h"></i></div>
                        </div>
                    </div>
                    <div className="media-link-content">
                        {value === 0 ? < MediaWechat searchDateHistory={searchDateHistory} searchInput={searchInput} /> : < LinkWechat searchDateHistory={searchDateHistory} searchInput={searchInput} />}
                    </div>
                </>
            }
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
export default (WechatMediaLink)