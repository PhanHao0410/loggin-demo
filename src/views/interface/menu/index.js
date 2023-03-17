import React, { useState } from "react";
import Company from "../company/index";
import MeetingLog from "../meetinglog/index";
import WechatLog from "../wechatlog/index";
import AuditTrail from "../audittrail/index";
import "./style.scss";
import { HashRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, PATHS } from '../../../constants';

function Menu() {
    const [hideMenuStatic, setHideMenuStatic] = useState(false)
    const [hideComp, setHideComp] = useState(true)
    const [hideMeet, setHideMeet] = useState(false)
    const [hideWechat, setHideWechat] = useState(false)
    const [hideAudi, setHideAudi] = useState(false)
    const [hideLanguage, setHideLanguage] = useState(false)
    const [hideLogOut, setHideLogOut] = useState(false)
    const history = useHistory()
    function clickCompanies() {
        setHideComp(true)
        setHideMeet(false)
        setHideWechat(false)
        setHideAudi(false)
        history.push(PATHS.COMPANY)
    }
    function clickMeetingLog() {
        setHideComp(false)
        setHideMeet(true)
        setHideWechat(false)
        setHideAudi(false)
        history.push(PATHS.MEETINGLOG)
    }
    function clickWechatLog() {
        setHideComp(false)
        setHideMeet(false)
        setHideWechat(true)
        setHideAudi(false)
        history.push(PATHS.WECHATLOG)
    }
    function clickAuditTrail() {
        setHideComp(false)
        setHideMeet(false)
        setHideWechat(false)
        setHideAudi(true)
        history.push(PATHS.AUDITTRAIL)
    }
    const clickHandleLogOut = () => {
        localStorage.clear()
        history.push(PATHS.LOGIN)
    }
    return (
        <div className="Menu">
            <div className={hideMenuStatic ? "menu-selector-small" : "menu-container"}>
                <div className="menu-static">
                    <i className="fas fa-project-diagram"></i>
                    <p className="p-menu-static">RMS</p>
                </div>
                <div className="menu-selector">

                    <div onClick={() => clickCompanies()} className={hideComp ? "menu-item" : "seleter-item"}>
                        <i className="fas fa-city"></i>
                        <p>Companies</p>
                    </div>
                    <div onClick={() => clickMeetingLog()} className={hideMeet ? "menu-item" : "seleter-item"}>
                        <i className="fas fa-users"></i>
                        <p>Meeting Log</p>
                    </div>
                    <div onClick={() => clickWechatLog()} className={hideWechat ? "menu-item" : "seleter-item"}>
                        <i className="far fa-comment"></i>
                        <p>Wechat Log</p>
                    </div>
                    <div onClick={() => clickAuditTrail()} className={hideAudi ? "menu-item" : "seleter-item"}>
                        <i className="fas fa-desktop"></i>
                        <p>Audit Trail</p>
                    </div>
                </div>
            </div>
            <div className="overall-container">
                <div className="overall-tools">
                    <div className="overall-left">
                        <i onClick={() => setHideMenuStatic(!hideMenuStatic)} className={hideMenuStatic ? "fas fa-bars icon-menu" : "fas fa-outdent icon-menu"}></i>
                        <div className="input-search-company">
                            <i class="fas fa-search icon-search"></i>
                            <input type="text" placeholder="Search a company name or ticker" />
                        </div>
                    </div>
                    <div className="overall-right">
                        <div onClick={() => setHideLanguage(!hideLanguage)} className="btn-language">
                            文A
                            {hideLanguage &&
                                <div className="language-total">
                                    <div className="language-item">English</div>
                                    <div className="language-item">简体中文</div>
                                </div>
                            }
                        </div>

                        <div onClick={() => setHideLogOut(!hideLogOut)} className="btn-user-signIn">
                            <div className="avatar-user">D</div>
                            <div className="name-user-login" >User

                            </div>
                            {hideLogOut && !hideLanguage &&
                                <div className="log-out-user" onClick={() => clickHandleLogOut()}>Log out</div>
                            }
                        </div>

                    </div>
                </div>
                <Router>
                    <Switch>
                        <Route path={PATHS.COMPANY} component={Company} />
                        <Route path={PATHS.MEETINGLOG} component={MeetingLog} />
                        <Route path={PATHS.WECHATLOG} component={WechatLog} />
                        <Route path={PATHS.AUDITTRAIL} component={AuditTrail} />
                        <Route path="/" component={Company} />
                    </Switch>
                </Router>
            </div>

        </div>

    )
}
export default (Menu);