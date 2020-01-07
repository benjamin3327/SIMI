import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ModalsPage } from '../modals/modals.page';
import { RidesharePage } from '../rideshare/rideshare.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ModalsPage,RidesharePage],
  entryComponents: [ModalsPage,RidesharePage]
})
export class HomePageModule {}
