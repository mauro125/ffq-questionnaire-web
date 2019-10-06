import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FFQItemResponse} from '../../models/ffqitem-response';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FFQItemCalcRequest} from '../../models/ffqitem-calc-request';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { ɵangular_packages_forms_forms_q } from '@angular/forms';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})

export class FoodItemService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { } 

  addFoodNutrients(fooditem : FFQFoodNutrientsResponse): Observable<any> {
    
    return this.http.post(this.endpoint + '/createfoodnutrients', fooditem, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  /* Return a specific food item (by object id) and its list of nutrients*/
  getFoodbyName(objectId: string): Observable<FFQFoodNutrientsResponse> {
    return this.http.get(this.endpoint + '/foodnutrients/' + objectId).pipe(
      map(((item: any) => {
          return new FFQFoodNutrientsResponse(
            item.foodItem,
            item.nutrientList
          );
        })));
  }

  getAllFoods(): Observable<FFQFoodNutrientsResponse[]> {
    return this.http.get(this.endpoint + '/allfoodsnutrients').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQFoodNutrientsResponse(
            item.foodItem,
            item.nutrientList
          );
        });
      }));
  }

  getFoodItems(): Observable<FFQItemResponse[]> {
    return this.http.get(this.endpoint + '/fooditems').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQItemResponse(
            item.name,
            item.primary,
            item.servingsList,
            item.foodTypes,
            item.sugar
          );
        });
      }));
  }

  calculateNutrientBreakdown(id:string, items: FFQItemCalcRequest[]): Observable<any> {
    return this.http.post(`${this.endpoint}/calculate/` + id, items).pipe(map(data => {
        return data;
      }
    ));
  }

  deleteFoodItem(id:string){

  }

}
