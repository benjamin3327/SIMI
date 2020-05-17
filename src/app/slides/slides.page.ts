import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})

export class SlidesPage implements OnInit {
  @ViewChild(Slides)
  slides: Slides;
  constructor(private router: Router,
              public storage: Storage) { }

  ngOnInit() {
  }

  async finish()  {
    await this.storage.set('splashComplete', true);
    this.router.navigateByUrl('/');
  }

  next() {
    this.slides.slideNext();
  }

}
