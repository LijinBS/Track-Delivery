import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, from, Subscription } from 'rxjs';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import Data from '../main/main.interface';
import { MainService } from '../main/main.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
interface INameList {
  id: number;
  name: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
public detailForm: FormGroup 
public tableData: Data[]
public currentId: number
public currentTitle: string
public nameList: INameList
private subscriptions: Subscription
  constructor(private fb: FormBuilder, private mainService: MainService, private activatedRoute: ActivatedRoute, private router: Router, private notification: NzNotificationService) {
    this.detailForm = this.fb.group({
      username: ['',[]],
      location : [null, [Validators.required]],
      deliveryTime:[ null, [Validators.required]],
      comment:[ null, []]
    })
    this. subscriptions = new Subscription();
    this.currentId = null;
    this.currentTitle = ''
   }

  ngOnInit(): void {
    const paramObservable = this.activatedRoute.queryParams
    const dataObservable  = this.mainService.getListData()
    this.subscriptions.add(
      combineLatest([paramObservable, dataObservable]).pipe(take(1)).subscribe(([param , data]: [any, any]) => {
        console.log(param, data)
        if(data.length ) {
          if(Object.keys(param).length) {
            this.currentId = param.id
            this.currentTitle = 'Of ' + (data[this.currentId]?.name || '')
          } else {
            this.nameList = data.map(({name, id}) => ({name, id}))
            this.detailForm.get('username').patchValue(data[0].id)
          }
          this.tableData = data
        }
      }))
  }

  logTime(date) {
    console.log(date)
  }

  onSubmit() { 
    this.detailForm.markAllAsTouched();
    if(this.detailForm.valid ) {
       if(this.currentId !== null) {
      this.updateData(this.currentId)
    } else {
      this.updateData(this.detailForm.value.username)
    }
  }
}


  updateData(id) {
    const {location, time, comment} = this.detailForm.value
      const deliveryPerson = this.tableData[id]
      this.tableData[id].subTable.push({location , time: moment(time).format('h:mm a'), comment})
      this.mainService.setListData(this.tableData)
      this.notification.success(
        'Delivery Detail Added',
        `Delivery Detail successfully added to delivery person ${deliveryPerson.name}`,
        {nzDuration : 1000}
      );
      
      setTimeout( ()=> {
        this.router.navigate(['/home/main'])
      }, 1000);
  }

  onCancel() {
    this.router.navigate(['/home/main'])
  }

  get selectFormControl() {
    return this.detailForm.controls
  }

}
