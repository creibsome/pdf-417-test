import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    isIE: boolean = false;
    theBackCamera: any;
    noCamera: boolean = false;
    noScan: boolean = false;
    desiredDevice: any = null;
    devices: Array<any> = [];
    selectedDevice: any = null;
    token: string;
    state: any;

    constructor() { }

    ngOnInit() {
        this.isIE = /Trident\/|MSIE/.test(window.navigator.userAgent);
    }

    @ViewChild('scan', { static: false })
    scanner: ZXingScannerComponent;

    scanSuccessHandler($event) {
        alert($event);
    }

    camerasFound($event) {
        this.devices = $event;
        debugger;
        let preferredDevice = window.localStorage.getItem('DEVICE');

        for (let i = 0; i < $event.length; i++) {
            if ($event[i].deviceId == preferredDevice) {
                this.selectedDevice = $event[i];
                break;
            }
        }

        if (this.selectedDevice == null) {
            this.selectedDevice = $event[0];
        }

        this.desiredDevice = this.selectedDevice;
    }

    selectDevice($event) {
        console.log($event);
        this.desiredDevice = $event.target.value;
        window.localStorage.setItem('DEVICE', $event.target.value.deviceId);
    }

    camerasNotFoundHandler($event) {
        this.noCamera = true;
    }

    scanCompleteHandler($event) {
        console.log($event);
    }

    scanErrorHandler($event) {
        console.log($event);
    }

    scanFailureHandler($event) {
        console.log($event);
    }

}
