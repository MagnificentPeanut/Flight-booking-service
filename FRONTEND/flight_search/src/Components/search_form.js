import React, { Component } from 'react'

export class Form extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            origin: '',
            destination: ''
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleOriginChange = (event) => {
        this.setState({
            origin: event.target.value
        })
    }

    handleDestinationChange = (event) => {
        this.setState({
            destination: event.target.value
        })
    }

    handleSubmit = event => {
        alert(`Hello ${this.state.origin}, you have registered successfully!`)
        console.log(this.state);
        event.preventDefault()
    }

    handleReset = () => {
        this.setState({
            origin: '',
            destination: '',
        })
    }

    render() {
        const { origin, destination } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Origin: </label>
                    <input type='text' value={origin} autoFocus required
                    onChange={this.handleOriginChange}
                    />
                    <label>Destination: </label>
                    <input type='text' value={destination} 
                    onChange={this.handleDestinationChange}
                    />
                </div>
                <button type='submit'>Search</button>
                <button type='reset' onClick={this.handleReset}>Reset</button>
            </form>
        )
    }
}

export default Form