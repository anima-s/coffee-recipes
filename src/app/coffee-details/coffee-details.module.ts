import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoffeeDetailsPageRoutingModule } from './coffee-details-routing.module';

import { CoffeeDetailsPage } from './coffee-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoffeeDetailsPageRoutingModule
  ],
  declarations: [CoffeeDetailsPage],
})
export class CoffeeDetailsPageModule {}
