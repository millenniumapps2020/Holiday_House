import React, { Component } from 'react'

class RatingStartComponent extends Component {

    render() {
        var activeStar = [
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
        ]
        return (
            <div className="rating-star">
                {this.props.rating != undefined && (activeStar[(+this.props.rating)]).map(item => {
                    return (<div className={"rating-star__img d-inline-flex " + (item == 1 ? "filled" : "empty")}></div>);
                })}
            </div>
        )
    }
}

export default RatingStartComponent;