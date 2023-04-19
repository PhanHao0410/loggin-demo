import React, { useState, useEffect } from "react";
import * as ReactDOM from 'react-dom/client';
import TablePagination from '@mui/material/TablePagination';
import { StyledEngineProvider } from '@mui/material/styles';
import { HashRouter as Router, Route, Switch, useHistory, Link } from 'react-router-dom';
import { PATHS, ACCESS_TOKEN } from "../../../constants";
import { getRequest, postRequest } from '../../../services';
import './style.scss';

const TABS = [{ title: 'View all', url: '' }, { title: 'A-Shares', url: 'CNY' }, { title: 'H-Shares', url: 'HKD' }, { title: 'ADRs & Others', url: 'USD' }]
const ACTUALS = ["2020A", "2021A"]
function Company() {
    const [companies, setCompanies] = useState([]);
    const [currentTab, setCurrentTab] = useState(TABS[0]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [offsetPage, setOffsetpage] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [hideNameIndex, setHideNameIndex] = useState(true);
    const [direction, setDirection] = useState('asc');
    const [editCompany, setEditCompany] = useState({})
    const [hideUpdate, setHideUpdate] = useState(false)
    const [showUpdateEst, setShowUpdateEst] = useState(false)
    const history = useHistory()


    // Get DATA View All
    useEffect(() => {
        // const accessToken = localStorage.getItem(ACCESS_TOKEN);
        // console.log('accessToken:', accessToken);
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiYWRtaW4iXSwic3RhdHVzIjoiYWN0aXZlIiwiZXhwIjoxNjc5NjQzNTU1fQ.eK035Hlr8xY9xyRJKAYi2_rtLDuODVAdzQ_BXXlqHOg"
        // const headers = { 'Authorization': `Bearer ${token}` };
        // fetch(`https://rms-dev.aps.nexus-dev.com/api/v1/companies?fx=${currentTab.url}&limit=${rowsPerPage}&offset=${offsetPage}&direction=${direction}&order=name`, { headers })
        //     .then(response => response.json())
        //     .then(data => {
        //         setCompanies(data.list);
        //         setTotalItem(data.totalCount)
        //     });

        const url = `companies?fx=${currentTab.url}&limit=${rowsPerPage}&offset=${offsetPage}&direction=${direction}&order=name`;
        getRequest(url, (data) => {
            setCompanies(data.list);
            setTotalItem(data.totalCount)
        })
    }, [currentTab.title, rowsPerPage, offsetPage, direction])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: Number,
    ) => {
        setPage(newPage);
        setOffsetpage(newPage * rowsPerPage)

    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setOffsetpage(0)
    };
    const handleClickMyName = () => {
        setHideNameIndex(!hideNameIndex)
        hideNameIndex ? setDirection('desc') : setDirection('asc')
    }
    const clickShowUpdate = (company) => {
        console.log("check edit company: ", company)
        setHideUpdate(!hideUpdate)
        setEditCompany(company);
    }
    const clickShowUpdateEst = () => {
        setShowUpdateEst(true)
        setHideUpdate(false)
    }
    const handlechangeEditActual = (event, itemId) => {
        const actualValues = editCompany.actual_values.map(actual => {
            return {
                ...actual,
                value: itemId == actual.id ? event.target.value : actual.value
            }
        })
        setEditCompany({
            ...editCompany,
            actual_values: actualValues
        })

    }
    const clickUpdateCompany = () => {
        const payload = {
            'actual_values': editCompany.actual_values.map(e => {
                return {
                    'year': e.year,
                    'value': e.value,
                }
            }),
            'estimation_values': []
        }
        const url = `estimations/${editCompany.id}`;
        postRequest(url, payload, (res) => {
        })
        // const token = localStorage.getItem(ACCESS_TOKEN);
        // console.log('Start request update payload:', payload)
        // fetch(`https://rms-dev.aps.nexus-dev.com/api/v1/estimations/${editCompany.id}`, {
        //     method: "POST",
        //     body: JSON.stringify(payload),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        //     .then(response => response.json())
        //     .then((response) => {
        //         console.log("check response: ", response)
        //     })
        //     .catch((err) => {
        //         console.log("check err: ", err)
        //     })

    }
    const clickInforCompany = (item) => {
        history.push(`/company/${item.id}`)
    }
    return (
        <>
            <div className="Interface">
                <div className="overall-content">
                    <p className="content">Company</p>
                    <div className="title-content">
                        All Companies
                    </div>
                    <div className="toolbars-content">
                        <div className="title-tools">
                            {
                                TABS.map(tab => {
                                    return <button className={tab.title === currentTab.title ? "btn-title-change" : "btn-title-tools"} onClick={() => setCurrentTab(tab)}>{tab.title}</button>
                                })

                            }
                        </div>
                        <div className="folder-tools">
                            <div className="creat-new-list">
                                <i className="far fa-plus-square"></i>
                            </div>
                            <div className="creat-new-list"><i className="fas fa-download"></i></div>
                            <div className="creat-new-list"><i className="fas fa-file-upload"></i></div>


                        </div>
                    </div>
                    <div className="data-table-container">
                        <table className="data-table-title">
                            <thead className="thead-data-table">
                                <tr className="first-thead-data">
                                    <td rowSpan="2" className="border-rights border-bottoms">Ticker</td>
                                    <td rowSpan="2" className="border-rights border-bottoms">Name <i onClick={() => handleClickMyName()} className={hideNameIndex ? "fas fa-arrow-down" : "fas fa-arrow-up"}></i></td>
                                    <td rowSpan="2" className="border-rights border-bottoms">Share Price</td>
                                    <th colSpan="5" className="border-bottoms border-rights">EPS Estimates & Growth</th>
                                    <th colSpan="3" className="border-bottoms border-rights">P/E</th>
                                    <td rowSpan="2" className="border-bottoms"></td>
                                </tr>
                                <tr className="first-thead-data">
                                    <th className="border-bottoms border-rights">2021A</th>
                                    <th className="border-bottoms border-rights">2022E</th>
                                    <th className="border-bottoms border-rights">2023E</th>
                                    <th className="border-bottoms border-rights">2024E</th>
                                    <th className="border-bottoms border-rights">3Y <i className="fas fa-chart-line"></i></th>
                                    <th className="border-bottoms border-rights">2022E</th>
                                    <th className="border-bottoms border-rights">2023E</th>
                                    <th className="border-bottoms border-rights">2024E</th>

                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company) => {
                                    return <tr key={company.id}>
                                        <td className="company-ticker">{company.ticker}</td>
                                        <td id="nameUser"><Link className="company-name" to={`/company/${company.id}`} onClick={() => clickInforCompany(company)} >{company.name}</Link></td>
                                        <td>{parseFloat(company.share_price.value).toFixed(2)}</td>
                                        <td>{parseFloat(company.actual_values[1].value).toFixed(2)}</td>
                                        <td className="company-eps-item">{parseFloat(company.estimation_values.items[0].value).toFixed(2)}
                                            <div className="company-number-change">
                                                <p className={company.estimation_values.items[0].growth_rate > 0 ? "color-green" :
                                                    company.estimation_values.items[0].growth_rate < 0 ? "color-red" : "display-none"}>
                                                    <i className={company.estimation_values.items[0].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}></i>
                                                    {parseFloat(company.estimation_values.items[0].growth_rate).toFixed(2)}%
                                                </p>
                                            </div>
                                        </td>
                                        <td className="company-eps-item">{parseFloat(company.estimation_values.items[1].value).toFixed(2)}
                                            <div className="company-number-change">
                                                <p className={company.estimation_values.items[1].growth_rate > 0 ? "color-green" :
                                                    company.estimation_values.items[1].growth_rate < 0 ? "color-red" : "display-none"}>
                                                    <i className={company.estimation_values.items[1].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}>
                                                    </i>
                                                    {parseFloat(company.estimation_values.items[1].growth_rate).toFixed(2)}%
                                                </p>
                                            </div>
                                        </td>
                                        <td className="company-eps-item">{parseFloat(company.estimation_values.items[2].value).toFixed(2)}
                                            <div className="company-number-change">
                                                <p className={company.estimation_values.items[2].growth_rate > 0 ? "color-green" :
                                                    company.estimation_values.items[2].growth_rate < 0 ? "color-red" : "display-none"}>
                                                    <i className={company.estimation_values.items[2].growth_rate > 0 ? "fas fa-sort-up " : "fas fa-sort-down "}>
                                                    </i>
                                                    {parseFloat(company.estimation_values.items[2].growth_rate).toFixed(2)}%
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
                                        <td>{parseFloat(company.estimation_values.items[0].price_earning_ratio).toFixed(2)}</td>
                                        <td>{parseFloat(company.estimation_values.items[1].price_earning_ratio).toFixed(2)}</td>
                                        <td>{parseFloat(company.estimation_values.items[2].price_earning_ratio).toFixed(2)}</td>
                                        <td className="company-eps-item" onClick={(e) => e.stopPropagation()}><i onClick={() => clickShowUpdate(company)} className="fas fa-ellipsis-v btn-icon-update"></i>
                                            {editCompany.id === company.id && hideUpdate ?
                                                <div className="btn-update-estimate" onClick={() => clickShowUpdateEst()} >Update Estimate</div> :
                                                <div></div>
                                            }
                                        </td>

                                    </tr>
                                })}

                            </tbody>
                        </table>

                    </div>
                    <div className="pagination">
                        <StyledEngineProvider injectFirst>
                            <TablePagination
                                component="div"
                                count={totalItem}
                                rowsPerPageOptions={[10, 20, 50]}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </StyledEngineProvider>
                    </div>
                </div>
                {showUpdateEst &&
                    <div className="modal-update-container">
                        <form>
                            <div className="modal-update-title">{`Update ${editCompany.name}, ${editCompany.ticker}`}</div>
                            <div className="modal-update-infor">
                                <div className="infor-actual-eps">
                                    <h6>Actual EPS</h6>
                                    <table>
                                        <thead>
                                            <tr>
                                                {editCompany.actual_values.map((item) => {
                                                    return <th key={item.id} className="border-rights">{item.year}A</th>
                                                })}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {editCompany.actual_values.map((item) => {
                                                    return <td key={item.id}><input value={parseFloat(item.value).toFixed(2)} maxLength="10" type="number"
                                                        step="any" onChange={(event) => handlechangeEditActual(event, item.id)} /></td>
                                                })}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="infor-actual-eps">
                                    <h6>EPS Estimates & Growth</h6>
                                    <table>
                                        <thead>
                                            <tr>
                                                {editCompany.estimation_values.items.map((item) => {
                                                    return <th key={item.id} className="border-rights">{item.year}E</th>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {editCompany.estimation_values.items.map((item) => {
                                                    return <td key={item.id}><input value={parseFloat(item.value).toFixed(2)} type="text" /></td>
                                                })}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-update-action">
                                <buton className="modal-action-cancel" onClick={() => setShowUpdateEst(false)} >Cancel</buton>
                                <buton className="modal-action-update" onClick={() => clickUpdateCompany()}>Update</buton>
                            </div>
                        </form>
                    </div>
                }
            </div>

        </>
    )
}
export default (Company);