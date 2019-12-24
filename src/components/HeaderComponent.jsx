import React, { Component } from 'react'

class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuList: ["Shortlist", "List my house", "Help", "Login"],
            showMenu: false
        }
    }

    onClickMenu = () => {
        this.setState({ showMenu: true })
    }

    onClickCloseMenu = () => {
        this.setState({ showMenu: false })
    }

    render() {
        const { menuList, showMenu } = this.state;

        return (
            <div className="headerComp">
                <div className="header-base">
                    <div>holiday house</div>
                    <div className="lg-view-flex menus">
                        {menuList.map((item, index) => {
                            return (
                                <div>{item}</div>
                            )
                        })}
                    </div>
                    <div className="sm-view menu-icon-div">
                        {
                            showMenu ?
                                <i class="fa fa-bars" onClick={this.onClickCloseMenu}>B</i>
                                :
                                <i class="fa fa-bars" onClick={this.onClickMenu}>A</i>

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

export default HeaderComponent;
