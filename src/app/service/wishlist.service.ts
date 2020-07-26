import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public user_wishlist = [
    {
      "user": 1,
      "list": [1,2]
    },
    {
      "user": 2,
      "list": [3, 4]
    },
    {
      "user": 3,
      "list": [1, 2, 3, 4]
    }

  ]

  constructor() { }


  addItemToWishlist(item_id: number): number[] {
    let user = 1;
    let wishlist = this.getUserWishlist(user).includes(item_id) ? this.getUserWishlist(user) : this.getUserWishlist(user).push(item_id);
    this.getUserWishlist(user)["list"] = wishlist;
    return this.getUserWishlist(user);
  }

  removeItemFromWishlist(item_id: number): number[] {
    let user =1;
    let wishlist = this.getUserWishlist(user).includes(item_id) ? this.removeItem(user, item_id) : this.getUserWishlist(user);
    this.getUser(user)["list"] = wishlist;
    return this.getUserWishlist(user);
  }

  removeItem(user_id: number, item_id: number): number[] {
    return this.getUserWishlist(user_id).filter(it => {
      return it !== item_id;
    });
  }

  getUserWishlist(user_id: number): number[] {
    return this.getUser(user_id)["list"]
  }

  getUser(user_id: number): any {
    return this.user_wishlist.find(it => {
      return it.user == user_id;
    })
  }
}
