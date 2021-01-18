
import React from 'react';
import axios from 'axios';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCurrency: "eur",
            inputValue: '',
            result: '',
        };
    }

    handleClick = () => {
        const { inputValue } = this.state;
        if (inputValue > 0) {
            axios
                .get(`http://api.nbp.pl/api/exchanagerates/rates/A/${this.state.currentCurrency}/`)
                .then(response => {
                    this.setState({
                        result: "To " + (response.data.rates[0].mid * inputValue).toFixed(2) + " PLN"
                    })
                })
                .catch(error => {
                    this.setState({
                        result: "Błąd połączenia z serwerem banku"
                    })
                })
        } else {
            this.setState({
                result: 'Podaj liczbę większą od zera!'
            })
        }
    }

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    handleCurrencyChange = (event) => {
        this.setState({ currentCurrency: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <input className="input-enter" onChange={this.handleInputChange} id="start-value" type="number" placeholder="Podaj kwotę w obcej walucie"></input>
                    <select className="select-enter" id="check-currency" value={this.state.currentCurrency} onChange={this.handleCurrencyChange}>
                        <option>EUR</option>
                        <option>USD</option>
                        <option>CHF</option>
                    </select>
                    <button className="btn-calc" onClick={this.handleClick} id="calc-btn">Przelicz</button>
                </div>
                <div className="calc-resoult" id="calculated-money">{this.state.result}</div>
            </div>

        )
    }
}

export default Main;  