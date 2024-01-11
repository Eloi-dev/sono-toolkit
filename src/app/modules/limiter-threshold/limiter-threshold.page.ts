import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IonModal} from "@ionic/angular";
import {LimiterThresholdService} from "./services/limiter-threshold.service";
import {LimiterThreshold} from "./models/limiter-threshold";

@Component({
  selector: 'app-limiter-threshold',
  templateUrl: './limiter-threshold.page.html',
  styleUrls: ['./limiter-threshold.page.scss'],
})
export class LimiterThresholdPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal | undefined;

  public limiterList = this.limiterService.limiterList;
  public currentLimiter = this.limiterService.currentLimiter;

  public isTutorialModalOpen = false;
  public name: string | undefined;
  public alertInputs = [
    {
      placeholder: 'Name (max 32 characters)',
      attributes: {
        maxlength: 32,
      },
    }
  ];
  public limiterForm: FormGroup = this.formBuilder.group({
    type: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    charge: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    name: new FormControl({value: undefined, disabled: false}),
    hpPower: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    impedance: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    ampliPower: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    ampliGain: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    limiter: new FormControl({value: undefined, disabled: false}),
  });
  public validations = {
    'hpPower': [
      {type: 'required', message: 'SHARED.ERRORS.REQUIRED'},
    ],
    'impedance': [
      {type: 'required', message: 'SHARED.ERRORS.REQUIRED'}
    ],
    'ampliPower': [
      {type: 'required', message: 'SHARED.ERRORS.REQUIRED'}
    ],
    'ampliGain': [
      {type: 'required', message: 'SHARED.ERRORS.REQUIRED'}
    ]
  };
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: async (ev: any) => {
        return this.limiterService.create({...this.limiterForm.value, ...{name: ev[0]}})
      },
    },
  ];

  constructor(private formBuilder: FormBuilder, private limiterService: LimiterThresholdService) {
  }

  async ngOnInit() {
    await this.limiterService.getAll();
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  compute() {
    const {type, charge, hpPower, impedance, ampliPower, ampliGain} = this.limiterForm.value
    let limiter: number;

    if (type === 'dbu' || type === 'tracks_ds2-4') {
      const powerHpOpen = (((((20) * (this.log10((((Math.sqrt((((((hpPower) / (1.5625))) * (impedance))))) / (0.775))))))) - (ampliGain)));
      const powerHpClose = (((((20) * (this.log10((((Math.sqrt((((((hpPower) / (2.34375))) * (impedance))))) / (0.775))))))) - (ampliGain)));
      const computedAmpPower = (((((20) * (this.log10((((Math.sqrt((((((ampliPower) / (2))) * (impedance))))) / (0.775))))))) - (ampliGain)));
      const computedHpPower = (((charge === 'open') ? (powerHpOpen) : (powerHpClose)));
      const dBuTRacksPower = (((((computedAmpPower) > (computedHpPower))) ? (computedHpPower) : (computedAmpPower)));

      if (type === 'dbu')
        limiter = (((((dBuTRacksPower) > (0))) ? (this.rounddown((dBuTRacksPower), (1))) : (this.roundup((dBuTRacksPower), (1)))));
      else
        limiter = ((((((dBuTRacksPower) - (2.5)) > (0))) ? (this.rounddown((((dBuTRacksPower) - (2.5))), (0))) : (this.roundup((((dBuTRacksPower) - (2.5))), (0)))));
    } else {
      const powerHpOpen = (((((((20) * (this.log10((((Math.sqrt((((((hpPower) / (1.5625))) * (impedance))))) / (0.775))))))) - (ampliGain))) - (22)));
      const powerHpClose = (((((((20) * (this.log10((((Math.sqrt((((((hpPower) / (2.34375))) * (impedance))))) / (0.775))))))) - (ampliGain))) - (22)));
      let computedAmpPower;
      let computedHpPower;

      if (type === 'dcx_2496_sub') {
        computedAmpPower = (((((((((20) * (this.log10((((Math.sqrt((((((ampliPower) / (2))) * (impedance))))) / (0.775))))))) - (ampliGain))) - (22))) + (1.5)));
        computedHpPower = charge === "open" ? (((powerHpOpen) + (1.5))) : (((powerHpClose) + (1.5)));
      } else {
        computedAmpPower = (((((((((20) * (this.log10((((Math.sqrt((((((ampliPower) / (2))) * (impedance))))) / (0.775))))))) - (ampliGain))) - (22))) + (3.75)));
        computedHpPower = (charge === "open") ? (((powerHpOpen) + (3.75))) : (((powerHpClose) + (3.75)));
      }
      const rawLimiter = (((((computedAmpPower) > (computedHpPower))) ? (computedHpPower) : (computedAmpPower)));
      limiter = (((((rawLimiter) > (0))) ? (this.rounddown((rawLimiter), (1))) : (this.roundup((rawLimiter), (1)))));
    }
    this.limiterForm.get('limiter')?.setValue(limiter);
  }

  log10(x: number) {
    return Math.log(x) / Math.LN10;
  }

  rounddown(n: number, nd: number) {
    if (isFinite(n) && isFinite(nd)) {
      const sign_n = (n < 0) ? -1 : 1;
      const abs_n = Math.abs(n);
      const factor = Math.pow(10, (nd < 0 ? Math.ceil(nd) : Math.floor(nd)));
      return sign_n * Math.floor(abs_n * factor) / factor;
    } else {
      return NaN;
    }
  }

  roundup(n: number, nd: number) {
    if (isFinite(n) && isFinite(nd)) {
      const sign_n = (n < 0) ? -1 : 1;
      const abs_n = Math.abs(n);
      const factor = Math.pow(10, (nd < 0 ? Math.ceil(nd) : Math.floor(nd)));
      return sign_n * Math.ceil(abs_n * factor) / factor;
    } else {
      return NaN;
    }
  }

  async drop(limiter: LimiterThreshold) {
    return this.limiterService.drop(limiter);
  }

  selectLimiter(limiter: LimiterThreshold) {
    this.limiterService.currentLimiter.next(limiter);
    this.limiterForm.setValue(limiter);
    this.limiterForm.get('type')?.disable();
    this.limiterForm.get('charge')?.disable();
    this.modal?.dismiss();
  }

  resetLimiter() {
    this.currentLimiter.next(undefined);
    this.limiterForm.get('type')?.enable();
    this.limiterForm.get('charge')?.enable();
    this.limiterForm.reset();
  }
}
