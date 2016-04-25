import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

export default class GameList extends Component {
  constructor(props) {
    super(props);
    // this.state = { counter: 0 };
  }
  componentDidMount() {
    // this.interval = setInterval(this.tick.bind(this), 1000);
  }
  // tick() {
  //   this.setState({
  //     counter: this.state.counter + 1
  //   });
  // }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  render() {
    return (
    <List subheader="Games">
      {this.props.games.map(game => {
        return (<ListItem
          primaryText={game.name}
          rightIcon={<ActionInfo />}
        />)}
      )}
    </List>
   );
  }
}

