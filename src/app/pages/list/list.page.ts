import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPageService } from '../../services/listPage/list-page.service';
import { PokemonList, PokemonResultList } from '../../interface/api-request/api-request-params';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  providers: [ListPageService]
})
export class ListPage implements OnInit {
  pageOffset: number;
  pokemonData: Array<PokemonResultList>;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  @ViewChild(IonInfiniteScroll ,{static: false}) infiniteScroll: IonInfiniteScroll;
  count: number;

  constructor(private listPageService: ListPageService, private router: Router) {
    this.pageOffset = 0;
    this.pokemonData = [];
    this.count = 0;
  }

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    this.listPageService.getPokemonList(this.pageOffset).subscribe((response: PokemonList) => {
      const { results, count } = response;
      if(this.count === 0 && this.pageOffset === 0) {
        this.count = count;
      }
      results.forEach((element, index) => {
        this.listPageService.getSinglePokemonDetails(element.url).subscribe((singleDataresponse) => {
          const { sprites, stats, abilities, base_experience, weight, id } = singleDataresponse;
          const infoData = {
            image: sprites.front_default,
            stats: stats,
            abilities: abilities,
            base_experience: base_experience,
            weight: weight,
            id: id
          }
          results[index].infoData = infoData;
        },error => {
          console.log('Please Try Again Later', error);
        });
      });
      if(this.pokemonData.length > 0) {
        this.pokemonData = this.pokemonData.concat(results);
      } else {
        this.pokemonData = results;
      }
    }, error => {
      console.log('Please Try Again Later', error);
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.pageOffset++;
      this.getPokemonList();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.pokemonData.length == this.count) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  seeDetails(id) {
    this.router.navigate(['pokemon/' + id]);
  }
}
