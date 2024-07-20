// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Adicionado FormsModule
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { CadastroAgendamentoService } from './services/cadastrar-agendamento.service';
import { CadastroAgendamentoComponent } from './pages/cadastro-agendamento/cadastro-agendamento.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    CommonModule,
    ReactiveFormsModule, // Adicionado se você usar reactive forms em algum lugar
    FormsModule, // Adicionado para ngModel
    CadastroAgendamentoService,
    CadastroAgendamentoComponent // Adicione o componente aqui se necessário
  ]
};
