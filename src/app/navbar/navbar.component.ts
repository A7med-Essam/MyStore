import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  CartCounter:Number = 0;
  constructor(private _ProductsService:ProductsService) { }

  ngOnInit(): void {
    this.getCartLegnth();
  }

  getCartLegnth(){
    this._ProductsService.Cart.subscribe((res:IProduct[])=>{
      if (res) {
        this.CartCounter = res.length
      }
      else{
        this.CartCounter = 0;
      }
    })
  }

}
