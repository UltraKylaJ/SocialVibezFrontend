import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isModalOpen = false;
  @Input()
  public user: any[] = [];
  @Input()
  public music: any[] = [];
  public userData: any;
  accessToken: any;

  likedSongs() {}

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('accessToken')!);
    this.userData = data.userData;
    console.log(this.userData);
  }
}
