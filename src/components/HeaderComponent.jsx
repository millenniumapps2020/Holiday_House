import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router';

import LoginSignUpModal from './LoginSignUpModalComponent'

import { storeLoggedUser } from '../state/actions/actions'

import { SCREENS } from '../common/Constants'
import PlacesSearchComponent from './PlacesSearchComponent';
import GuestCountComponent from './GuestCountComponent';
import PriceComponent from './PriceComponent';
import DateComponent from './DateComponent';
import images from '../assets/images';


class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuList: ["Shortlist", "List my house", "Help"],
            showMenu: false,
            openLoginModal: false,
            selectedSlideMenu: "gallery"
        }
    }

    componentDidMount() {
        this.props.onClickSlideMenuCB && this.props.onClickSlideMenuCB(this.state.selectedSlideMenu)
    }

    onClickMenuBtn = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }


    onClickMenu = (menu) => {
        if (menu === "Shortlist") {
            this.props.history.push(SCREENS.SHORTLIST)
        } else if (menu === "Map Test") {
            this.props.history.push(SCREENS.MAP)
        }
    }

    onClickLogin = () => {
        this.setState({ openLoginModal: true })
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

    onClickLogout = () => {
        this.props.storeLoggedUser("")
    }
    searchCallBack(location) {

    }
    render() {
        const { menuList, showMenu, openLoginModal } = this.state;

        return (
            <div className="headerComp">
                <div className="header-base">
                    <div >
                        <img
                            className="logo"
                            src={images.icons.nz_logo}
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
                        {
                            this.props.userName ?
                                <div className="userInfo-div">
                                    <div className="userName">Hi {this.props.userName}</div>
                                    <div className="fa fa-sign-out-alt logout-btn"
                                        onClick={this.onClickLogout}
                                    ></div>
                                </div>
                                :
                                <div onClick={this.onClickLogin}>
                                    Login
                                </div>
                        }
                    </div>
                    <div className="sm-view menu-icon-div">
                        {
                            showMenu ?
                                <img
                                    className="icon"
                                    src={images.icons.close}
                                    onClick={this.gotoHome}
                                    onClick={this.onClickMenuBtn}
                                />
                                :
                                <img
                                    className="icon"
                                    src={images.icons.menu}
                                    onClick={this.onClickMenuBtn}
                                />
                        }
                    </div>
                </div>

                <div className={`dropdown-content ${showMenu ? 'sm-view show' : 'hide'}`}>
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
                                <div style={{ width: 250 }}>
                                    <PlacesSearchComponent name={this.props.key} name="homeSearch" onCallBack={(location) => this.searchCallBack(location)} />
                                </div>
                                <div style={{ width: 250 }}>
                                    <DateComponent setDate={(date, key) => { this.setState({ [key]: date }) }} />
                                </div>
                                <GuestCountComponent name="headerPage" onSetGuestDetails={(details) => this.setState({ guest_details: details })} />
                                <PriceComponent name="headerPage" />
                                <div className="tab last">Online Payment</div>
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


const mapStateToProps = ({ shortList, login }) => {
    return {
        houseCount: shortList.houseCount,
        userName: login.userName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeLoggedUser: (data) => { dispatch(storeLoggedUser(data)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent));
