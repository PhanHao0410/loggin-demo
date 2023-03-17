import React, { useState, useEffect } from "react";
import './style.scss';

const TABS = [{ title: 'View all', url: '' }, { title: 'A-Shares', url: 'CNY' }, { title: 'H-Shares', url: 'HKD' }, { title: 'ADRs & Others', url: 'USD' }]
function Company() {
    const [companies, setCompanies] = useState([]);

    const [currentTab, setCurrentTab] = useState(TABS[0])

    // Get DATA View All
    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiYWRtaW4iXSwic3RhdHVzIjoiYWN0aXZlIiwiZXhwIjoxNjc5MDcxNzg5fQ.8lbtQdmTF3AacDZqbcihnXNfyGCUSszIRM5toCNEyrc"
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch(`https://rms-dev.aps.nexus-dev.com/api/v1/companies?fx=${currentTab.url}&limit=10&offset=0&direction=asc&order=name`, { headers })
            .then(response => response.json())
            .then(data => {
                setCompanies(data.list);
            });
    }, [currentTab.title])

    return (
        <div className="Interface">
            <div className="overall-container">
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
                                <i class="far fa-plus-square"></i>
                            </div>
                            <div className="creat-new-list"><i class="fas fa-download"></i></div>
                            <div className="creat-new-list"><i class="fas fa-file-upload"></i></div>


                        </div>
                    </div>
                    <div className="data-table-container">
                        <table className="data-table-title">
                            <thead className="thead-data-table">
                                <tr className="first-thead-data">
                                    <td rowSpan="2" className="border-rights border-bottoms">Ticker</td>
                                    <td rowSpan="2" className="border-rights border-bottoms">Name <i class="fas fa-arrow-down"></i></td>
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
                                    <th className="border-bottoms border-rights">3Y <i class="fas fa-chart-line"></i></th>
                                    <th className="border-bottoms border-rights">2022E</th>
                                    <th className="border-bottoms border-rights">2023E</th>
                                    <th className="border-bottoms border-rights">2024E</th>

                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company) => {
                                    return <tr key={company.id}>
                                        <td className="company-ticker">{company.ticker}</td>
                                        <td className="company-name">{company.name}</td>
                                        <td>{parseFloat(company.share_price.value).toFixed(2)}</td>
                                        <td>{parseFloat(company.actual_values[1].value).toFixed(2)}</td>
                                        <td className="company-eps-item">{parseFloat(company.estimation_values.items[0].value).toFixed(2)}
                                            <div className="company-number-change">
                                                <p className={company.estimation_values.items[0].growth_rate > 0 ? "color-green" :
                                                    company.estimation_values.items[0].growth_rate < 0 ? "color-red" : "display-none"}>
                                                    <i class={company.estimation_values.items[0].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}></i>
                                                    {parseFloat(company.estimation_values.items[0].growth_rate).toFixed(2)}%
                                                </p>
                                            </div>
                                        </td>
                                        <td className="company-eps-item">{parseFloat(company.estimation_values.items[1].value).toFixed(2)}
                                            <div className="company-number-change">
                                                <p className={company.estimation_values.items[1].growth_rate > 0 ? "color-green" :
                                                    company.estimation_values.items[1].growth_rate < 0 ? "color-red" : "display-none"}>
                                                    <i class={company.estimation_values.items[1].growth_rate > 0 ? "fas fa-sort-up" : "fas fa-sort-down "}>
                                                    </i>
                                                    {parseFloat(company.estimation_values.items[1].growth_rate).toFixed(2)}%
                                                </p>
                                            </div>
                                        </td>
                                        <td className="company-eps-item">{parseFloat(company.estimation_values.items[2].value).toFixed(2)}
                                            <div className="company-number-change">
                                                <p className={company.estimation_values.items[2].growth_rate > 0 ? "color-green" :
                                                    company.estimation_values.items[2].growth_rate < 0 ? "color-red" : "display-none"}>
                                                    <i class={company.estimation_values.items[2].growth_rate > 0 ? "fas fa-sort-up " : "fas fa-sort-down "}>
                                                    </i>
                                                    {parseFloat(company.estimation_values.items[2].growth_rate).toFixed(2)}%
                                                </p>
                                            </div>
                                        </td>
                                        <td className="company-eps-item">
                                            <div className="company-number-change">
                                                <p className={company.estimation_values.average_growth > 0 ? "color-green" :
                                                    company.estimation_values.average_growth < 0 ? "color-red" : "display-none"}>
                                                    <i class={company.estimation_values.average_growth > 0 ? "fas fa-sort-up color-green" : "fas fa-sort-down "}>
                                                    </i>
                                                    {parseFloat(company.estimation_values.average_growth).toFixed(2)}%
                                                </p>
                                            </div>
                                        </td>
                                        <td>{parseFloat(company.estimation_values.items[0].price_earning_ratio).toFixed(2)}</td>
                                        <td>{parseFloat(company.estimation_values.items[1].price_earning_ratio).toFixed(2)}</td>
                                        <td>{parseFloat(company.estimation_values.items[2].price_earning_ratio).toFixed(2)}</td>
                                        <td><i class="fas fa-ellipsis-v"></i></td>
                                    </tr>
                                })}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default (Company);