import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/services/detailsPage/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  order: string;
  singlePokemonData: any;
  constructor(private route: ActivatedRoute, private detailsService: DetailsService) { }

  ngOnInit() {
    this.getSinglePokemonDetails();
  }

  getSinglePokemonDetails() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    this.detailsService.getPokemonList(pokemonId).subscribe((singleDataresponse) => {
      const { sprites } = singleDataresponse;
      const images = [];
      console.log('singleDataresponse', singleDataresponse);
      Object.values(sprites).forEach(spritesObjImg => {
        if(spritesObjImg) {
          images.push(spritesObjImg);
        }
      });
      singleDataresponse.images = images;
      this.singlePokemonData = singleDataresponse;
    }, error => {
      console.log('Please Try Again Later', error);
    });
  }
}
