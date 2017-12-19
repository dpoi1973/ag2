import {Component, ViewContainerRef, ViewChild, AfterViewInit} from '@angular/core';

import {ICellEditorAngularComp} from 'ag-grid-angular/main';
@Component({
    selector: 'editor-cell',
    template: `<div #container class="mood" tabindex="0" (keydown)="onKeyDown($event)">
            <input (click)="onClick(true)" [ngClass]="{'selected' : happy, 'default' : !happy}" [(ngModel)]='test'>
            <input (click)="onClick(false)" [ngClass]="{'selected' : !happy, 'default' : happy}" value='test002'>
        </div>`
})
export class MoodEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;

    @ViewChild('container', {read: ViewContainerRef}) public container;
    public happy: boolean = false;
    public test: any;

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        console.log(this.container)
        this.container.element.nativeElement.focus();
    }


    agInit(params: any): void {
        this.params = params;
        this.test = params.node.data.DecModNote;
        this.setHappy(params.value === "Happy");
    }

    getValue(): any {
        return this.happy ? "Happy" : "Sad";
    }

    isPopup(): boolean {
        return true;
    }

    setHappy(happy: boolean): void {
        this.happy = happy;
    }

    toggleMood(): void {
        this.setHappy(!this.happy);
    }

    onClick(happy:boolean) {
        this.setHappy(happy);
        this.params.api.stopEditing();
    }

    onKeyDown(event): void {
        let key = event.which || event.keyCode;
        if (key == 37 ||  // left
            key == 39) {  // right
            this.toggleMood();
            event.stopPropagation();
        }
    }
}