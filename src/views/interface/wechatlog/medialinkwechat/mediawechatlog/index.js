import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest, postRequest, putRequest } from '../../../../../services/index';
import './style.scss'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import { StyledEngineProvider } from '@mui/material/styles';
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
import Moment from "moment";
import dayjs from "dayjs";


function MediaWechat({ searchDateHistory, searchInput }) {
    const param = useParams();
    const [dataMedia, setDataMedia] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [totalDataMedia, setTotalDataMedia] = useState()
    const open = Boolean(anchorEl);
    const moment = require('moment')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [offsetPage, setOffsetpage] = useState(0);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [dataEdit, setDataEdit] = useState(null)
    const [updateEdit, setUpdateEdit] = useState(null)
    const [dataTest, setDataTest] = useState(null)

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    console.log('check data from parent to media child ', searchDateHistory)


    useEffect(() => {
        const url = `wechat/${param.id}/media?search=${searchInput}&${searchDateHistory}&limit=${rowsPerPage}&offset=${offsetPage}&direction=asc`;
        getRequest(url, (data) => {
            setDataMedia(data.list)
            setTotalDataMedia(data.totalCount)
        })

    }, [param, dataEdit, searchDateHistory, searchInput, rowsPerPage, offsetPage])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const clickDataEdit = (data) => {
        setDataEdit(data)
        setUpdateEdit(data.company_tags)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
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
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEditTag = () => {
        setUpdateEdit(null)
        setOpenEdit(false);
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
        const url = `wechat/media/${dataEdit.id}/tags`;
        putRequest(url, payload, (data) => {
            console.log('check data after tag: ', data)
            setDataEdit(data)
        })
        setOpenEdit(false);
        setAnchorEl(null)
    };
    return (
        <>
            <div className="Media-Wechat">
                <div className="media-company-container">
                    {dataMedia && dataMedia.map((item) => {
                        return <div className="media-child-container" key={item.id}>
                            <div className="media-container-content">
                                <div className="media-image">
                                    {/* <img
                                        src="https://rms-dev-storage.s3.amazonaws.com/wechat_media/images/25625330c7b1a6bb85dc5c89f2fb2e9e95d5114eff9906cec706101a5784d92f?AWSAccessKeyId=AKIA3G7VX6DOCURLIAM4&Signature=q2KTJZg3q80fFxL1gd%2BVRkOdhzE%3D&Expires=1684312730"
                                        alt="image"
                                    /> */}
                                </div>
                                <div className="original-image">{item.file.original_file_name}</div>
                                <div className="tag-company-container">
                                    <div className="name-company-container">
                                        {item.company_tags && item.company_tags.map((company) => {
                                            return <div className="name-company">{company}</div>
                                        })}
                                    </div>
                                    {/* <div className="icont-selector-tag" onClick={() => clickEditTagCompany(item)}><i className="fas fa-ellipsis-v"></i></div> */}
                                    <div>
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            className="icont-selector-tag"
                                        >
                                            <i className="fas fa-ellipsis-v" style={{ padding: '5px' }} onClick={() => clickDataEdit(item)}></i>
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
                                            >Delete Photo
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>Download Photo</MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className="pagination">
                    <StyledEngineProvider injectFirst>
                        <TablePagination
                            component="div"
                            count={totalDataMedia}
                            rowsPerPageOptions={[10, 20, 50]}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </StyledEngineProvider>
                </div>
                {/* Edit tag company container */}
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
                                    onChange={(event, value, reason) => setUpdateEdit(value)}
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

            </div >
        </>
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
export default (MediaWechat)