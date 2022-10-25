import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserDetail } from 'src/app/Interface/IUserDetail';
import { CartService } from 'src/app/services/cart.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';
import { WebApiService } from 'src/app/web-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem: number=0;
  public searchterm:string='';
  loggedIn:boolean=false;
  User!:any;
  constructor(private cartService: CartService,private wishlistCartService:WishlistCartService,private route:Router,private user:WebApiService) { }

  ngOnInit(): void {
  //subscribing and finding length of array
    this.cartService.getProducts()
    .subscribe(res=>{
    this.totalItem = res.length;
  })
  
  
this.user.getUserLoggedData().subscribe((data:IUserDetail[]) =>{
  this.User=data;
  console.log(this.User);
})

 

 
  
  
  }
  
  LogoutUser(){
    if (localStorage.getItem('token') != null) {
    localStorage.removeItem('token');
    this.route.navigate(['/login'])
   window.location.reload();
    }
  }
  
  //search method to fire an event and get the value to show in html
  search(event:any){
  this.searchterm=(event.target as HTMLInputElement).value;
  this.cartService.search.next(this.searchterm);
  }

}
