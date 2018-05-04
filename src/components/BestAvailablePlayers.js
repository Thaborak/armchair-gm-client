import React from 'react';
import PropTypes from 'prop-types';

import AvailablePlayers from './AvailablePlayers'
import { connect } from 'react-redux';

export default class BestAvailablePlayers extends React.Component {
  render() {
    return (
      <div>
        <div className='column1'>
          <div className='PositionTitle'>Best Available</div>
          <div className='search'>
            <input
              className='searchbar'
              type="text"
              placeholder="Search"
              onChange={this.props.search}
              value={this.props.query}
            />
          </div>
          <div className='scrollable'>
            <div className='padding-table'>
              <AvailablePlayers
                className='scrollable'
                fields={['Rank', 'Tier', 'Pos', 'Name', 'Bye']}
                players={this.props.players}
                draft={(player) => this.props.draft(player)}
              />
            </div>
          </div>
        </div>
      </div>

    )
  }

}


BestAvailablePlayers.propTypes = {
  players: PropTypes.array.isRequired,
  // format: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
};

connect()(BestAvailablePlayers);