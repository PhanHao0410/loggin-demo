import React, { useState, useEffect } from "react";
import './style.scss';
import { getRequest } from "../../../services";
import Moment from "react-moment";
import TablePagination from '@mui/material/TablePagination';
import { StyledEngineProvider } from '@mui/material/styles';
import { Button, List, ListItem, Drawer, Divider, PaperProps } from "@mui/material";
import { height } from "@mui/system";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AuditTrail() {
    const [dataAudittrail, setDataAudittrail] = useState(null);
    const moment = require('moment')
    const [direction, setDirection] = useState('desc');
    const [hideIconIndex, setHideIconIndex] = useState(true)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [offsetPage, setOffsetpage] = useState(0);
    const [totalData, setTotalData] = useState()
    const [modalDrawer, setModalDrawer] = useState(false)
    const [valueDateStart, setValueDateStart] = useState(null)
    const [valueDateEnd, setValueDateEnd] = useState(null)
    const [searchDateHistory, setSearchDateHistory] = useState('')

    useEffect(() => {
        const url = `histories?order=created_at&limit=${rowsPerPage}&offset=${offsetPage}&direction=${direction}${searchDateHistory}`;
        getRequest(url, (data) => {
            console.log('check data audittrail: ', data)
            setDataAudittrail(data.list)
            setTotalData(data.totalCount)
        })

    }, [direction, rowsPerPage, offsetPage, direction, searchDateHistory])

    const toggleDrawer = (open) => (event) => {
        setModalDrawer(open)
    }
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
    const clickDirectionDate = () => {
        setHideIconIndex(!hideIconIndex)
        hideIconIndex ? setDirection('asc') : setDirection('desc')
    }
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
    console.log('check value date start: ', valueDateStart)
    console.log('check value date end: ', valueDateEnd)
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
                            <div className="creat-new-list" onClick={toggleDrawer(true)}><i className="fas fa-sliders-h"></i></div>
                        </div>
                    </div>
                    <div className="table-data">
                        <table>
                            <thead>
                                <tr>
                                    <th className="upload-on-icon"><p>Timestamp</p>
                                        <i onClick={() => clickDirectionDate()} className={hideIconIndex ? "fas fa-arrow-down" : "fas fa-arrow-up"}></i>
                                    </th>
                                    <th className="text-align-right">User</th>
                                    <th className="text-align-right">Page ID</th>
                                    <th className="text-align-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataAudittrail && dataAudittrail.map((item) => {
                                    return <tr key={item.id}>
                                        <td className="update-file-name">{moment.unix(item.created_at).format('DD MMMM YYYY HH:mm:ss')}</td>
                                        <td className="link-company-tag text-align-right">{item.user.name}</td>
                                        <td className="source-company-tag text-align-right">{item.action === 'sign_in' ? 'Sign In' : item.action === 'log_out' ? 'Log out' : `Single Company / ${item.company.name}`}</td>
                                        <td className="icon-action text-align-right">{item.action === 'sign_in' && !item.aciton_input ? 'Signed In' : item.action === 'log_out' && !item.aciton_input ? 'Logged Out' : `Update Overview Information Editted`}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <StyledEngineProvider injectFirst>
                                <TablePagination
                                    component="div"
                                    count={totalData}
                                    rowsPerPageOptions={[10, 20, 50]}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </StyledEngineProvider>
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
            </div>

        </div>
    )
}
export default (AuditTrail);