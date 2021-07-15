import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Member } from "../member-list/member-list.component";
import { MembersDataService } from '../members-data.service';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {

  member: Member = {} as Member;

  constructor(private membersDataService: MembersDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const memberId: string = this.route.snapshot.params.memberId; 
    this.getMember(memberId);
  }

  private getMember(memberId: string): void{
    this.membersDataService.getMember(memberId)
      .then((response) => this.receivedMember(response) )
      .catch(this.handleError);
  }

  private receivedMember(member:Member){
    this.member = member;

  };

  public deleteMember(): void{
    const memberId: string = this.route.snapshot.params.memberId; 
    this.membersDataService.deleteMember(memberId)
      .then((response) => this.receivedMember(response) )
      .catch(this.handleError);
  }
  
  private handleError(error:any){
    console.log("Error ", error);
  };

}
