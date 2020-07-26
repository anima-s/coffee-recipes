import { Component, OnInit, ViewChild } from '@angular/core';
import { CoffeeDetailsService } from '../service/coffee-details.service';
import { Coffee } from '../models/coffee';
import { MenuController, IonButton } from '@ionic/angular';
import { LoaderService } from '../service/loader.service';
import { CoffeeTypeArray } from '../models/coffee-type';
import { IonList } from '@ionic/angular'
import { WishlistService } from '../service/wishlist.service';
import { UserDetailsService } from '../service/user-details.service';

declare global {
  interface HTMLCollectionOf<T extends Element> {
    [Symbol.iterator](): Iterator<T>;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
  


export class HomePage implements OnInit {
  @ViewChild(IonList) coffeeList: IonList;


  constructor(private coffeeDetailsService: CoffeeDetailsService,
    private menu: MenuController, private ionLoader: LoaderService ,
    private coffeeTypeArray: CoffeeTypeArray,
    private wishlistService: WishlistService,
    private userDetailsService: UserDetailsService) { }

  public coffee_list: Coffee[];
  public coffeeType= "hot";
  public isButtonActive:boolean = true;


  ngOnInit() {
    // this.ionLoader.showLoader();
    this.getCoffeeList(document.getElementsByClassName("main-btn")[0]);

    this.userDetailsService.getUsersFromDB()
    // console.log(this.coffeeTypeArray.getCoffeeTypesArray()[this.coffeeType])
    // this.ionLoader.hideLoader();

  }

  ngAfterViewChecked() {
    this.loadWishlistImages()
  }

  loadWishlistImages() {
    let list = this.wishlistService.getUserWishlist(1)
    let image: Element;
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("likes");

    for (let item of elements) {
      let c_name = item.parentElement.children[1].textContent;
      let c_id = this.coffeeDetailsService.getCoffeeIdFromName(c_name);
      image = item.parentElement.children[2];
      if (list.length > 0 && list.includes(c_id)) {
        image.setAttribute("src", "assets/images/heart.svg");
      }
      else
        image.setAttribute("src", "assets/images/heart-outline.svg");
    }
  }


  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  
  closeMenu() {
    this.menu.isEnabled('custom').then( m => this.menu.close('custom'));
  }

  filterCoffeeList(type: string): Coffee[]{
    var list: Coffee[] =[];
    var list2 = [];
    if (type === 'hot' || type === 'cold') {
      list2 = this.coffeeTypeArray.getCoffeeTypesArray()[type];
      for (let i = 0; i < list2.length; i++) {
        list.push(this.coffeeDetailsService.getCoffeeItem(list2[i]));
      }

    }
    else {
      if (type === 'chocolate' || type === 'vanilla' || type === 'pumpkin') {
        list = this.coffeeDetailsService.getAllCoffeeContainingIngredients(type);
      }
      else
        list = this.coffeeDetailsService.coffee_list
    }

    return list;

  }

  getCoffeeList(val: Element) {
    let list: HTMLCollection = val.parentElement.children
    let size = list.length

    for (let i = 0; i < size; i++) {
      if (list[i].classList.contains('active'))
        list[i].classList.remove('active')
    }

    this.coffeeType = val.innerHTML.toLowerCase();

    if (!val.classList.contains("active"))
      val.classList.add("active")

    // if (val.innerHTML.toLowerCase() === 'hot' || val.innerHTML.toLowerCase() === 'cold') {
    //     if (!val.classList.contains("active"))
    //       val.classList.add("active")
      
    //   this.coffeeType = val.innerHTML.toLowerCase()
    // }

    this.coffee_list = this.filterCoffeeList(this.coffeeType);
    this.loadWishlistImages()

  }

}
