import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'

export default class Idle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isTimedOut: false
        }
        this.idleTimer = React.createRef()
        this.handleOnAction = this.handleOnAction.bind(this)
        this.handleOnActive = this.handleOnActive.bind(this)
        this.handleOnIdle = this.handleOnIdle.bind(this)
    }

    render() {
        return (
            <div>
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    timeout={5 * 1000}
                    onActive={this.handleOnActive}
                    onIdle={this.handleOnIdle}
                    onAction={this.handleOnAction}
                    debounce={250}
                />
                <p>{ this.state.idleTimeout ? 'ACTIVE ': 'Time to logout' }</p>

            </div>
        )
    }

    handleOnAction(event) {
        console.log('user did something', event)
        this.setState({ 'isTimedOut': false })
    }

    handleOnActive(event) {
        console.log('user is active', event)
        console.log('time remaining', this.idleTimer.getRemainingTime())
    }

    handleOnIdle(event) {

        const { isTimedOut } = this.state;
        if (isTimedOut) {
            // Logout user or show warning modal
        }
        else {
            this.idleTimer.reset();
            this.setState({ isTimedOut: true })
        }
        console.log('user is idle', event)
        console.log('last active', this.idleTimer.getLastActiveTime())
    }
}