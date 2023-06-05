import React, { useState, useEffect } from "react";
import { getRequest } from "../../../../services";
import { useParams } from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';
import { StyledEngineProvider } from '@mui/material/styles';
import './style.scss';
import Moment from 'react-moment';

function ModelCompany({ podisition }) {
    const params = useParams();
    const [dataCompany, setDataCompany] = useState({});
    const [historyCompany, setHistoryCompany] = useState([]);
    const [currentTab, setCurrentTab] = useState({});
    const [hideIconIndex, setHideIconIndex] = useState(true);
    const [direction, setDirection] = useState('desc')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [offsetPage, setOffsetpage] = useState(0);
    const moment = require('moment');
    useEffect(() => {
        const url = `company-files/${params.id}?order=created_at&name=&limit=${rowsPerPage}&direction=${direction}&offset=${offsetPage}${podisition.types}`;
        getRequest(url, (data) => {
            setDataCompany(data)
            setHistoryCompany(data.list)
        })
    }, [params.id, podisition, direction, rowsPerPage, offsetPage])
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
    const clickHidenIconUpDown = () => {
        setHideIconIndex(!hideIconIndex);
        hideIconIndex ? setDirection('asc') : setDirection('desc')
    }

    return (
        <div className="ModelCompany">
            <div className="overall-container">
                <div className="overall-content">
                    <table>
                        <thead>
                            <tr>
                                <th>{podisition.title === 'All Files/Links' ? `All Files/Links` : `File Name`}</th>
                                <th className="upload-on-icon"><p>Uploaded on</p>
                                    <i className={hideIconIndex ? "fas fa-arrow-down" : "fas fa-arrow-up"} onClick={() => clickHidenIconUpDown()}></i>
                                </th>
                                <th>Uploaded by</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyCompany.map((item) => {
                                return <tr key={item.id}>
                                    <td className="update-file-name">{item.file.original_file_name.split('.').slice(0, -1).join('.')}</td>
                                    <td>{moment(item.updated_at).format('DD MMMM YYYY')}</td>
                                    <td>{item.uploaded_by}</td>
                                    <td>{item.file.original_file_name.split('.').pop()}</td>
                                    <td>{item.file.file_size}</td>
                                    <td className="icon-action"><i className="fas fa-ellipsis-v"></i></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    <div className="pagination">
                        <StyledEngineProvider injectFirst>
                            <TablePagination
                                component="div"
                                count={dataCompany.totalCount}
                                rowsPerPageOptions={[10, 20, 50]}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </StyledEngineProvider>
                    </div>
                </div>

            </div>

        </div>
    )

}
export default (ModelCompany)