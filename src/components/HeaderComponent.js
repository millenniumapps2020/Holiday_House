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
import './HeaderComponentStyle.css'
import FiltersComponent from './FiltersComponent';


class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuList: ["Shortlist", "List my house", "Help"],
            showMenu: false,
            openLoginModal: false,
            selectedSlideMenu: "map",
            location: '',
            online_payment: false,
            filterDetails: {
                basicsRadioButton: {
                },
                bedroom: 1,
                keywords: '',
            }
        }
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
        this.setState({ location: location }, () => {
            this.searchUpdate();
        })
    }
    searchUpdate = () => {
        var { location, checkIndate, checkOutdate, guest_details, online_payment, priceRange, filterDetails } = this.state;
        var data = {
            location: location,
            checkIndate: checkIndate,
            checkOutdate: checkOutdate,
            guest_details: guest_details,
            payment: online_payment ? 'Online Payment' : "",
            price: priceRange,
            filterDetails: filterDetails
        }
        if (this.props.searchCallback(data)) {
            this.props.searchCallback(data)
        }
    }
    updatePriceDetails = (data) => {
        this.setState({ priceRange: data }, () => {
            this.searchUpdate()
        })
    }
    filterDetails = (data) => {
        this.setState({ filterDetails: data }, () => {
            this.searchUpdate()
        })
    }
    render() {
        const { menuList, showMenu, openLoginModal, online_payment } = this.state;

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
                    {this.props.name == "searchHeader" ? <div className="header-search-suggestion">
                        <PlacesSearchComponent name="headerSearch" onCallBack={(location) => this.searchCallBack(location)} />
                    </div> : null}
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
                                <div className="searchinput-border-wrap subheader-search-suggestion">
                                    <PlacesSearchComponent name={this.props.key} name="subheaderSearch" onCallBack={(location) => this.searchCallBack(location)} />
                                </div>
                                <div className="searchinput-border-wrap">
                                    <DateComponent name="subheaderDate" setDate={(date, key) => {
                                        this.setState({ [key]: date }, () => {
                                            if (key == "checkOutdate") {
                                                this.searchUpdate()
                                            }
                                        })
                                    }} />
                                </div>
                                <GuestCountComponent name="headerPage" onSetGuestDetails={(details) => this.setState({ guest_details: details }, () => {
                                    this.searchUpdate()
                                })} />
                                <PriceComponent name="headerPage" onCallBack={(data) => this.updatePriceDetails(data)} />
                                <div className={"tab  d-none d-xl-block btn btn-basic " + (online_payment ? "selected-search-btn" : "")} onClick={() => this.setState({ online_payment: !online_payment }, () => {
                                    this.searchUpdate()
                                })}>Online Payment {online_payment ? <img className="payment-tick-icon" src={images.icons.circle_tick}></img> : null}</div>
                                <FiltersComponent name="subHeader" onCallBack={(data) => this.filterDetails(data)} />
                            </div>
                            {console.log('this.state.selectedSlideMenu',this.state.selectedSlideMenu)}
                            <div className="map-galary d-none d-lg-block">
                                <div className={`tab-slider-bar ${this.state.selectedSlideMenu === 'gallery' ? 'slide' : ''}`}>
                                    <div className={("tab " + (this.state.selectedSlideMenu == "map" ? 'active' : ''))}
                                        onClick={() => this.onClickSlideMenu('map')}
                                    >
                                        Map
                                    </div>
                                    <div className={`tab ${this.state.selectedSlideMenu == "gallery" ? 'active' : ''}`}
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

            </div >
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
