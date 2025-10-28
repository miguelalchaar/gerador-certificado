import { Component } from '@angular/core';
import { PrimaryButton } from '../../_components/primary-button/primary-button';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { FormsModule, NgModel } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';

@Component({
  selector: 'app-certificado-form',
  imports: [PrimaryButton, SecondaryButton, FormsModule],
  templateUrl: './certificado-form.html',
  styleUrl: './certificado-form.css',
})
export class CertificadoForm {
  certificado: Certificado = {
    atividades: [],
    nome: '',
  };
  atividade: string = '';

  campoInvalido(control: NgModel) {
    return control.invalid && control.touched;
  }

  formValido() {
    return this.certificado.atividades.length > 0 && this.certificado.nome.length > 0;
  }

  adicionarAtividade() {
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
    console.log(this.certificado);
  }
}
