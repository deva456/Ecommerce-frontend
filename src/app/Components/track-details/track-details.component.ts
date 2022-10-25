import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/Interface/IOrder';
import { IProduct } from 'src/app/Interface/IProduct';
import { IUserDetail } from 'src/app/Interface/IUserDetail';
import { CartService } from 'src/app/services/cart.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';
import { WebApiService } from 'src/app/web-api.service';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.css']
})
export class TrackDetailsComponent implements OnInit {
  public result:IProduct[]=[];
  grandTotal!: number;
  User!:any;
  track:IOrder[]=[];
  filter:any[]=[];
  product:IProduct[]=[];
  details:any[]=[];
  constructor(private cartService: CartService,private wishlistCartService:WishlistCartService, private productService:WebApiService,private route:Router) { }

  ngOnInit(): void {
  //subscribing and finding length of array
  this.cartService.getProducts()
  .subscribe(res=>{
    this.result=res;
   
  })
  
  this.productService.getUserLoggedData().subscribe((data:IUserDetail[]) =>{
    this.User=data;
    console.log(this.User);
  })

  this.productService.getProducts().subscribe((data1:IProduct[]) =>{
    this.product=data1;
    
    console.log(this.product)
  })
  this.productService.getOrderData().subscribe((order:IOrder[]) =>{
   this.track=order;
   this.grandTotal=this.cartService.getTotalPrice();
    console.log(this.track);
  })

  

  }


}
