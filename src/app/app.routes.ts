import { Routes } from '@angular/router';

import { SessionManagerComponent } from './session-manager/session-manager.component';
import { ShowComponent } from './show/show.component';

export const routes: Routes = [
    {path: '', component: SessionManagerComponent},
    {path: 'show', component: ShowComponent}
];
