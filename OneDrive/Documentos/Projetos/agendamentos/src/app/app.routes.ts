import { Routes } from '@angular/router';
import { CadastroAgendamentoComponent } from './pages/cadastro-agendamento/cadastro-agendamento.component';

export const routes: Routes = [
    {
        path: 'cadastro-agendamento',
        component: CadastroAgendamentoComponent,
      },
      {
        path: '',
        redirectTo: 'cadastro-agendamento',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/',
      },
];
