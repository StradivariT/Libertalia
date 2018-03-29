import { Response } from '@angular/http';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { unexpectedErrorMessage } from './../../../environments/environment';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(Injector) private injector: Injector) {}

    private get toasty(): ToastyService { return this.injector.get(ToastyService); }

    handleError(error: Response): void {
        let toastOptions = {
            title: 'Oops!',
            msg: unexpectedErrorMessage,
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };

        this.toasty.error(toastOptions);
        console.log(error);
    }
}