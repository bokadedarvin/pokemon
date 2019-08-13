import { Injectable } from '@angular/core';
import { ApiAbstractMethod } from 'src/app/abstract/api/api-abstract-method';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService extends ApiAbstractMethod{
  endPoint: string;
  listLimit: number;

  constructor(public http: HttpClient) {
    super(http);
  }
  /**
   *
   * @description this will get the details for one pokeman
   * @param {number} pokemonId
   * @returns {Observable<any>}
   * @memberof ListPageService
   */
  getPokemonList(pokemonId: string): Observable<any> {
    this.endPoint = 'pokemon/' + pokemonId;
    return this.get();
  }
  
}
