import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(value, args): any {
        if (!value || !args) {  
            return value;  
        }  

        args = args.toLowerCase();

        return value.filter(item => item.name.toLowerCase().indexOf(args) !== -1);
    }
}