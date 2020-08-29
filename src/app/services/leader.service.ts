import {Injectable, Inject} from '@angular/core';
import {LEADERS} from '../shared/leaders';
import {Leader} from '../shared/leader';

@Inject({
  providedIn: 'root',
})

export class LeaderService{
  getLeaders(): Promise <Leader[]>{
    return Promise.resolve(LEADERS);
  }
  getLeader(id:String):Promise <Leader>{
    return Promise.resolve(LEADERS.filter(leader => leader.id ===id)[0]);
  }
  getFeaturedLeader():Promise <Leader>{
    return Promise.resolve(LEADERS.filter(Leader => Leader.featured)[0]);
  }
constructor(){}
}
