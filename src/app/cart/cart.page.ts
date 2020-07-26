import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Coffee } from '../models/coffee';
import { ActivatedRoute } from '@angular/router';
import { CoffeeDetailsService } from '../service/coffee-details.service';
import { PopoverController } from '@ionic/angular';
import { AddItemComponent } from '../add-item/add-item.component'
import { CartItem } from '../models/CartItem';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {
  public coffee: Coffee;
  public cart_items: CartItem[]=[];

  constructor(private cartService: CartService, private route: ActivatedRoute,
    private coffeeDetailsService: CoffeeDetailsService,
    public popover: PopoverController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params)
    });

    this.cart_items = this.cartService.getUserCart(1);
  }

  ngAfterContentChecked() {
    this.refreshCart();
  }

 addNewItemToCart() {
   this.showPopover();
  }

  removeItemFromCart(ele: Element, ent: CartItem) {
    this.cartService.removeItemFromCart(ent.recipe, ent.sub_item)
    this.refreshCart()
  }

  refreshCart() {
    this.cart_items = this.cartService.getUserCart(1);
  }

  async showPopover() {
    const popover = await this.popover.create({
      component: AddItemComponent,
      cssClass: 'my-custom-class',
      // event: ev,
      backdropDismiss: false,
      translucent: true
    });

    popover.onDidDismiss()
      .then((result) => {
        if (result.data !== undefined) {
          // console.log(result.data.recipe);
          // console.log(result.data.item);
          return result.data;
        }
      });

    return await popover.present();
  }

}
