import {Account} from "./account.model";
import {LimiterThreshold} from "../../modules/limiter-threshold/models/limiter-threshold";

export class Session {
  token?: string;

  account?: Account;

  limiterList: LimiterThreshold[] = [];
}
