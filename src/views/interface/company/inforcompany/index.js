import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './style.scss';
import ActivityCompany from "../activicompany/index";
import ModelCompany from "../modelcompany/index";
import { getRequest } from '../../../../services';
import { Button, List, ListItem, Drawer, Divider, PaperProps } from "@mui/material";
import { height } from "@mui/system";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Moment from "react-moment";


const TABS = [{ title: 'Activities', types: '' }, { title: 'Estimates', types: '' }, { title: 'Model', types: '&type=model' },
{ title: 'Report', types: '&type=report' }, { title: 'All Files/Links', types: '' }]
function InforCompany() {
    const params = useParams();
    const moment = require('moment');
    const [company, setCompany] = useState({})
    const [currentTab, setCurrentTab] = useState(TABS[0])
    const [modalDrawer, setModalDrawer] = useState(false)
    const [valueDateStart, setValueDateStart] = useState(null)
    const [valueDateEnd, setValueDateEnd] = useState(null)
    const [dateStartToChild, setDateStartToChild] = useState({})
    const [dateEndToChild, setDateEndToChild] = useState({})
    useEffect(() => {
        const url = `companies/${params.id}`;
        getRequest(url, (data) => {
            setCompany(data)
        })
    }, [params.id])


    const toggleDrawer = (open) => (event) => {
        setModalDrawer(open)
    }
    const clickApplyDate = () => {
        setModalDrawer(false)
        setDateStartToChild(valueDateStart)
        setDateEndToChild(valueDateEnd)
        // { valueDateStart !== null ? console.log('check start date: ', moment(valueDateStart.$d).format('DD/MM/YYYY')) : console.log('') }
        // { valueDateEnd !== null ? console.log('check end date: ', moment(valueDateEnd.$d).format('DD/MM/YYYY')) : console.log('') }

    }
    const clickResetDate = () => {
        setValueDateStart(null)
        setValueDateEnd(null)
    }
    return (
        <>
            <div className="InforCompany">
                <div className="overall-container">
                    <div className="overall-content">
                        <p className="content">{`Company / ${company.name}`}</p>
                        <div className="title-content">
                            {`${company.name} (${company.ticker})`}
                        </div>
                        <div className="toolbars-content">
                            <div className="title-tools">
                                {TABS.map((tab, i) => {
                                    return <button key={i} className={tab.title === currentTab.title ? "btn-title-change" : "btn-title-tools"} onClick={() => setCurrentTab(tab)}>{tab.title}</button>
                                })}

                            </div>
                            <div className="folder-tools">
                                <div className="search-in-meeting">
                                    <i className="fas fa-search"></i>
                                    <input placeholder="Search in Activities" />
                                </div>
                                {currentTab.title === 'Activities' && <div className="creat-new-list"><i className="fas fa-sliders-h" onClick={toggleDrawer(true)}></i></div>}

                            </div>
                        </div>
                        {currentTab.title === 'Activities' && <ActivityCompany dateStartToChild={dateStartToChild} dateEndToChild={dateEndToChild} />}
                        {currentTab.title === 'Estimates' &&
                            <div className="estimates-container">
                                <div className="emtimates-child ">
                                    <p>Latest estimate</p>
                                    <table className="data-table-title">
                                        <thead className="thead-data-table">
                                            <tr className="first-thead-data">
                                                <td rowSpan="2" className="border-rights border-bottoms">Share Price</td>
                                                <th colSpan="5" className="border-bottoms border-rights">EPS Estimates & Growth</th>
                                                <th colSpan="3" className="border-bottoms">P/E</th>
                                            </tr>
                                            <tr className="first-thead-data">
                                                <th className="border-bottoms border-rights">2021A</th>
                                                <th className="border-bottoms border-rights">2022E</th>
                                                <th className="border-bottoms border-rights">2023E</th>
                                                <th className="border-bottoms border-rights">2024E</th>
                                                <th className="border-bottoms border-rights">3Y <i className="fas fa-chart-line"></i></th>
                                                <th className="border-bottoms border-rights">2022E</th>
                                                <th className="border-bottoms border-rights">2023E</th>
                                                <th className="border-bottoms">2024E</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={company.id}>
                                                <td>{parseFloat(company.share_price.value).toFixed(2)}</td>
                                                <td>{parseFloat(company.actual_values[1].value).toFixed(2)}</td>
                                                <td className="company-eps-item">{parseFloat(company.full_estimation_value[0].value).toFixed(2)}
                                                    <div className="company-number-change">
                                                        <p className={company.full_estimation_value[0].growth_rate > 0 ? "color-green" :
                                                            company.full_estimation_value[0].growth_rate < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.full_estimation_value[0].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}></i>
                                                            {parseFloat(company.full_estimation_value[0].growth_rate).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="company-eps-item">{parseFloat(company.full_estimation_value[1].value).toFixed(2)}
                                                    <div className="company-number-change">
                                                        <p className={company.full_estimation_value[1].growth_rate > 0 ? "color-green" :
                                                            company.full_estimation_value[1].growth_rate < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.full_estimation_value[1].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}>
                                                            </i>
                                                            {parseFloat(company.full_estimation_value[1].growth_rate).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="company-eps-item">{parseFloat(company.full_estimation_value[2].value).toFixed(2)}
                                                    <div className="company-number-change">
                                                        <p className={company.full_estimation_value[2].growth_rate > 0 ? "color-green" :
                                                            company.full_estimation_value[2].growth_rate < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.full_estimation_value[2].growth_rate > 0 ? "fas fa-sort-up " : "fas fa-sort-down "}>
                                                            </i>
                                                            {parseFloat(company.full_estimation_value[2].growth_rate).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="company-eps-item">
                                                    <div className="company-number-change">
                                                        <p className={company.estimation_values.average_growth > 0 ? "color-green" :
                                                            company.estimation_values.average_growth < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.estimation_values.average_growth > 0 ? "fas fa-sort-up color-green" : "fas fa-sort-down "}>
                                                            </i>
                                                            {parseFloat(company.estimation_values.average_growth).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>{parseFloat(company.full_estimation_value[0].price_earning_ratio).toFixed(2)}</td>
                                                <td>{parseFloat(company.full_estimation_value[1].price_earning_ratio).toFixed(2)}</td>
                                                <td>{parseFloat(company.full_estimation_value[2].price_earning_ratio).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="emtimates-child ">
                                    <p>Historical Actual EPS & Growth</p>
                                    <table className="table-historical-actual">
                                        <thead>
                                            <tr>
                                                <th className="border-rights">2020A</th>
                                                <th>2021A</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{parseFloat(company.actual_values[0].value).toFixed(2)}</td>
                                                <td>{parseFloat(company.actual_values[1].value).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="emtimates-child ">
                                    <p>EPS Estimates & Growth</p>
                                    <table className="table-EPS-estimates">
                                        <thead>
                                            <tr>
                                                <th className="border-rights">2022E</th>
                                                <th className="border-rights">2023E</th>
                                                <th className="border-rights">2024E</th>
                                                <th >2025E</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="company-eps-item">{parseFloat(company.full_estimation_value[0].value).toFixed(2)}
                                                    <div className="company-number-change">
                                                        <p className={company.full_estimation_value[0].growth_rate > 0 ? "color-green" :
                                                            company.full_estimation_value[0].growth_rate < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.full_estimation_value[0].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}></i>
                                                            {parseFloat(company.full_estimation_value[0].growth_rate).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="company-eps-item">{parseFloat(company.full_estimation_value[1].value).toFixed(2)}
                                                    <div className="company-number-change">
                                                        <p className={company.full_estimation_value[1].growth_rate > 0 ? "color-green" :
                                                            company.full_estimation_value[1].growth_rate < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.full_estimation_value[1].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}>
                                                            </i>
                                                            {parseFloat(company.full_estimation_value[1].growth_rate).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="company-eps-item">{parseFloat(company.full_estimation_value[2].value).toFixed(2)}
                                                    <div className="company-number-change">
                                                        <p className={company.full_estimation_value[2].growth_rate > 0 ? "color-green" :
                                                            company.full_estimation_value[2].growth_rate < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.full_estimation_value[2].growth_rate > 0 ? "fas fa-sort-up " : "fas fa-sort-down "}>
                                                            </i>
                                                            {parseFloat(company.full_estimation_value[2].growth_rate).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="company-eps-item">{parseFloat(company.full_estimation_value[3].value).toFixed(2)}
                                                    <div className="company-number-change">
                                                        <p className={company.full_estimation_value[3].growth_rate > 0 ? "color-green" :
                                                            company.full_estimation_value[3].growth_rate < 0 ? "color-red" : "display-none"}>
                                                            <i className={company.full_estimation_value[3].growth_rate > 0 ? "fas fa-sort-up " : "fas fa-sort-down "}>
                                                            </i>
                                                            {parseFloat(company.full_estimation_value[3].growth_rate).toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="emtimates-child ">
                                    <p>P/E Ratio</p>
                                    <table className="table-historical-actual">
                                        <thead>
                                            <tr>
                                                <th className="border-rights">2020A</th>
                                                <th className="border-rights">2021A</th>
                                                <th className="border-rights">2022E</th>
                                                <th className="border-rights">2023E</th>
                                                <th className="border-rights">2024E</th>
                                                <th>2025E</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{parseFloat(company.actual_values[0].price_earning_ratio).toFixed(2)}</td>
                                                <td>{parseFloat(company.actual_values[1].price_earning_ratio).toFixed(2)}</td>
                                                <td>{parseFloat(company.full_estimation_value[0].price_earning_ratio).toFixed(2)}</td>
                                                <td>{parseFloat(company.full_estimation_value[1].price_earning_ratio).toFixed(2)}</td>
                                                <td>{parseFloat(company.full_estimation_value[2].price_earning_ratio).toFixed(2)}</td>
                                                <td>{parseFloat(company.full_estimation_value[3].price_earning_ratio).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        {
                            currentTab.title === 'Model' && <ModelCompany podisition={currentTab} />
                        }
                        {
                            currentTab.title === 'Report' && <ModelCompany podisition={currentTab} />
                        }
                        {
                            currentTab.title === 'All Files/Links' && <ModelCompany podisition={currentTab} />
                        }
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

        </>
    )

}
export default (InforCompany)