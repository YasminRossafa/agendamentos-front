import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CadastroAgendamentoService } from '../../services/cadastrar-agendamento.service';
import { NotificationService } from '../../services/notification.service';
import { Agendamento } from '../../../types/agendamentos';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cadastro-agendamento',
  standalone: true,
  imports: [ReactiveFormsModule, InputValidationComponent, NgIf],
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.scss'],
})
export class CadastroAgendamentoComponent {
  private cadastrarAgendamento = inject(CadastroAgendamentoService);
  private notificationService = inject(NotificationService);
  private formBuilder = inject(FormBuilder);

  agendamentoForm = this.formBuilder.group({
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(65)],
    ],
    data_nasc: [
      '',
      [Validators.required],
    ],
    data_ag: [
      '',
      [Validators.required],
    ],
    hora: [
      '',
      [Validators.required],
    ],
  });

  agendamentos: Agendamento[] = [];

  constructor() {
    this.listarAgendamentos();
  }

  onSubmit() {
    if (this.agendamentoForm.valid) {
      const agendamentoValues = this.agendamentoForm.value as Agendamento;
      this.cadastrarAgendamento.adicionarAgendamento({
        dia: agendamentoValues.dataAgendamento.toISOString(),
        hora: agendamentoValues.horaAgendamento,
        status: 'ativo' // Ajuste conforme necessário
      }).subscribe(() => {
        this.notificationService.showError(
          `Agendamento para ${this.agendamentoForm.value.nome} cadastrado com sucesso`
        );
        this.listarAgendamentos(); // Atualiza a lista após adicionar
      });
    }
  }

  listarAgendamentos() {
    this.cadastrarAgendamento.listarTodos().subscribe(
      (error) => {
        this.notificationService.showError('Erro ao listar agendamentos.');
      }
    );
  }

  alterarAgendamento(id: Date) {

    const agendamento = this.agendamentos.find(a => a.dataAgendamento === id);
    if (agendamento) {
      this.cadastrarAgendamento.alterarAgendamento(
        agendamento.dataAgendamento.toISOString(),
        agendamento.horaAgendamento,
        'ativo' 
      ).subscribe(() => {
        this.notificationService.showError('Agendamento alterado com sucesso.');
        this.listarAgendamentos(); 
      });
    }
  }

  deletarAgendamento(id: Date) {
    const agendamento = this.agendamentos.find(a => a.dataAgendamento === id);
    if (agendamento) {
      this.cadastrarAgendamento.deletarAgendamento(
        agendamento.dataAgendamento.toISOString(),
        agendamento.horaAgendamento
      ).subscribe(() => {
        this.notificationService.showError('Agendamento deletado com sucesso.');
        this.listarAgendamentos(); 
      });
    }
  }
}
