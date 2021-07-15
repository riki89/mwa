import { Component, OnInit } from '@angular/core';

import { MembersDataService } from '../members-data.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  title: string = "MEAN members";
  members: Member[] = [];
  constructor(private membersDataService:MembersDataService) { }

  ngOnInit(): void {
    this.getMembers();
    console.log(this.members);
    
  }

  public getMembers(): void {
    this.membersDataService.getMembers()
      .then(foundMembers => this.members = foundMembers);
  } 

}
export class Member {
  _id!: string;
  title!: string;
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
}
