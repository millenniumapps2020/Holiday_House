import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';

class PaypalPayment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            client: {
                sandbox: 'Your-Sandbox-Client-ID',
                production: 'Your-Production-Client-ID',
            },
            env: 'sandbox',         // you can set this string to 'production'
            currency: 'USD',        // you can set this string from your props or state
            total: 1                // this is the total amount (based on currency) to charge
        }
    }

    onSuccess = (payment) => {
        // 1, 2, and ... Poof! You made it, everything's fine and dandy!
        console.log("Payment successful!", payment);
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }

    onCancel = (data) => {
        // The user pressed "cancel" or closed the PayPal popup
        console.log('Payment cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    onError = (err) => {
        // The main Paypal script could not be loaded or something blocked the script from loading
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }

    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    render() {
        const { env, client, currency, total, onError, onSuccess, onCancel } = this.state;
        return (
            <div>
                <PaypalExpressBtn env={env} client={client}
                    currency={currency} total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                />
            </div>
        )
    }
}

export default PaypalPayment;