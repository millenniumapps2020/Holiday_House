import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router';

import LoginSignUpModal from './LoginSignUpModalComponent'

import { SCREENS } from '../common/Constants'

class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuList: ["Shortlist", "List my house", "Help", "Login", "Map Test"],
            showMenu: false,
            openLoginModal: false,
            selectedSlideMenu: "map"
        }
    }

    componentDidMount() {
        this.props.onClickSlideMenuCB && this.props.onClickSlideMenuCB(this.state.selectedSlideMenu)
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
        } else if (menu === "Login") {
            this.setState({ openLoginModal: true })
        } else if (menu === "Map Test") {
            this.props.history.push(SCREENS.MAP)
        }
    }

    gotoHome = () => {
        this.props.history.push(SCREENS.HOME)
    }

    closeDialog = () => {
        this.setState({ openLoginModal: false })
    }

    onClickSlideMenu = (menu) => {
        this.setState({ selectedSlideMenu: menu })
        this.props.onClickSlideMenuCB && this.props.onClickSlideMenuCB(menu)
    }

    render() {
        const { menuList, showMenu, openLoginModal } = this.state;

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
                            <div className="menu-item" onClick={() => this.onClickMenu(item)}>
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

                {
                    this.props.showSearch ?
                        <div className="header-search">
                            <div className="filter-div">
                                <input type="text" className="search-input"
                                    placeholder="Where would you like to go?"
                                />
                                <div className="tab">Dates</div>
                                <div className="tab">Guests</div>
                                <div className="tab">Price</div>
                                <div className="tab last">Filters</div>
                            </div>
                            <div className="map-galary">
                                <div className={`tab-slider-bar ${this.state.selectedSlideMenu === 'gallery' ? 'slide' : ''}`}>
                                    <div className={`tab ${this.state.selectedSlideMenu === "map" ? 'active' : ''}`}
                                        onClick={() => this.onClickSlideMenu('map')}
                                    >
                                        Map
                                    </div>
                                    <div className={`tab ${this.state.selectedSlideMenu === "gallery" ? 'active' : ''}`}
                                        onClick={() => this.onClickSlideMenu('gallery')}
                                    >
                                        Gallery
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }

                {
                    openLoginModal ?
                        <LoginSignUpModal closeDialogCB={this.closeDialog} />
                        : null
                }

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
