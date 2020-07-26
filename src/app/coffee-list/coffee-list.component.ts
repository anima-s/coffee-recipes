import { Component, OnInit, Input, ViewChild,AfterViewInit } from '@angular/core';
import { Coffee } from '../models/coffee';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { WishlistService } from '../service/wishlist.service';
import { CoffeeDetailsService } from '../service/coffee-details.service';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],
})
  
export class CoffeeListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() data: Coffee[];

  coffeeLiked: boolean = false;
  
  constructor(private router: Router, private wishlistService: WishlistService,
    private coffeeDetailsService: CoffeeDetailsService) { }

  ngOnInit() {

  }
  

  addToLikes(ele: HTMLElement) {
    let wishlist;
    let icon: string = ele.getAttribute("src")
    let like_icon = "assets/images/heart.svg"
    let nolike_icon = "assets/images/heart-outline.svg"

    let item_name = ele.parentElement.children[1].textContent
    let item_id = this.coffeeDetailsService.getCoffeeIdFromName(item_name)

    if (icon === like_icon) {
      wishlist = this.wishlistService.removeItemFromWishlist(item_id)
      ele.setAttribute("src", nolike_icon);
    }
    else {
      wishlist = this.wishlistService.addItemToWishlist(item_id)
      ele.setAttribute("src", like_icon);
    }

    // console.log(item_id)
    // console.log(wishlist)

  }

  navigateToRecipe(id: any) {
    this.router.navigate(['/details', id]);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length >= 20) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
