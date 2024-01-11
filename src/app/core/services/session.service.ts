import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Session} from "../models/session.model";
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /** Session object observable */
  public session: BehaviorSubject<Session | undefined> = new BehaviorSubject<Session | undefined>(undefined);

  /**
   * Constructor
   *
   * @param storage
   */
  constructor(private storage: Storage) {}

  /**
   * Initialize la session
   */
  public async create() {
    await this.storage.create();
  }

  /**
   * Sauvegarde la session
   *
   * @param session la session à sauvegarder
   */
  public storeSession = async (session: Session) => {
    await this.storage.set('session', session);
    this.session.next(session);
  };


  /**
   * Restaure la session depuis la sauvegarde
   */
  public async restoreSession() {
    let session: Session = await this.storage.get('session');

    if (!session) {
      session = {account: undefined, token: undefined, limiterList: []}
    }
    this.session.next(session);
    return session;
  }

  /**
   * Supprimes la session en cours
   */
  public async removeSession() {
    await this.storage.remove('session');
    this.session.next(undefined);
  }
}
