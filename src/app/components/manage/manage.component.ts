import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MeetingService } from 'src/app/services/meeting.service';
import { Meeting } from 'src/app/models/meeting';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Subject', 'agenda', 'attendees', 'MeetingOn','operation'];
  dataSource = new MatTableDataSource<Meeting>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private meetingService: MeetingService,
  ) { }

  ngOnInit(): void {
    this.getAllMeetings();
    this.dataSource.paginator = this.paginator;
  }

  getAllMeetings() {
    this.meetingService.getAllMeetings()
      .subscribe((data:Meeting []) => {
        this.dataSource.data = Object.values(data);
      }, error => {
        console.log('Error ocurred while fetching details : ', error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
