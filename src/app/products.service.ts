import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  Cart:BehaviorSubject<IProduct[]|any> = new BehaviorSubject(null);

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get('../assets/data.json')
  }
}
