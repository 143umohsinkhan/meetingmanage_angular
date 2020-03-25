import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Meeting } from 'src/app/models/meeting';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersubscriptionService } from 'src/app/services/usersubscription.service';

@Component({
  selector: 'app-createmeeting',
  templateUrl: './createmeeting.component.html',
  styleUrls: ['./createmeeting.component.css']
})
export class CreatemeetingComponent implements OnInit {

  
  private formData = new FormData();
  meetingForm: FormGroup;
  meeting: Meeting = new Meeting();
  formTitle = 'Add';
  meetingId;
  AttendeesList: [];
  minDate;
  userId:number;

  constructor(private service: MeetingService,
    private route: ActivatedRoute,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private router: Router,
    private userSubscriptionService : UsersubscriptionService) {

    this.minDate = new Date();

    this.userSubscriptionService.userData.subscribe(data=>{
      this.userId = data.userId;
    });

    this.meetingForm = this.fb.group({
      id: 0,
      subject: ['', [Validators.required,Validators.maxLength(50)]],
      agenda: ['', Validators.required],
      attendees: ['', [Validators.required,Validators.maxLength(10)]],
      meetingTime: ['' , Validators.required],
      UserID : this.userId
    });

    if (this.route.snapshot.params['id']) {
      this.meetingId = this.route.snapshot.paramMap.get('id');
    }

  }

  get subject() {
    return this.meetingForm.get('subject');
  }

  get agenda() {
    return this.meetingForm.get('agenda');
  }

  get attendees() {
    return this.meetingForm.get('attendees');
  }

  get meetingTime() {
    return this.meetingForm.get('meetingTime');
  }

  ngOnInit(): void {
    this.service.getAllAttendees()
      .subscribe(
        (res: []) => {
          this.AttendeesList = res;
        }, error => {
          console.log('Error ocurred while fetching category List : ', error);
        });

    if (this.meetingId) {
      this.formTitle = 'Edit';
      this.service.getMeetingById(this.meetingId)
        .subscribe(
          (result: Meeting) => {
            this.setFormData(result);
          }, error => {
            console.log('Error ocurred while fetching data : ', error);
          });
    }

  }

  saveData() {
    if (!this.meetingForm.valid) {
      return;
    }

    if (this.meetingId) {
      this.service.updateMeetingDetail(this.meetingId,this.meetingForm.value)
        .subscribe(
          (result: boolean) => {
            if (result) {
              this.snackbar.showSnackBar("Saved Successfully !");
              this.router.navigate(['/list']);
            }
            else {
              this.snackbar.showSnackBar("Please validate the data");
            }

          }, error => {
            this.snackbar.showSnackBar("Error ocurred while updating data.");
          });
    } else {
      this.service.addMeeting(this.meetingForm.value)
        .subscribe(
          (result: boolean) => {
            if (result) {
              this.snackbar.showSnackBar("Saved Successfully !");
              this.router.navigate(['/list']);
            }
            else {
              this.snackbar.showSnackBar("Please validate the data");
            }
          }, error => {
            this.meetingForm.reset();
            this.snackbar.showSnackBar("Error ocurred while updating data.");
          });
    }
  }

  cancel() {
    this.meetingForm.reset();
  }

  
  setFormData(mtng:Meeting) {
    this.meetingForm.setValue({
      id: mtng.id,
      agenda: mtng.agenda,
      subject: mtng.subject,
      meetingTime: mtng.dateTime,
      attendees: mtng.attendeesIds
    });
  }
}
