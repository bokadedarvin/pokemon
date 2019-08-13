import { Injectable } from '@angular/core';
import { ApiAbstractMethod } from 'src/app/abstract/api/api-abstract-method';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListPageService extends ApiAbstractMethod {
  endPoint: string;
  listLimit: number;

  constructor(public http: HttpClient) {
    super(http);
    this.listLimit = 10;
  }
  /**
   *
   * @description this will send the list of pokemon data
   * @param {number} pageNo
   * @returns {Observable<any>}
   * @memberof ListPageService
   */
  getPokemonList(pageNo: number): Observable<any> {
    this.endPoint = 'pokemon/?limit=' + this.listLimit + '&offset=' + pageNo;
    return this.get();
  }
  /**
   *
   * @description this will get the single pokemon data
   * @param {*} endpoint
   * @returns {Observable<any>}
   * @memberof ListPageService
   */
  getSinglePokemonDetails(endpoint): Observable<any> {
    return this.urlGet(endpoint);
  }
}
