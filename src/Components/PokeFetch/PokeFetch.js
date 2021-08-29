import React, { Component } from 'react'
import './PokeFetch.css'

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      isRunning: false,
      isVisible: false,
      counter: 10,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.countdown(), 1000)
  }

  componentDidUpdate() {
    if (this.state.counter === 0 && this.state.isVisible === false)
      this.setState({
        isVisible: true,
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  async fetchPokemon() {
    // resetting variables to initial state
    this.setState({
      isRunning: false,
      isVisible: false,
      counter: 10,
    })

    try {
      let min = Math.ceil(1)
      let max = Math.floor(152)
      let pokeNum = Math.floor(Math.random() * (max - min) + min)
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
        method: 'GET',
      })
      let pokemon = await res.json()
      this.setState({
        pokeInfo: pokemon,
        pokeSprite: pokemon.sprites.front_default,
        pokeName: pokemon.species.name,
        isRunning: true,
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let { counter } = this.state
    return (
      <div className={'wrapper'}>
        <button
          className={'start'}
          onClick={() => {
            this.fetchPokemon()
          }}
        >
          Start!
        </button>
        <h1 className={'timer'}>{counter}</h1>
        <div className={'pokeWrap'}>
          {this.state.isVisible ? (
            <>
              <img className={'pokeImg'} src={this.state.pokeSprite} alt='' />
              <h1 className={'pokeName'}>{this.state.pokeName}</h1>
            </>
          ) : (
            <img className={'pokeImgDark'} src={this.state.pokeSprite} alt='' />
          )}
        </div>
      </div>
    )
  }

  countdown = () => {
    if (this.state.isRunning === true && this.state.counter > 0)
      this.setState(prevState => ({
        counter: prevState.counter - 1,
      }))
    console.log(this.state.counter)
  }
}

export default PokeFetch
