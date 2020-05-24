import React, { Component } from 'react'
import { connect } from "react-redux";

import { showAppDialog } from '../state/actions/actions'

import './appDialog.css'

class AppDialogComponent extends Component {

    onClose = () => {
        this.props.appDialog.closeCB && this.props.appDialog.closeCB()
        this.props.showAppDialog({ show: false })
    }

    onButtonClick = (cb) => {
        cb && cb();
        this.onClose()
    }

    render() {
        const { appDialog } = this.props

        if (!appDialog.dialog.show)
            return null
        else
            return (
                <div className='appModal-dialog'>
                    <div className='window'>
                        <div className='title' id="title">
                            <h6 className='modalTitle'>{appDialog.dialog.title ? appDialog.dialog.title : "NZStays"}</h6>
                        </div>
                        <div className='content'>
                            {appDialog.dialog.message}
                        </div>
                        <div className='footer'>
                            <button
                                className="negativeBtn"
                                onClick={this.onClose}
                            >
                                {appDialog.dialog.defaultBtnName ? appDialog.dialog.defaultBtnName : "CLOSE"}
                            </button>
                            {
                                appDialog.dialog.buttons && appDialog.dialog.buttons.map((data, index) => {
                                    return (
                                        <button test_id={data.test_id} key={index} className={`button-flat positiveBtn ${data.className}`}
                                            tabIndex={index + 1}
                                            onClick={() => { this.onButtonClick(data.action) }}
                                        >
                                            {data.name}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = ({ appDialog }) => {
    return {
        appDialog: appDialog
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAppDialog: (data) => { dispatch(showAppDialog(data)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDialogComponent);