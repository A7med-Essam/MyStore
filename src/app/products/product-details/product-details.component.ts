import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productDetails!:IProduct
  @Output() getProductDetails = new EventEmitter<boolean>();

  constructor(
    private _ProductsService:ProductsService,
    private _notifierService: NotifierService
    ) { }
  
  ngOnInit(): void {
  }

  goBack(){
    this.getProductDetails.emit(false)
  }

  cartList:IProduct[] = [];
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
