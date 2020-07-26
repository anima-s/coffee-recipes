import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoffeeListComponent } from '../coffee-list/coffee-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
   
  ],
  declarations: [HomePage, NavbarComponent, CoffeeListComponent]
})
export class HomePageModule {}
