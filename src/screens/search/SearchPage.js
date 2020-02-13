import React, { Component } from 'react'

import Header from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'

class SearchPage extends Component {
    render() {
        return (
            <div>
                <Header showSearch={true} />
                <div className="search-base">
                    Search
                </div>
                <Footer />
            </div>
        )
    }
}

export default SearchPage;