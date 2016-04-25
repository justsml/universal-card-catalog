import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectedGame, fetchGamesIfNeeded, invalidateGames } from '../actions'
// import Picker from '../components/Picker'
import GameList from './GameList'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedGame } = this.props
    dispatch(fetchGamesIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedGame !== this.props.selectedGame) {
    //   const { dispatch, selectedGame } = nextProps
    dispatch(fetchGamesIfNeeded())
    // }
  }

  handleChange(nextGame) {
    this.props.dispatch(selectedGame(nextGame))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedGame } = this.props
    dispatch(invalidateGames(selectedGame))
    dispatch(fetchGamesIfNeeded())
  }

  render() {
    const { selectedGame, games, isFetching, lastUpdated } = this.props
    const isEmpty = !games || games.length === 0
    return (
      <div>
        <h1>Almost working...?</h1>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <GameList games={games} />
            </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedGame: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedGame, games } = state
  const {
    isFetching,
    lastUpdated
  } = games || {
    isFetching: true,
    lastUpdated: -1
  }

  return {
    selectedGame,
    games,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
