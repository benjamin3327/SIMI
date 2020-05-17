import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashGuard } from './guards/splash.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule',
    canActivate: [SplashGuard]},
  { path: 'modals', loadChildren: './modals/modals.module#ModalsPageModule' },
  { path: 'rideshare', loadChildren: './rideshare/rideshare.module#RidesharePageModule' },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
