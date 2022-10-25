import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { ICategory } from 'src/app/Interface/ICategory';
import { IProduct } from 'src/app/Interface/IProduct';
import { ISubcategory } from 'src/app/Interface/ISubcategory';
import { CartService } from 'src/app/services/cart.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';
import { WebApiService } from 'src/app/web-api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p:any;
  loader:Boolean=true;
  result:IProduct[]=[];
  category:ICategory[]=[];
  subCategory:ISubcategory[]=[];
  public searchterm:string='';
  public totalItem: number=0;
  searchkey:string='';
  searchkey1:string='';
  constructor(private productService:WebApiService,private cartService: CartService, private wishlistCartService:WishlistCartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data:IProduct[]) =>{
      this.result=data;
      this.loader=false;
      console.log(this.result)
    })

    this.productService.getCategory().subscribe((data1:ICategory[]) =>{
      this.category=data1;
      this.loader=false;
      console.log(this.category)
    })

    this.productService.getSubCategory().subscribe((data2:ISubcategory[]) =>{
      this.subCategory=data2;
      this.loader=false;
      console.log(this.subCategory)
    })

    this.cartService.search.subscribe(val=>{
      this.searchkey=val;
  })

  }
  customOptions:OwlOptions={
  loop:true,
  mouseDrag:true,
  touchDrag:true,
  pullDrag:true,
  dots:false,
  navSpeed:700,
  navText:['',''],
  responsive:{
    0:{
      items:1
    },
    400:{
      items:2
    },
    740:{
      items:3
    },
    940:{
      items:4
    }
  },
  nav:true

  }

  //added to cart calling from cart service
  addtocart(dt:IProduct){
    dt.addedtocart=true;
    this.cartService.addtoCart(dt);
    }

   


  //search event for search bar



//updating boolean column in database i.e(addedtowishlist)
updateBool(product:IProduct){
product.addedToWishList=!product.addedToWishList;
this.wishlistCartService.addToWishlistCart(product);
  this.productService.updateBool(product).subscribe(()=>{
product;
console.log('addedtowishlist true'+product);
if(product.addedToWishList==false){
  this.wishlistCartService.removeWishlistCartItem(product)
  
}
  })
}
//updating boolean colum in database i.e(addedtocartt)
updateCartBool(product:IProduct){
product.addedtocart=product.addedtocart;//toggling between true and false
this.productService.EditCart(product).subscribe(()=>{ //subscribing data
product;
console.log('cart Boolean change'+product)
})
}
// remove cart item through button in mat-card and also updating boolean val in database
removeCartItem(product:IProduct){
product.addedtocart=!product.addedtocart;//toggling between true and false
this.productService.EditCart(product).subscribe(()=>{ //subscribing data
product;
console.log('cart Boolean change'+product)
})
this.cartService.removeCartItem(product);//calling remove cartitem from cart service
localStorage.setItem('wishlist',JSON.stringify(product))
}

}
