import React from 'react';
import PropTypes from 'prop-types';

import AvailablePlayers from './AvailablePlayers'
import { connect } from 'react-redux';

export default class BestAvailablePlayers extends React.Component {
  render() {
    return (
      <div>
        <div className='column1'>
          <div className='search-padding-table'>
            <input
              className='form-control mr-sm-2'
              aria-label="Search"
              type="text"
              placeholder="Search By Player"
              onChange={this.props.search}
              value={this.props.query}
            />
          </div>
          <br/>
          <div className='scrollable'>
            <div className='padding-table'>
              <AvailablePlayers
                className='scrollable'
                fields={['Rank', 'Tier', 'Pos', 'Name', 'Bye']}
                players={this.props.players}
                draft={(player) => this.props.draft(player)}
                size={35}
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