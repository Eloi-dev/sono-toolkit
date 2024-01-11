import {Component} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {modulesPages} from "../../../modules/modules.routes";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  public appPages = modulesPages;

  constructor(public sessionService: SessionService, public navController: NavController) {
  }
}
