import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { ProductsService } from '../products.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:IProduct[] = [];
  cartList:IProduct[] = [];
  productDetails!:IProduct;
  showDetails:boolean = false;

  constructor(
    private _ProductsService:ProductsService,
    private _notifierService: NotifierService,
    ) { 
      this._ProductsService.showDetails.next(false)
    }

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe((res:IProduct[])=>{
      this.products = res
    })
  }


  getDetails(product:IProduct){
    this.productDetails = product;
    this._ProductsService.showDetails.next(true)
    this._ProductsService.showDetails.subscribe((res:boolean) => {
      this.showDetails = res;
    });
  }

  getProducts(e:any){
    this.showDetails = e;
  }

  addToCart(p:IProduct,ItemCount:HTMLSelectElement){
    this._ProductsService.Cart.subscribe(res =>{
      if (res) {
        this.cartList = res
      }
      else{
        this.cartList = []
      }
    })
    if (!this.cartList.find( c => c.id == p.id)) {
      p.qty = Number(ItemCount.value)
      this.cartList.push(p)
      this._notifierService.notify('success', 'Item has been added to your basket.');
    }
    else{
      this._notifierService.notify('warning', 'Item is already in your basket.');
    }
    this._ProductsService.Cart.next(this.cartList)
  }
}
