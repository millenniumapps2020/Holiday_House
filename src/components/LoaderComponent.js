import React, { Component } from 'react'

import './LoaderComponent.css'

export default class LoaderComponent extends Component {
    render() {
        return <div className="loader-wrap"  style={{height:this.props.height?this.props.height:"100%",backgroundColor:'tranparent'}}>
            <div class="loader"></div>
        </div>;
    }
}