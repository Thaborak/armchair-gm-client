import React from 'react';
import { connect } from 'react-redux';
import { fetchTeamStats, fetchTeamPic } from '../components/redux/actions/team';
import Card from './Card';

let card;


export function PlayerCard(props) {
        // console.log(props)

          return (
              <div id="box1"> <a href="#"><img src={''} alt="" /></a>
                  <h2 className="subtitle">{} {}</h2>
                  <p>{}</p>
                  {props.stats.teamStats.map(obj => (
                      <Card
                          {...obj}
                          dispatch={props.dispatch}
                          props={props}
                          img={props.stats.teamPics[0]}
                      //   key={String(obj.id)}
                      />
                  ))}
              </div>

          )
}

const mapStateToProps = (state) => {
    return {
        stats: state.team || state.team.teamStats.player,
    }
}


export default connect(mapStateToProps)(PlayerCard);
