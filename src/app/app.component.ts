import { Component, NgZone, ChangeDetectorRef, Input, ChangeDetectionStrategy, AfterViewChecked, AfterViewInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    _time;

    constructor(zone: NgZone) {
        // debugger;
        this._time = Date.now();

        // setInterval(() => {
        //     this._time = Date.now();
        // }, 1);

        // 利用异步和 跳出 angular zone 来 fix issue
        // This method is often used to run performance heavy operations outside Angular zone to avoid constantly triggering change detection.
        zone.runOutsideAngular(() => {
            setInterval(() => {
                this._time = Date.now();
            }, 1);
        })
    }

    get time() {
        debugger;
        // return Date.now(); // 报错，ExpressionChangedAfterItHasBeenCheckedError
        return this._time;
    }
}


@Component({
    selector: 'my-app',
    template: `
        <div [textContent]="text"></div>
        <child-comp></child-comp>
    `
})
export class FatherComponent {
    text = 'Original text in parent component';
}

@Component({
    selector: 'child-comp',
    template: `<span>I am child component</span>`
})
export class ChildComponent {
    constructor(private parent: FatherComponent) { }

    // 一个回调方法，它会在默认的变更检测器对组件视图完成了一轮变更检测周期之后立即调用。
    // ngAfterViewChecked() {
    //     this.parent.text = 'Updated text in parent component';
    // }

    ngOnInit() {
        this.parent.text = 'Updated text in parent component';
    }
}

// demo detach
@Component({
    selector: 'a-comp',
    template: `<span>See if I change: {{changed}}</span>`
})
export class AComponent {
    changed;

    constructor(public cd: ChangeDetectorRef) {
        this.changed = 'false';

        setTimeout(() => {
            this.cd.detach();
            this.changed = 'true';
        }, 2000);
    }
}

// export class AComponent {
//     @Input() inputAProp;

//     constructor(public cd: ChangeDetectorRef) {
//         this.cd.detach();
//     }

//     ngOnChanges(values) {
//         this.cd.reattach();
//         setTimeout(() => {
//             this.cd.detach();
//         })
//     }
// }

// demo retach
@Component({
    selector: 'retach-demo',
    template: `Number of ticks: {{numberOfTicks}}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetachDemoComponent {
    numberOfTicks = 0;

    constructor(private ref: ChangeDetectorRef) {
        setInterval(() => {
            this.numberOfTicks++;
            // require view to be updated
            // this.ref.markForCheck();
            this.ref.detectChanges();
        }, 1000);
    }
}
