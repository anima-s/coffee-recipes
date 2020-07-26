import { Injectable } from '@angular/core';
import { UserCart } from '../models/UserCart';
import { CoffeeDetailsService } from './coffee-details.service';
import { CartItem } from '../models/CartItem';
import { CartKeyMap } from '../models/CartKeyMap';

@Injectable({
  providedIn: 'root'
})
  
export class CartService  {

  public user_cart :UserCart[] = [
    {
      user: 1,
      cart: [
        {
          recipe_id: 1,
          item_ids: [1, 2]
        },
        {
          recipe_id: 2,
          item_ids: [5]
        }
      ]
    },

  ]

  cart_object: CartKeyMap[];
  user_items: CartItem[];
  user_id = 1;

  constructor(private coffeeDetailsService: CoffeeDetailsService) {
    // this.user_items = this.initialiseCart(this.user_id);
  }
  

  addItemToCart(recipe: any, item: any) {
    let recipe_name = this.coffeeDetailsService.getCoffeeItem(recipe).label;
    let item_name = this.coffeeDetailsService.getItemName(item);

    if (recipe_name && item_name) 
      this.addItemToUserCartObject(this.user_id, recipe, item);
    else 
      this.addItemToUserCartList(this.user_id, recipe, item);
  }

  removeItemFromCart(recipe: any, item: any) {
    let recipe_name = this.coffeeDetailsService.getCoffeeItem(recipe).label;
    let item_name = this.coffeeDetailsService.getItemName(item);

    if (recipe_name && item_name)
      this.removeItemFromUserCartObject(this.user_id, recipe, item);
    else
      this.removeItemFromUserCartList(this.user_id, recipe, item);
  }


  addItemToUserCartList(user_id: number, recipe_name: string, item_name: string) {
    let cart = this.getUserCart(user_id);
    let itemPresent = false;

    for (let ent of cart) {
      if (ent.recipe === recipe_name && ent.sub_item === item_name) {
        console.log("Item already present in cart : " + ent.recipe + " : " + ent.sub_item);
        itemPresent = true;
      }
    }

    if (!itemPresent)
      cart.push({ recipe: recipe_name, sub_item: item_name })

    this.setUserCart(user_id, cart);      
  }


  addItemToUserCartObject(user_id: number, recipe_id: number, item_id: number) {
    let cart = this.getUserCartObject(user_id);
    let addedtocart = false;

    for (let ent of cart) {
      if (!addedtocart) {
        if (ent.recipe_id === recipe_id) {
          if (ent.item_ids.includes(item_id)) {
            console.log("Item already present in cart : " + ent);
            addedtocart = true;
          }
          else {
            ent.item_ids.push(item_id)
            addedtocart = true;
          }
        }
      }
    }

    if (!addedtocart)
      cart = this.addJsonEntryToCart(cart, recipe_id, [item_id]);

    this.setUserCartObject(user_id, cart);

  }


  removeItemFromUserCartObject(user_id: number, recipe_id: number, item_id: number) {
    let cart = this.getUserCartObject(user_id);
    let filteredCart: CartKeyMap[] = [];
    let removedfromcart = false;
    
    for (let ent of cart) {
      if (ent.recipe_id === recipe_id) {
        let filteredItems: number[] = [];
        for (let i of ent.item_ids) {
          if (i === item_id) {
            removedfromcart = true;
          }
          else {
            filteredItems.push(i)
          }
        }
        if(filteredItems.length>0)
          filteredCart.push({ recipe_id: ent.recipe_id, item_ids: filteredItems })
      }
      else
        filteredCart.push({ recipe_id: ent.recipe_id, item_ids: ent.item_ids })
        
    }

    if (removedfromcart)
      console.log("Item removed from cart ==> recipe:" + recipe_id + " item: " + item_id);
    else
      console.log("Item not removed from cart ==> recipe:" + recipe_id + " item: " + item_id);
  
    this.setUserCartObject(user_id, filteredCart);
    console.log(this.getUserCartObject(user_id))
  }

  removeItemFromUserCartList(user_id, recipe_name, item_name) {
    let cart = this.getUserCart(user_id);
    let removedfromcart = false;
    let filteredCart: CartItem[] = [];

    console.log(recipe_name)
    console.log(item_name)
    for (let ent of cart) {
      if (ent.recipe === recipe_name && ent.sub_item === item_name) {
        removedfromcart = true;
      }
      else
        filteredCart.push({ recipe: ent.recipe, sub_item: ent.sub_item })
    }

    if (removedfromcart)
      console.log("Item removed from cart ==> recipe:" + recipe_name + " item: " + item_name);
    else
      console.log("Item not removed from cart ==> recipe:" + recipe_name + " item: " + item_name);

    this.setUserCart(user_id, filteredCart);  
  }

  getUserCart(user_id: number): CartItem[] {
    let cart: CartItem[];

    if (this.user_items ) {
      cart = this.user_items;
    }
    else
      cart = this.initialiseCart(user_id);

    return cart;
  }

  setUserCart(user_id:number, data: CartItem[]) {
    this.user_items = data;
  }

  setUserCartObject(user_id: number, data: CartKeyMap[]) {
    this.user_cart.find(e => e.user === user_id).cart = data;
  }

  initialiseCart(user_id: number): CartItem[] {
    let cart: CartItem[] = [];

    let found: CartKeyMap[] = this.user_cart.find(e => e.user === user_id).cart;

    for (let itm of found) {
      let recipe_name = this.coffeeDetailsService.getCoffeeItem(itm.recipe_id).label;
      let items: number[] = itm.item_ids;

      for (let itm of items) {
        let item_name = this.coffeeDetailsService.getItemName(itm)
        cart.push({ recipe: recipe_name, sub_item: item_name });
      }
    }

    return cart;
  }

  getUserCartObject(user_id: number): CartKeyMap[] {
    return this.user_cart.find(e => e.user === user_id).cart;
  }


  addCustomEntryToCart(recipe: string, item: string) {
    // let id = this.coffeeDetailsService.getCoffeeIdFromName(recipe)
    // let item_id = this.coffeeDetailsService.getItemId(item)
    // id = (id !== undefined) ? id : this.coffeeDetailsService.getCoffeeList().length + 1
    // item_id = (item_id !== undefined) ? item_id : this.coffeeDetailsService.getItemsIds().length + 1;

    this.addItemToCart(recipe,item);
    console.log("Additional recipe " + recipe + " with item " + item + " added in cart.");

  }

  addJsonEntryToCart(cart: CartKeyMap[], recipe_id: number, item_id: number[]): CartKeyMap[] {
    if(item_id.length>0)
      cart.push({ recipe_id: recipe_id, item_ids: item_id })
    
    console.log("Recipe " + recipe_id + " with item " + item_id + " added in cart.");
    return cart;
  }

}
