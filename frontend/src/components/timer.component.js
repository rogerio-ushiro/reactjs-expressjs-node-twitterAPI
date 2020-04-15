import React, { Component } from 'react'

export default class Timer extends Component {
    state = {
        minutes: 3,
        seconds: 0,
        texto : null
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, texto } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
                this.setState({ texto : seconds})
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds, texto } = this.state
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <h1>Busted!</h1>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} {texto}</h1>
                }
            </div>
        )
    }
}