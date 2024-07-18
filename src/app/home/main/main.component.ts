import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'src/app/shared/service/cookieService/cookie.service';
import Data from './main.interface';
import { MainService } from './main.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: Data[] = [];
  listOfCurrentPageData: Data[] = [];
  setOfCheckedId = new Set<number>();
  expandSet = new Set<number>();
  private subscriptions: Subscription;
  public roleData: any
  constructor(private router: Router, private mainService: MainService, private cookieService: CookieService) {
    this.subscriptions = new Subscription();
    this.roleData = {}
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
    console.log('this.setOfCheckedId', this.setOfCheckedId);
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ id }) =>
      this.updateCheckedSet(id, checked)
    );
    this.refreshCheckedStatus();
    console.log('this.setOfCheckedId', this.setOfCheckedId);
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  onEdit(id) {
    this.router.navigate(['home/detail'], { queryParams: { id } });
  }

  ngOnInit(): void {
    const roleData = this.cookieService.getCookie('user')
    console.log('roleData', roleData)
    if(roleData) {
      this.roleData = JSON.parse(roleData);
    }
    this.subscriptions.add(
      this.mainService.listData.subscribe((res: any) => {
        this.listOfData = res
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
