import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DetailsService } from './services/detailsPage/details.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'All Pokemon',
      url: '/list',
      icon: 'list'
    }
  ];
  queryText: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private detailsService: DetailsService,
    public toastController: ToastController,
    private router: Router
  ) {
    this.initializeApp();
    this.queryText = '';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  searchData() {
    this.detailsService.getPokemonList(this.queryText).subscribe(resposne => {
      if(resposne && resposne.id) {
        this.router.navigate(['pokemon/' + resposne.id]);
      }
    }, error => {
      console.log('error');
      this.presentToast('Please Try Again Later, Result Not Found')
    });
  }
}
