import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { DetailComponent } from './detail/detail.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, MainComponent, DetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzTableModule,
    NzTimePickerModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzBreadCrumbModule,
    NzNotificationModule,
    NzButtonModule
  ]
})
export class HomeModule { }
