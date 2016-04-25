import React, { Component } from 'react';

import {List, ListItem}           from 'material-ui/List';
import ActionInfo                 from 'material-ui/svg-icons/action/info';
import {AppStyle}                 from '../utils';

const styles = AppStyle;

export default class GameList extends Component {
  constructor(props) {
    super(props);
    // this.state = { counter: 0 };
    // this.contextTypes = {
    //   muiTheme: PropTypes.object,
    // }
  }

  // getDefaultProps() {
  //   return {
  //     minWidth: 320,
  //   };
  // }

  render() {
    // const {prepareStyles} = this.context.muiTheme;
    console.warn('Render.GameList', this.props)
    let {games} = this.props;

    return (
      <List ref='gameList' style={styles.root}>
        {!games ?
          <h3>No Games Found</h3>
          : games.map(game => {
          return (<ListItem
            key={game.id}
            primaryText={game.name}
            rightIcon={<ActionInfo />}
          />)}
        )}
      </List>
    )
  }
}

