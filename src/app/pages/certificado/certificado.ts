import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CertificadoService } from '../../_services/certificado';
import { CertificadoInterface } from '../../interfaces/certificado';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificado',
  imports: [SecondaryButton, RouterLink],
  templateUrl: './certificado.html',
  styleUrl: './certificado.css',
})
export class Certificado implements OnInit {
  id: string | null = null;
  certificado: CertificadoInterface | undefined;

  @ViewChild('certificadoConatiner') certificadoElement!: ElementRef;

  constructor(private certificadoService: CertificadoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.certificado = this.certificadoService.certificados.find((item) => item.id == this.id);
    });
  }

  downloadCerificado() {
    if (this.certificado == undefined) {
      return;
    }

    html2canvas(this.certificadoElement.nativeElement, { scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'certificado_' + this.certificado?.nome.replaceAll(' ', '_') + '.png';
      link.click();
    });
  }
}
