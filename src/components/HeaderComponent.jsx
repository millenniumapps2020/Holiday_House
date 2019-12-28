import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router';

import { SCREENS } from '../common/Constants'

class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuList: ["Shortlist", "List my house", "Help", "Login"],
            showMenu: false
        }
    }

    onClickMenuBtn = () => {
        this.setState({ showMenu: true })
    }

    onClickCloseMenuBtn = () => {
        this.setState({ showMenu: false })
    }

    onClickMenu = (menu) => {
        if (menu === "Shortlist") {
            this.props.history.push(SCREENS.SHORTLIST)
        }
    }

    gotoHome = () => {
        this.props.history.push(SCREENS.HOME)
    }

    render() {
        const { menuList, showMenu } = this.state;

        return (
            <div className="headerComp">
                <div className="header-base">
                    <div >
                        <img className="logo"
                            src="https://www.holidayhouses.co.nz/ReactApp/images/brand/hh-full-dark.svg"
                            onClick={this.gotoHome}
                        />
                    </div>
                    <div className="lg-view-flex menus">
                        {menuList.map((item, index) => {
                            return (
                                <div onClick={() => this.onClickMenu(item)}>
                                    {item}
                                    {
                                        (item === "Shortlist" && this.props.houseCount) ?
                                            <span className="shortlist-bubble">{this.props.houseCount}</span>
                                            : null
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className="sm-view menu-icon-div">
                        {
                            showMenu ?
                                <i class="fa fa-bars" onClick={this.onClickCloseMenuBtn}>B</i>
                                :
                                <i class="fa fa-bars" onClick={this.onClickMenuBtn}>A</i>

                        }
                        <i class="fa fa-bars"></i>
                    </div>
                </div>
                <div className={`dropdown-content ${showMenu ? 'show' : 'hide'}`}>
                    {menuList.map((item, index) => {
                        return (
                            <div className="menu-item">{item}</div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ shortList }) => {
    return {
        houseCount: shortList.houseCount
    }
}

export default connect(mapStateToProps, null)(withRouter(HeaderComponent));
