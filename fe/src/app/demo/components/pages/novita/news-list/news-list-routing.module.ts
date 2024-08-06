import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list.component';
import { roleGuard } from 'src/app/demo/service/roleGuard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NewsListComponent, canActivate: [roleGuard] }
	])],
	exports: [RouterModule]
})
export class NewsListRoutingModule { }

