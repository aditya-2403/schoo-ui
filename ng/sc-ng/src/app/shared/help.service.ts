import { EventEmitter, Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })

export class HelperService {

    public getDateFormat(date: any) {
        date = new Date(date);
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        const year = date.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    public getFullYear(date: any){
        date = new Date(date);
        const year = date.getFullYear();
        return year;
    }
}
