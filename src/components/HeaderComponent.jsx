import React, { Component } from 'react'

class HeaderComponent extends Component {
    render() {
        return (
            <div className="header-base">
                <div>holiday house</div>
                <div className="menus">
                    <div>Shortlist</div>
                    <div>List my house</div>
                    <div>Help</div>
                    <div>Login</div>
                </div>
                <div className="menu-base">
                    <i class="fa fa-bars"></i>
                    <div className="dropdown-content">

                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderComponent;
