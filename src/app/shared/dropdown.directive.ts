import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    // Click on the dropdown to close
    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    // Click anywhere on the page to close dropdown
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elRef: ElementRef) {}
}
