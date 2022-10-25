import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Interface/IProduct';
import { IUserDetail } from 'src/app/Interface/IUserDetail';
import { CartService } from 'src/app/services/cart.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';
import { WebApiService } from 'src/app/web-api.service';
declare var Razorpay:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public totalItem: number=0;
public result:IProduct[]=[];
  grandTotal!: number;
  User:any;
  constructor(private cartService: CartService,private wishlistCartService:WishlistCartService, private productService:WebApiService,private route:Router) { }

  ngOnInit(): void {
  //subscribing and finding length of array
  this.cartService.getProducts()
  .subscribe(res=>{
    this.result=res;
    this.grandTotal=this.cartService.getTotalPrice();
  })
  
  this.cartService.getProducts()
  .subscribe(res=>{
  this.totalItem = res.length;
})

this.productService.getUserLoggedData().subscribe((data:IUserDetail[]) =>{
  this.User=data;
  console.log(this.User);
})

  }

 
  removeItem(item:IProduct){
this.cartService.removeCartItem(item);
item.addedtocart=false;
item.addedtocart=item.addedtocart;
this.productService.EditCart(item).subscribe(()=>{
  item;
  console.log('cart Boolean change')
})
  }

  //increament method
  inc(product_id:any,quantity:number){
    for(let i =0; i<this.result.length;i++){
      if(this.result[i].productId===product_id){
        if(quantity!=5){
        this.result[i].productQuantity=quantity+1;
        }
      }
      this.grandTotal=this.cartService.getTotalPrice();
    }
  }

//decreament method
  dec(product_id:any,quantity:number){
    for(let i =0; i<this.result.length;i++){
      if(this.result[i].productId===product_id){
        if(quantity!=1){
        this.result[i].productQuantity=quantity-1;
        }
      }
      this.grandTotal=this.cartService.getTotalPrice();
    }
  }

  postProduct(result:any,UserID:string){
    for(let i=0;i<=result.length;i++){
      console.log(result[i].productId+' product billed for userId '+UserID)
      this.productService.postOrder(result[i].productId,UserID,result[i].productBrand,result[i].productImage,result[i].productPrice,result[i].productQuantity).subscribe(()=>{
        
        this.route.navigate(['/trackDetails']);
        console.log("submitted form successfully!");
        this.cartService.removeAllCart();
      })
    }
  }

  //razorpay payment integration

message:any;
paymentId = "";
error = "";
title1 = 'razorpay-intergration';
options = {
  "key": "rzp_test_KMuAYKn5Hl8vDL",
  "amount": this.grandTotal,
  "name": "Devashish Kapadnis",
  "description": "Payment Details",
  "order_id": "",
  "handler": function (response: any) {
    var event = new CustomEvent("payment.success",
      {
        detail: response,
        bubbles: true,
        cancelable: true
      }
    );
    window.dispatchEvent(event);
  },
  "prefill": {
    "name": "",
    "email": "",
    "contact": ""
  },
  "notes": {
    "address": ""
  },
  "theme": {
    "color": "#3399cc"
  }
};


paynow() {
  this.paymentId = '';
  this.error = '';

      this.options.amount = this.grandTotal*100;//paise
     

  this.options.prefill.name = "deva";
  this.options.prefill.email = "devashishkapadnis075@gmail.com";
  this.options.prefill.contact = "7058204270";
  var rzp1 = new Razorpay(this.options);
  rzp1.open();
  rzp1.on('payment.failed', function (response: any) {
    //this.message = "Payment Failed";
    // Todo - store this information in the server
    console.log(response.error.code);
    console.log(response.error.description);
    console.log(response.error.source);
    console.log(response.error.step);
    console.log(response.error.reason);
    console.log(response.error.metadata.order_id);
    console.log(response.error.metadata.payment_id);
    //this.error = response.error.reason;
  }
  );
}
@HostListener('window:payment.success', ['$event'])
onPaymentSuccess(event: any): void {
  this.message = "Success Payment";
  this.postProduct(this.result,this.User.id);

 
}


}
