import {Injectable} from '@angular/core';
import {SessionService} from "../../../core/services/session.service";
import {BehaviorSubject} from "rxjs";
import {LimiterThreshold} from "../models/limiter-threshold";

@Injectable()
export class LimiterThresholdService {

  public limiterList: BehaviorSubject<LimiterThreshold[]> = new BehaviorSubject<LimiterThreshold[]>(this.sessionService.session.value?.limiterList!);

  public currentLimiter: BehaviorSubject<LimiterThreshold | undefined> = new BehaviorSubject<LimiterThreshold | undefined>(undefined);

  constructor(private sessionService: SessionService) {
  }

  async create(limiterThreshold: LimiterThreshold) {
    let list = this.limiterList.value;

    if (!list) {
      list = [];
    }
    list.unshift(limiterThreshold);
    this.limiterList.next(list);
    const session = this.sessionService.session.value!;
    session.limiterList = list;
    await this.sessionService.storeSession(session);
    return list;
  }

  async drop(limiterThreshold: LimiterThreshold) {
    let list = this.limiterList.value.filter(limiter => limiter !== limiterThreshold);

    this.limiterList.next(list);
    const session = this.sessionService.session.value!;
    session.limiterList = list;
    await this.sessionService.storeSession(session);
  }

  async getAll() {
    this.sessionService.session.subscribe(session => this.limiterList.next(session?.limiterList!))
  }
}
