import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../Interface/IProduct';


@Injectable({
  providedIn: 'root'
})
export class WishlistCartService {


  public wishlistCartItemList:IProduct[]=[]
  public productList=new BehaviorSubject<IProduct[]>([]);
  public search =new BehaviorSubject<string>("");
  http: any;
 
 


  constructor() { }

  getProducts(){
    return this.productList.asObservable();

  }
  setProducts(product :IProduct[]){
    this.wishlistCartItemList.push(...product);
    this.productList.next(product);
  }

//adding product to cart
  addToWishlistCart(product:IProduct){
    
    const itemIndex = this.wishlistCartItemList.findIndex(item => item.productId === product.productId);
    if (itemIndex === -1) {
     //if cart is empty then add product into cart
    this.wishlistCartItemList.push(product);
    localStorage.setItem('wishlist',JSON.stringify(this.wishlistCartItemList))
    }
    else{
    //      this.toastr.warning( 'Check your cart' , `${product.title} already added!`,{
    //      timeOut:2500
    //   });
    }
    this.productList.next(this.wishlistCartItemList.slice(0));

  }

//removing item by getting matching id of existing product
  removeWishlistCartItem(product:IProduct){
      for(let i=0;i<this.wishlistCartItemList.length;i++){
      if(this.wishlistCartItemList[i].productId === product.productId){
      this.wishlistCartItemList.splice(i,1);
      localStorage.setItem('wishlist',JSON.stringify(this.wishlistCartItemList))
      }
    }
    this.productList.next(this.wishlistCartItemList);
   
  }

  //clearing all cart item from wishlist
  removeAllCart(){
    this.wishlistCartItemList=[]
    this.productList.next(this.wishlistCartItemList);
    localStorage.setItem('wishlist',JSON.stringify(this.wishlistCartItemList))
  }

  }

