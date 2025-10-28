import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  ngOnInit(): void {
    this.mensagem;
  }

  mensagem() {
    console.log('meu componente iniciou');
  }
}
