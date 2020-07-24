import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionalInfoPage } from './nutritional-info.page';

const routes: Routes = [
  {
    path: '',
    component: NutritionalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionalInfoPageRoutingModule {}
