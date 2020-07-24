import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeDetailsPage } from './coffee-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoffeeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoffeeDetailsPageRoutingModule {}
