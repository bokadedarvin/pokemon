import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/detailsPage/details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemonSelectedCard: any;

  constructor(private detailsService: DetailsService, private router: Router) {}

  ngOnInit() {
   this.getInfoPokemonData();
  }

  getInfoPokemonData() {
    const date = new Date();
    const currentDay = date.getDate();
    this.detailsService.getPokemonList(currentDay.toString()).subscribe(response => {
      if(response) {
        this.pokemonSelectedCard = response;
      }
      console.log(this.pokemonSelectedCard);
    }, error => {
      console.log('Please Try Again Later, Result Not Found', error);
    });
    console.log(currentDay);
  }
  seeDetails(id) {
    this.router.navigate(['pokemon/' + id]);
  }

}
