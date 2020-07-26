import { Component, OnInit } from '@angular/core';
import { Coffee } from '../models/coffee';
import { CoffeeDetailsService } from '../service/coffee-details.service';
import { LoaderService } from '../service/loader.service';
import { ActivatedRoute } from '@angular/router';
import { Nutrition } from '../models/nutrition';
import { NutritionalInfoPage } from '../nutritional-info/nutritional-info.page';
import { Router } from '@angular/router';
import { WishlistService } from '../service/wishlist.service';
import { CartService } from '../service/cart.service';
import { ToastController } from '@ionic/angular';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-coffee-details',
  templateUrl: './coffee-details.page.html',
  styleUrls: ['./coffee-details.page.scss'],
})
  
  

export class CoffeeDetailsPage implements OnInit {

  constructor(private coffeeDetailsService: CoffeeDetailsService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    public toastController: ToastController
  ) { }

  
  public id: number;
  public coffee: Coffee;
  public ingredients: string[];
  public nutrition_data: Nutrition;
  nutritionalInfoPage: NutritionalInfoPage;

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let path = params.get("id");
      this.id = +path;
    });

    this.coffee = this.coffeeDetailsService.getCoffeeItem(this.id);
    this.ingredients = this.coffeeDetailsService.getIngredients(this.id);

    this.loadWishlistImages(this.id)
  }

  addToLikes() {
    let wishlist;
    let ele = document.getElementsByClassName("wishlistImg")[0];
    let icon: string = ele.getAttribute("src")
    let like_icon = "assets/images/heart.svg"
    let nolike_icon = "assets/images/heart-outline.svg"

    if (icon === like_icon) {
      wishlist = this.wishlistService.removeItemFromWishlist(this.id)
      ele.setAttribute("src", nolike_icon);
    }
    else {
      wishlist = this.wishlistService.addItemToWishlist(this.id)
      ele.setAttribute("src", like_icon);
    }
    
    // console.log(this.id)
    // console.log(wishlist)

  }


  loadWishlistImages(c_id:number) {
    let list:number[] = this.wishlistService.getUserWishlist(1)
    
    let item = document.getElementsByClassName("wishlistImg")[0];
    if (list.length > 0 && list.includes(c_id)) {
      item.setAttribute("src", "assets/images/heart.svg");
    }
    else
      item.setAttribute("src", "assets/images/heart-outline.svg");
    
  }

  showNutritionalInfo() {
    this.router.navigate(['nutritional-info'], { relativeTo: this.activatedRoute });
  }


  addOrDeleteFromCart(ele:Element) {
    let cart: CartItem[];
    let icon: string = ele.getAttribute("src")
    let before_icon = "assets/images/shopping-cart-before.png"
    let after_icon = "assets/images/shopping-cart-after.png"
    let item_id:number = this.coffeeDetailsService.getItemId(ele.parentElement.children[1].textContent)

    if (icon===after_icon) {
      this.cartService.removeItemFromCart(this.id,item_id)
      ele.setAttribute("src", before_icon);
      
    }
    else {
      this.cartService.addItemToCart(this.id,item_id)
      ele.setAttribute("src", after_icon);
    }
    
    this.presentToastWithOptions()
    
    // console.log(item_id)
    // console.log(cart)
      
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Items added to cart',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          // icon: 'star',
          text: 'View Cart',
          handler: () => {
            this.router.navigate(['cart'])
            // this.router.navigate(['nutritional-info'], { relativeTo: this.activatedRoute });
            console.log('View Cart clicked');
            toast.dismiss();
          }
        }
      ]
    });
    toast.present();
  }

}
