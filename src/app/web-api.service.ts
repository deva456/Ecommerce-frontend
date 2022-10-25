import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from './Interface/ICategory';
import { IOrder } from './Interface/IOrder';
import { IProduct } from './Interface/IProduct';
import { IRegister } from './Interface/IRegister';
import { ISubcategory } from './Interface/ISubcategory';
import { IUserDetail } from './Interface/IUserDetail';
@Injectable({
  providedIn: 'root',
})
export class WebApiService {
  url = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + 'ProductInfoes');
  }
  //product by Id
  getSingleProduct(productId: number): Observable<IProduct[]> {
    console.log(productId);
    return this.http.get<IProduct[]>(this.url + 'ProductInfoes/' + productId);
  }

  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url + 'ProductCategories');
  }

  getSubCategory(): Observable<ISubcategory[]> {
    return this.http.get<ISubcategory[]>(this.url + 'ProductSubCategories');
  }

  getRegisterData(): Observable<IRegister[]> {
    return this.http.get<IRegister[]>(this.url + '/');
  }
  //adding product in to main array for Admin only
  addProduct(val: IProduct) {
    this.http
      .post<IProduct>(this.url + 'ProductInfoes', val, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .subscribe((result) =>
        console.log('Data entered in Database Successfully !')
      );
  }

  RegisterPost(object: any) {
    return this.http.post(this.url + 'UserProfile/Register', object, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  //updating boolean value of addedtocart in table
  UpdateProduct(val: IProduct) {
    return this.http.put(this.url + 'ProductInfoes/' + val.productId, val);
  }

  //updating boolean value of addedtowishlist in table
  updateBool(addedtowishlist1: IProduct) {
    localStorage.setItem('wishlist', JSON.stringify(addedtowishlist1));
    return this.http.put(
      this.url + 'ProductInfoes/' + addedtowishlist1.productId,
      addedtowishlist1
    );
  }

  //deleting product from main array for Admin only
  deleteProduct(val: IProduct) {
    return this.http.delete(this.url + 'ProductInfoes/' + val);
  }

  //Editing product details put method for Admin only
  EditCart(val: IProduct) {
    return this.http.put(this.url + 'ProductInfoes/' + val.productId, val);
  }

  LoginPost(data: any) {
    return this.http.post(this.url + 'UserProfile/Login', data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // getUserAccData():Observable<IAccDetail[]>{

  //   return this.http.get<IAccDetail[]>(this.url+'AccountInfoes');
  // }

  getUserLoggedData(): Observable<IUserDetail[]> {
    return this.http.get<IUserDetail[]>(this.url + 'UserDetails');
  }

  getOrderData(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.url + 'Orders');
  }

  postOrder(
    Products: any,
    User: any,
    productBrand: any,
    productImage: any,
    productPrice: any,
    productQuantity: any
  ) {
    console.log(Products + ' ' + User + this.url + 'Orders', Products, User);
    return this.http.post(this.url + 'Orders', {
      productId: Products,
      UserId: User,
      productBrand: productBrand,
      productImage: productImage,
      productPrice: productPrice,
      productQuantity: productQuantity,
    });
  }
}
