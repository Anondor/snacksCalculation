import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import {  RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: 'app-base-layout',
    standalone: true,
    templateUrl: './base-layout.component.html',
    styleUrl: './base-layout.component.css',
    imports: [HeaderComponent, RouterOutlet, DashboardComponent]
})
export class BaseLayoutComponent {

}
