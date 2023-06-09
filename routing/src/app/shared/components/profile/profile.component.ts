import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Music } from 'src/app/models/music';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isModalOpen = false;
  @Input()
  public user: any[] = [];
  @Input()
  public music: any[] = [];
  public userData: any;
  accessToken: any;

  likedSongs() {}
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setClose(isOpen: boolean) {
    this.isModalOpen = !isOpen;
  }
  message = '';
  bio = '';
  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `${data}!`;
      this.bio = `${data}`;
    }
  }
  ngOnInit() {
    // let data = { token: JSON.parse(this.accessToken) };
    // let data = JSON.parse(localStorage.getItem('accessToken'))
    // this.userData = data.userData;
    // console.log(this.userData);
    // this.likedSongs();
  }
}
