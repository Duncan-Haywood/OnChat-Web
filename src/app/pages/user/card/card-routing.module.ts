import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolve } from 'src/app/resolver/onchat.resolver';
import { CardPage } from './card.page';


const routes: Routes = [
  {
    path: ':userId',
    component: CardPage,
    resolve: {
      user: UserResolve
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardPageRoutingModule { }
