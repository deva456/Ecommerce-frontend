import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interface/IProduct';
import { ISubcategory } from 'src/app/Interface/ISubcategory';
import { CartService } from 'src/app/services/cart.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';
import { WebApiService } from 'src/app/web-api.service';

@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductinfoComponent implements OnInit {

  p:any;
  productData:any;
  subCategory: ISubcategory[]=[];
  loader: Boolean=true;
  result:IProduct[]=[];
  constructor(private route: ActivatedRoute,private api:WebApiService,private cartService: CartService, private wishlistCartService:WishlistCartService) { }

  ngOnInit(): void {
    this.api.getSingleProduct( this.route.snapshot.params['productId']).subscribe(product => {
      this.productData = product;
      this.loader=false;
      console.log(this.productData);
    });
  
    this.api.getSubCategory().subscribe((data2:ISubcategory[]) =>{
      this.subCategory=data2;
      this.loader=false;
      console.log(this.subCategory)
    })

    this.api.getProducts().subscribe((data:IProduct[]) =>{
      this.result=data;
      this.loader=false;
      console.log(this.result)
    })
  }
 //added to cart calling from cart service
 addtocart(dt:IProduct){
  dt.addedtocart=true;
  this.cartService.addtoCart(dt);
  }



loadPage(){
  window.location.reload();
}


//updating boolean column in database i.e(addedtowishlist)
updateBool(product:IProduct){
product.addedToWishList=!product.addedToWishList;
this.wishlistCartService.addToWishlistCart(product);
this.api.updateBool(product).subscribe(()=>{
product;
console.log('addedtowishlist true');
})
}
//updating boolean colum in database i.e(addedtocartt)
updateCartBool(product:IProduct){
product.addedtocart=product.addedtocart;//toggling between true and false
this.api.EditCart(product).subscribe(()=>{ //subscribing data
product;
console.log('cart Boolean change')
})
}
// remove cart item through button in mat-card and also updating boolean val in database
removeCartItem(product:IProduct){
product.addedtocart=!product.addedtocart;//toggling between true and false
this.api.EditCart(product).subscribe(()=>{ //subscribing data
product;
console.log('cart Boolean change')
})
this.cartService.removeCartItem(product);//calling remove cartitem from cart service
}

}
