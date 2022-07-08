import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IProduct } from '../models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products:IProduct[];
  total = 0;
  creditCard!:number;
  name!:string;
  address!:string;
  constructor(
    private _ProductsService:ProductsService,
    private _Router:Router,
    private _notifierService: NotifierService,
    ) {
    this.products = []
  }
  
  ngOnInit(): void {
    this._ProductsService.Cart.subscribe(res => {
      this.products = res
      this.getTotalPrice()
    })
  }

  getTotalPrice(){
    this.total = 0;
    for (var i in this.products) {
      this.total += (this.products[i].price * this.products[i].qty);
    }
  }

  onSubmit(){
    this._notifierService.notify('success', 'Order confirmed successfully');
    this._Router.navigate(['../success'])
  }

  changeQty(product:IProduct,counter:HTMLInputElement){
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == product.id) {
        this.products[i].qty = Number(counter.value)
      }
    }
    this.getTotalPrice();
  }

}
