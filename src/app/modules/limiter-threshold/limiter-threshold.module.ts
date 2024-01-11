import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimiterThresholdPageRoutingModule } from './limiter-threshold-routing.module';

import { LimiterThresholdPage } from './limiter-threshold.page';
import {TranslateModule} from "@ngx-translate/core";
import {LimiterThresholdService} from "./services/limiter-threshold.service";

@NgModule({
  providers: [
    LimiterThresholdService
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LimiterThresholdPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [LimiterThresholdPage]
})
export class LimiterThresholdPageModule {}
