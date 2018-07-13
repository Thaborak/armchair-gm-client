import React from 'react';
import { connect } from 'react-redux';
import { fetchTeamStats, fetchTeamPic } from '../components/redux/actions/team';
import Card from './Card';


export function PlayerCard(props) {
    // fetchTeamPic()
    // fetchTeamStats()
    
    


        //  props.team.forEach(element => {
        //     console.log(element);
        //     let fullname = element.Name
        //     fullname = fullname.split(" ", 2);
        //     fullname = fullname.join('-').toLowerCase();
        //     let query = fullname
        //     this.props.dispatch(fetchTeamStats(query))
        // });
        console.log(props)
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
        stats: state.team || state.team.teamStats.player
    }
}


export default connect(mapStateToProps)(PlayerCard);
