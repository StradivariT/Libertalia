import { ErrorHandler } from '@angular/core';

import { toastDuration } from './../../../environments/environment';
import { toast } from 'angular2-materialize';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        toast("Algo pasó con el servidor, intenta de nuevo", toastDuration);
        console.log(error);
    }
}