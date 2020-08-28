import {Injectable, Inject} from '@angular/core';
import {LEADERS} from '../shared/leaders';
import {Leader} from '../shared/leader';

@Inject({
  providedIn: 'root',
})

export class LeaderService{
  getLeaders():Leader[]{
    return LEADERS;
  }
  getLeader(id:String):Leader{
    return LEADERS.filter(leader => leader.id ===id)[0];
  }
  getFeaturedLeader():Leader{
    return LEADERS.filter(Leader => Leader.featured)[0];
  }
constructor(){}
}
