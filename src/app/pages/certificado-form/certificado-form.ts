import { Component, ViewChild } from '@angular/core';
import { PrimaryButton } from '../../_components/primary-button/primary-button';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { CertificadoInterface } from '../../interfaces/certificado';
import { CertificadoService } from '../../_services/certificado';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-certificado-form',
  imports: [PrimaryButton, SecondaryButton, FormsModule],
  templateUrl: './certificado-form.html',
  styleUrl: './certificado-form.css',
})
export class CertificadoForm {
  constructor(private certificadService: CertificadoService) {}

  @ViewChild('form') form!: NgForm;

  certificado: CertificadoInterface = {
    id: '',
    atividades: [],
    nome: '',
    dataEmissao: '',
  };
  atividade: string = '';

  campoInvalido(control: NgModel) {
    return control.invalid && control.touched;
  }

  formValido() {
    return this.certificado.atividades.length > 0 && this.certificado.nome.length > 0;
  }

  adicionarAtividade() {
    if (this.atividade.length == 0) {
      return;
    }
    this.certificado.atividades.push(this.atividade);
    this.atividade = '';
  }

  excluirAtividade(index: number) {
    this.certificado.atividades.splice(index, 1);
  }

  submit() {
    if (!this.formValido()) {
      return;
    }
    this.certificado.dataEmissao = this.dataAtual();
    this.certificado.id = uuidv4();
    this.certificadService.adicionarCertificado(this.certificado);

    this.certificado = this.estadoInicialCertificado();
    this.form.resetForm();
  }

  dataAtual() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth()).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  }

  estadoInicialCertificado(): CertificadoInterface {
    return {
      id: '',
      atividades: [],
      nome: '',
      dataEmissao: '',
    };
  }
}
