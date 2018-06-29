import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default class NFLTable extends React.Component {
  rows() {
    let players
    if (this.props.players) {
      players = this.props.players.slice()

      if (this.props.size) {
        players = players.slice(0, this.props.size);
      }
    }
    if (!players) {
      return
    }




    // console.log(this.props.players);

    for (let i = 0; i < this.props.players.length; i++) {
      const element = this.props.players[i];
      if (element.pick === true) {
        console.log(element);
        return players.map((player, i) => {
          return (
            <tr key={i}
              className={('selected ' + 'tier' + player.Tier)}
              onClick={() => this.onClick(player)}>
              {this.columns(player)}
            </tr>
          )
        });
      }
      return players.map((player, i) => {
        return (
          <tr key={i}
            className={('tier' + player.Tier)}
            onClick={() => this.onClick(player)}>
            {this.columns(player)}
          </tr>
        )
      });
    }
  }

  onClick(player) {
    if (this.props.onClick) {
      return this.props.onClick(player);
    }
  }

  columns(player) {

    return this.props.fields.map((f, i) => {
      if (f === 'Tier') {
        return <td key={i}>Tier {player[f]}</td>
      } else {
        return <td key={i}>{player[f]}</td>
      }
    });
  }

  render() {
    return (
      <table>
        <tbody className="">{this.rows()}</tbody>
      </table>
    );
  }
}


NFLTable.propTypes = {
  players: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,

  onClick: PropTypes.func,
  size: PropTypes.number,
  disableColor: PropTypes.bool,
};

connect()(NFLTable)
