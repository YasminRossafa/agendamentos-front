import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../enviroment/env';

interface AgendamentoDTO {
  id?: number;
  dia?: string;
  hora?: string;
  status?: string;
}

interface CadastroAgendamentoModel {
  dia: string;
  hora: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroAgendamentoService {
  private baseUrl = `${env.apiUrl}/api/Agendamentos`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<AgendamentoDTO[]> {
    return this.http.get<AgendamentoDTO[]>(`${this.baseUrl}/GetAgendamentos`);
  }

  
  // Adicionar um novo agendamento
  adicionarAgendamento(novoAgendamento: { dia: string; hora: string; status: string }): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/PostAgendamentos`, {
      dia: novoAgendamento.dia,
      hora: novoAgendamento.hora,
      status: novoAgendamento.status
    });
  }

  // Alterar um agendamento
  alterarAgendamento(dia: string, hora: string, status: string): Observable<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/AltAgendamentos`, {
      dia,
      hora,
      status
    });
  }

  // Deletar um agendamento
  deletarAgendamento(dia: string, hora: string): Observable<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/DelAgendamentos`, {
      dia,
      hora
    });
  }
}