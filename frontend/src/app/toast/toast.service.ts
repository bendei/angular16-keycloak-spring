import {Injectable} from '@angular/core';
import {ActiveToast, GlobalConfig, IndividualConfig, ToastrService} from 'ngx-toastr';

const toastConfig = {
  successTimeout: 2000,
  errorTimeout: 4000,
  infoTimeout: 4000
};

export const defaultToastConfig: Partial<IndividualConfig> = {
  timeOut: 0,
  extendedTimeOut: 0,
  positionClass: 'toast-top-center',
  progressBar: true,
  tapToDismiss: false,
  closeButton: true
};

export const globalToastConfig: Partial<GlobalConfig> = {
  ...defaultToastConfig,
  autoDismiss: false
};

@Injectable()
export class ToastService {
  private toastsToBeCleared: ActiveToast<any>[];

  constructor(private toastrService: ToastrService) {
    this.toastsToBeCleared = [];
  }

  success(message: string, title?: string, clearOnPageChange = false, enableTimeOut = true): ActiveToast<any> {
    this.clear();
    const toast = this.toastrService
      .success(message, title, {...defaultToastConfig, disableTimeOut: !enableTimeOut, timeOut: toastConfig.successTimeout});
    if (clearOnPageChange) {
      this.toastsToBeCleared.push(toast);
    }
    return toast;
  }

  info(message: string, title?: string, clearOnPageChange = false): ActiveToast<any> {
    this.clear();
    // setting configuration globally seems to be buggy, therefore setting it on every call
    const toast = this.toastrService
      .info(message, title, {...defaultToastConfig, timeOut: toastConfig.infoTimeout});
    if (clearOnPageChange) {
      this.toastsToBeCleared.push(toast);
    }
    return toast;
  }

  warning(message: string, title?: string, clearOnPageChange = false): ActiveToast<any> {
    this.clear();
    const toast = this.toastrService.warning(message, title, defaultToastConfig);
    if (clearOnPageChange) {
      this.toastsToBeCleared.push(toast);
    }
    return toast;
  }

  error(message: string, title?: string, clearOnPageChange = true, enableTimeOut = true): ActiveToast<any> {
    this.clear();
    const toast = this.toastrService
      .error(message, title, {...defaultToastConfig, disableTimeOut: !enableTimeOut, timeOut: toastConfig.errorTimeout});
    if (clearOnPageChange) {
      this.toastsToBeCleared.push(toast);
    }
    return toast;
  }

  clear(toast?: ActiveToast<any>): void {
    if (typeof toast !== 'undefined') {
      this.toastrService.clear(toast.toastId);
    } else {
      this.toastrService.clear();
    }
  }

  clearOnPageChange() {
    if (this.toastsToBeCleared) {
      for (const t of this.toastsToBeCleared) {
        this.clear(t);
      }
    }
    this.toastsToBeCleared = [];
  }
}
