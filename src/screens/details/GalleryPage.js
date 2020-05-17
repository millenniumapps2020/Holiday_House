import React, { Component } from 'react'

class GalleryPage extends Component {

    constructor(props) {
        super(props)
        console.log('propsss', props)
    }

    render() {
        const { images } = this.props
        return (
            <div className="gallery-base">
                <div className="header">
                    <h1>
                        {this.props.name}
                    </h1>
                    <button className="themeBtn"
                        onClick={this.props.onClickBack}
                    >
                        Back to listing
                    </button>
                </div>
                <div className="img-div">
                    {
                        (images && images.length) ?
                            images.map((item, index) => {
                                return (
                                    <div key={index} className={`photo ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <img
                                            src={item.imageUrl}
                                        />
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default GalleryPage;