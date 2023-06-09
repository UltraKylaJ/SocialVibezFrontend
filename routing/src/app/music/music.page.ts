import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MusicService } from '../service/music.service';
import { AnimationController, IonPopover } from '@ionic/angular';
import { Router } from '@angular/router';

declare var cordova: any;
@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
  @Input()
  music: any[] = [];
  @Input()
  public m: any;

  accessToken: any;
  searchToken: any;

  code: any;
  searchTerm: string = '';
  public data = [this.music];
  public results = [...this.data];
  isModalOpen = false;

  handleIt(value: string) {
    this.searchTerm = value;
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.indexOf(query) > -1);
  }

  constructor(private service: MusicService, private animationCtrl: AnimationController, private router: Router) {}

  ngOnInit() {
    this.code = new URLSearchParams(window.location.search).get('code');
    this.getAccessToken(this.code);
  }

  getArtistDetails(music: any) {
    let artistaId;

    if (music.type === 'artist') {
      artistaId = music.id;
    } else {
      artistaId = music.artists[0].id;
    }
    console.log(artistaId);
    this.router.navigate(['/details', music.type, artistaId]);
  }

  searchMusicTest() {
    let token = { token: JSON.parse(this.searchToken) };

    this.service.searchMusicTest(this.searchTerm, token).subscribe((m) => {
      this.music = m;
    });
  }

  sortArtist() {
    this.service.sortArtist().subscribe((m) => (this.music = m));
  }
  getDetails() {
    let token = { token: JSON.parse(this.accessToken) };
    this.service.getDetails(this.searchTerm, token).subscribe((m) => {
      this.music = m;
    });
  }
  sortSong() {
    this.service.sortSong().subscribe((m) => (this.music = m));
  }

  getAccessToken(code: any) {
    this.service.getAccessToken(code).subscribe((result: any) => {
      localStorage.setItem('accessToken', JSON.stringify(result));
      localStorage.setItem('searchToken', JSON.stringify(result.token));
      this.accessToken = localStorage.getItem('accessToken');
      this.searchToken = localStorage.getItem('searchToken');
    });
  }
  getPreviewUrl() {
    let token = { token: JSON.parse(this.accessToken) };
    this.service.getPreviewUrl(this.searchTerm, token).subscribe((m) => {
      this.music = m;
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl.create().addElement(baseEl).easing('ease-out').duration(500).addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
  // }
  cancel() {
    console.log('cancel called');
    this.music = [];
  }
}
