import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { CoffeeDetailsService } from '../service/coffee-details.service';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {

  @Input() recipe:string
  @Input() item:string
  constructor(public popoverController: PopoverController,
    private cartService: CartService,
    private coffeeDetailsService: CoffeeDetailsService) { 
  }

  cart_items: CartItem[];

  ngOnInit() {
    // this.cart_items = this.cartService.getUserCart(1);
  }

 closePopover() {
   this.popoverController.dismiss();
   
  }

  addItemToCart() {
    this.popoverController.dismiss();
    this.cartService.addCustomEntryToCart(this.recipe,this.item)
    
    // console.log(this.cartService.getUserCart(1))
    
  }


}
