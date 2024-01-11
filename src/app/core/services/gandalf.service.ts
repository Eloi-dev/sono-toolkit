import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class Gandalf implements CanActivate {

  constructor() {}

  async canActivate(): Promise<boolean> {
    // const session = await this.sessionService.restoreSession();
    // return session.token !== undefined
    return true
  }
}
