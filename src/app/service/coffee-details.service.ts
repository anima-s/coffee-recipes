import { Injectable } from '@angular/core';
import { Coffee } from '../models/coffee';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CoffeeDetailsService {
  public items: Item[] = [
    {
      id: 1,
      item_name: "Chocolate"
    },
    {
      id: 2,
      item_name: "Vanilla"
    },
    {
      id: 3,
      item_name: "Pumpkin"
    },
    {
      id: 4,
      item_name: "Foam"
    },
    {
      id: 5,
      item_name: "1oz Espresso"
    },
    {
      id: 6,
      item_name: "Coffee Powder"
    },
    {
      id: 7,
      item_name: "Sugar"
    },
    {
      id: 8,
      item_name: "Espresso"
    },
    {
      id: 9,
      item_name: "Hot Water"
    },
    {
      id: 10,
      item_name: "Steamed Milk"
    },
  ]


  public coffee_list: Coffee[] = [
    {
      imageUrl: '../../assets/images/Americano.PNG',
      label: 'Americano',
      id: 1,
      ingredients: [1,2],
      method: ["With a similar flavor to black coffee, the americano consists of an espresso shot diluted in hot water. Pro tip: if you’re making your own, pour the espresso first, then add the hot water."],
    },
    {
      imageUrl: '../../assets/images/Latte.PNG',
      label: 'Latte',
      id: 2,
      ingredients: [3,1],
      method: ["As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice. "]
    },
    {
      imageUrl: '../../assets/images/Cappuccino.PNG',
      label: 'Cappuccino',
      id: 3,
      ingredients: [1,3,4],
      method: ["Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top. Sometimes you can find variations that use cream instead of milk or ones that throw in flavor shot, as well."]
    },
    {
      imageUrl: '../../assets/images/Espresso.PNG',
      label: 'Espresso',
      id: 4,
      ingredients: [5],
      method: ["An espresso shot can be served solo or used as the foundation of most coffee drinks, like lattes and macchiatos."]
    },
    {
      imageUrl: '../../assets/images/Black.PNG',
      label: 'Black',
      id: 5,
      ingredients: [6],
      method: ["Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir."]
    },
    {
      imageUrl: '../../assets/images/Dopio.PNG',
      label: 'Doppio',
      id: 6,
      ingredients: [3,6,7],
      method: ["A double shot of espresso, the doppio is perfect for putting extra pep in your step."]
    }
  ]



  constructor() { }

  getCoffeeList(): Coffee[] {
    let my_list: Coffee[];
    my_list = this.coffee_list;

    for (let i = 0; i < 3; i++)
      my_list = my_list.concat(this.coffee_list)
    return my_list;
  }

  getCoffeeItem(recipeId: any) {
    return {
      ...this.coffee_list.find(recipe => {
        return recipe.id == recipeId;
      })
    }

  }

  deleteCoffeeItem(recipeId: any) {
    this.coffee_list = this.coffee_list.filter(recipe => {
      return recipe.id !== recipeId;
    });
  }

  getIngredients(id: any): string[] {
    let ingredients: string[] = [];
    let ids: any[] = this.getCoffeeItem(id)["ingredients"];

    for (let i of ids) {
      ingredients.push(this.getItemName(i));
    }

    return ingredients;
  }

  getAllCoffeeContainingIngredients(keyword :string): Coffee[] {
    let filtered_ingredients: number[] = [];
    let ingredients: number[]=[];
    let filtered_coffee_list: Coffee[]=[];

    for (let entry of this.coffee_list) {
      ingredients = entry["ingredients"];
      filtered_ingredients = ingredients.filter(ig => {
        return this.getItemName(ig).toLowerCase().includes(keyword)
      })

      if (filtered_ingredients.length > 0) {
        filtered_coffee_list.push(entry)
      }

    }

    return filtered_coffee_list;

  }

  getItemName(id: any) {
    return  {
      ...this.items.find(item => {
       return  item.id == id;
      })
    
    }.item_name
  }

  getItemId(name: string) {
    return {
      ...this.items.find(item => {
        return item.item_name.toLowerCase() == name.toLowerCase();
      })

    }.id
  }

  getItemsIds():number[] {
    let my_list: number[]=[];

    for (let i of this.items) {
      my_list.push(i.id);
    }

    return my_list;
  }

  getMethod(id: any): string[] {
    return this.getCoffeeItem(id)["method"];
  }

  getCoffeeIdFromName(name: string) {
    return {
      ...this.coffee_list.find(recipe => {
        return recipe.label.toLowerCase() === name.toLowerCase();
      })

    }.id
  }


}
