import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { MembersDataService } from '../members-data.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  addForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    year: new FormControl(''),
    rate: new FormControl(''),
    minAge: new FormControl(''),
    minPlayers: new FormControl(''),
    maxPlayers: new FormControl('')
  });

  constructor(private membersDataService: MembersDataService) { }

  ngOnInit(): void {
  }
  addMember(): void {
    console.log(this.addForm.value);
    this.membersDataService.addMember(this.addForm.value)
      .then(() => console.log("Member saved"));
  }
}