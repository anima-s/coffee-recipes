import { Injectable } from '@angular/core';
import { Nutrition } from '../models/nutrition';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  constructor() { }

  public nutrition: Nutrition[] = [
    {
      id: 1,
      energy: "200kcal",
      fat: "12g",
      carbs: "12g",
      protein: "12g",
      sodium: "12g"
    }
  ]

  getNutritionalInfo(id: any) {
    return {
      ...this.nutrition.find(x => x.id == id)
    }
  }
}
