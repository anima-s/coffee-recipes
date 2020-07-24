import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutritionalInfoPageRoutingModule } from './nutritional-info-routing.module';

import { NutritionalInfoPage } from './nutritional-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NutritionalInfoPageRoutingModule
  ],
  declarations: [NutritionalInfoPage]
})
export class NutritionalInfoPageModule {}
