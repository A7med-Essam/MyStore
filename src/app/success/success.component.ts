import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(
    private _ProductsService:ProductsService
  ) { }

  ngOnInit(): void {
    this._ProductsService.Cart.next(null)
  }

}
