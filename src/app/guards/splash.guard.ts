import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class SplashGuard implements CanActivate {
  constructor(public storage: Storage,
              private router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> {
    const isComplete = await this.storage.get('splashComplete');
    if (!isComplete) {
      this.router.navigateByUrl('/slides');
    }
    return isComplete;
  }
}
