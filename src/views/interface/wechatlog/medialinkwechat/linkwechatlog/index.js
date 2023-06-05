import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import { getRequest, postRequest, putRequest } from '../../../../../services/index';
import './style.scss';
import Moment from 'react-moment';
import TablePagination from '@mui/material/TablePagination';
import { StyledEngineProvider } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


function LinkWechat({ searchDateHistory, searchInput }) {
    const param = useParams();
    const [dataLink, setDataLink] = useState(null)
    const [hideIconIndex, setHideIconIndex] = useState(true)
    const [totalDataLink, setTotalDataLink] = useState()
    const moment = require('moment');
    const location = useLocation()
    const history = useHistory()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [offsetPage, setOffsetpage] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [dataEdit, setDataEdit] = useState()
    const [updateEdit, setUpdateEdit] = useState()
    const [direction, setDirection] = useState('asc');

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    console.log('check param id: ', param.id)
    console.log('check search input link: ', searchInput)


    useEffect(() => {
        const url = `wechat/${param.id}/links?company_tags=[]&sources=[]&search=${searchInput}&${searchDateHistory}&limit=${rowsPerPage}&offset=${offsetPage}&direction=${direction}&order=sent_at`;
        getRequest(url, (data) => {
            console.log('check data media: ', data)
            setDataLink(data.list)
            setTotalDataLink(data.totalCount)
        })

    }, [param, dataEdit, searchDateHistory, searchInput, rowsPerPage, offsetPage, direction])
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
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const clickDataEdit = (data) => {
        setDataEdit(data)
        console.log('check data edit company: ', data)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEditTag = () => {
        setDataEdit()
        setOpenEdit(false);
        setAnchorEl(null);
    };
    const handleAddEditTag = () => {
        const insertTag = updateEdit.filter(x => !dataEdit.company_tags.includes(x));
        const removeTag = dataEdit.company_tags.filter(x => !updateEdit.includes(x));
        console.log('check insert tag: ', insertTag)
        console.log('check remove tag: ', removeTag)
        const payload = {
            'insert_tags': insertTag,
            'remove_tags': removeTag
        }
        const url = `wechat/link/${dataEdit.id}/tags`;
        putRequest(url, payload, (data) => {
            console.log('check data after tag: ', data)
            setDataEdit(data)
        })
        setOpenEdit(false);
        setAnchorEl(null)
    };
    const clickDirectionDate = () => {
        setHideIconIndex(!hideIconIndex)
        hideIconIndex ? setDirection('desc') : setDirection('asc')
    }
    console.log('check update edit new value: ', updateEdit)
    return (
        <div className="Link-wechat">
            <div className="table-data">
                <table>
                    <thead>
                        <tr>
                            <th className="upload-on-icon"><p>Date</p>
                                <i onClick={() => clickDirectionDate()} className={hideIconIndex ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
                            </th>
                            <th>Shared Links</th>
                            <th>Source</th>
                            <th>Related Companies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataLink && dataLink.map((item) => {
                            return <tr key={item.id}>
                                <td className="update-file-name">{moment.unix(item.sent_at).format('DD MMMM YYYY HH:mm:ss')}</td>
                                <td className="link-company-tag"><a href={`${item.link}`} target="_blank">{item.link}</a></td>
                                <td className="source-company-tag">{item.source}</td>
                                <td className="icon-action">
                                    <div className="tag-company-container">
                                        {item.company_tags && item.company_tags.map((tag) => {
                                            return <div className="tag-company-link"><p>{tag}</p></div>
                                        })}

                                        {/* <i className="fas fa-ellipsis-v"></i> */}
                                        <div>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                className="icont-selector-tag"
                                            >
                                                <i className="fas fa-ellipsis-v" style={{ padding: '5px', color: 'black' }} onClick={() => clickDataEdit(item)}></i>
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                                PaperProps={{
                                                    style: {
                                                        boxShadow: 'none',
                                                    },
                                                }}
                                            >
                                                <MenuItem onClick={() => handleClickOpenEdit()}>Edit Tag</MenuItem>
                                                <MenuItem onClick={handleClose}
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >Delete URL
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
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
                        count={totalDataLink}
                        rowsPerPageOptions={[10, 20, 50]}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </StyledEngineProvider>
            </div>
            <div className="open-edit-tag">
                <Dialog
                    open={openEdit}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"
                        style={{
                            fontSize: "20px",
                            fontWeight: "600"
                        }}
                    >
                        {"Add a Tag"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={totalCompany}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                defaultValue={dataEdit && dataEdit.company_tags}
                                onChange={(event, value) => setUpdateEdit(value)}
                                value={updateEdit}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Select company" />
                                )}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditTag}
                            style={{
                                color: 'RGB(213 58 58)',
                                fontSize: '16px'
                            }}
                        >CANCEL</Button>
                        <Button onClick={handleAddEditTag}
                            style={{
                                color: 'rgb(105,105,105)',
                                fontSize: '16px'
                            }}
                            autoFocus>
                            ADD
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}
const totalCompany = [
    'AGORA INC-ADR',
    'ALIBABA GRP-ADR',
    'ANHUI CONCH-A',
    'APPLE INC',
    'ASIAINFO TECHNOLOGIES LTD',
    'AUTOHOME INC-ADR',
    'BILIBILI INC-CLASSZ',
    'BEIJING VENUSTECH INC-A',
    'CHENGDU HONGQI CHAIN CO LTD-A',
    'CHINA INTERNAT-H',
    'CHINA LIFE INSURANCE CO-A',
    'CHINA LIFE INSURANCE CO-H',
    'CHINA MERCH BK-A',
    'CHINA MOBILE LTD',
    'CHINA MOBILE LTD-A',
    'CHINA RESOURCES MEDICAL HLD',
    'CHINA RESOURCES SANJIU MED A',
    'CHINA SUNTIEN GREEN ENERGY-H',
    'CHINA TOURISM DUTY FREE CORP-A',
    'CHINA VANKE CO LTD -A',
    'FTSE CHINA MAY 2022',
    'FULL TRUCK ALLIANCE -SPN ADR',
    'FUYAO GLASS INDUSTRY GROUP - H',
    'GREE ELECTRIC APPLIANCES INC',
    'JACK TECHNOLOGY',
    'JIANGSU YANGHE BREWERY -A'
];
export default (LinkWechat)