import { NgModule } from '@angular/core';
import { SecondToTimePipe } from './secondToTime.pipe';

@NgModule({
    declarations: [
        SecondToTimePipe
    ],
    exports: [
        SecondToTimePipe
    ]
})
export class SecondToTimeModule {

}