import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interface/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';
import { WebApiService } from 'src/app/web-api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  p:any;
  wishlistArray:IProduct[]=[];
  loader:boolean=true;
  constructor( private product:WebApiService, private cartService:CartService, private wishlistCartService:WishlistCartService) { }

  ngOnInit(): void {
    //subscribing and storing data in wishlistArray
    this.wishlistCartService.getProducts().subscribe((wishListData:IProduct[]) =>{
      console.log(wishListData);
      this.loader=false;
      this.wishlistArray = wishListData;
    });

  
    
}
// addtocart called from service
addToCart(dt:IProduct){
  dt.addedtocart=true;
   this.cartService.addtoCart(dt);
  }
//addtowishlist cart called from wishlist cart service
  addToWishlistCart(dt:IProduct){
    this.wishlistCartService.addToWishlistCart(dt);
  }
//remove item call from service
removeWislistCartItem(dt:IProduct){
  this.wishlistCartService.removeWishlistCartItem(dt)
}
//update boolean called from product service
updateBool(product:IProduct){
  product.addedToWishList=!product.addedToWishList;//toggling between true or false
  this.product.updateBool(product).subscribe(()=>{//subscribing data
   product;
   console.log('addedtowishlist true');
       })
 }


}
