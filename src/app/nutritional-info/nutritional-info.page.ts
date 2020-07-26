import { Component, OnInit, Input } from '@angular/core';
import { Nutrition } from '../models/nutrition';
import { ActivatedRoute } from '@angular/router';
import { NutritionService } from '../service/nutrition.service';
import { CoffeeDetailsService } from '../service/coffee-details.service';

@Component({
  selector: 'app-nutritional-info',
  templateUrl: './nutritional-info.page.html',
  styleUrls: ['./nutritional-info.page.scss'],
})
export class NutritionalInfoPage implements OnInit {
  @Input() nutrition: Nutrition;

  constructor(private route: ActivatedRoute,
    private nutritionService: NutritionService,
    private coffeeDetailsService: CoffeeDetailsService
  ) { }
  
  nutritional_info: Nutrition;
  id: string;
  method: string[];

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.nutritional_info = this.nutritionService.getNutritionalInfo(this.id);
    this.method = this.coffeeDetailsService.getMethod(this.id);

  }


}
