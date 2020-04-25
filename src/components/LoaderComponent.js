import React, { Component } from 'react'

import './LoaderComponent.css'

export default class LoaderComponent extends Component {
    render() {
        console.log('this.props.height',this.props.height)
        return <div className="loader-wrap"  style={{height:this.props.height?this.props.height:"100%"}}>
            <div class="loader"></div>
        </div>;
    }
}