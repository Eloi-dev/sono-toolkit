import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private sessionService: SessionService) {}

  async ngOnInit() {
    await this.sessionService.create();
    await this.sessionService.restoreSession();
  }

  async ngOnDestroy() {
    if (this.sessionService.session.value) {
      await this.sessionService.storeSession(this.sessionService.session.value);
    }
  }
}
