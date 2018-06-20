import React from 'react';
import PropTypes from 'prop-types';

import AvailablePlayers from './AvailablePlayers'
import { connect } from 'react-redux';
import NFLTable from './NFLTable';

export default class BestAvailablePlayersByPosition extends React.Component {
  render() {
    const fields = ['Tier', 'Name', 'Bye'];

    return (
      <div>
          <div className='padding-table'>
            <span>Runningbacks</span>
            <AvailablePlayers
            fields={['Tier', 'Name', 'Bye']}
              players={this.props.players}
              draft={(p) => this.props.draft(p)}
              size={15}
              Pos='RB'
            />
          </div>

          <div className='padding-table'>
            <span>Wide Receivers</span>
            <AvailablePlayers
            fields={['Tier', 'Name', 'Bye']}
              players={this.props.players}
              draft={(p) => this.props.draft(p)}
              size={15}
              Pos='WR'
            />
          </div>
          <div className='padding-table'>
            <span>Quarterbacks</span>
            <AvailablePlayers
            fields={['Tier', 'Name', 'Bye']}
              players={this.props.players}
              draft={(p) => this.props.draft(p)}
              size={15}
              Pos='QB'
            />
          </div>
          <div className='padding-table'>
            <span>Tightends</span>
            <AvailablePlayers
            fields={['Tier', 'Name', 'Bye']}
              players={this.props.players}
              draft={(p) => this.props.draft(p)}
              size={15}
              Pos='TE'
            />
          </div>
      </div>
    )
  }
}


BestAvailablePlayersByPosition.propTypes = {
  draft: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
};

connect()(BestAvailablePlayersByPosition);
