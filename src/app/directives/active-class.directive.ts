import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * 在宿主元素被Active时（tap）添加一个CSS类名，并且在指定时间后移除，不填写duration代表不移除
 */
@Directive({
  selector: '[appActiveClass]'
})
export class ActiveClassDirective {
  /** active的时候添加的CSS类名 */
  @Input() appActiveClass: string;
  /** 多少毫秒后移除CSS类名 */
  @Input() appActiveClassDuration: number;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }

  @HostListener('tap') onTap() {
    this.renderer2.addClass(this.elementRef.nativeElement, this.appActiveClass || 'active');

    this.appActiveClassDuration && setTimeout(() => {
      this.renderer2.removeClass(this.elementRef.nativeElement, this.appActiveClass || 'active');
    }, this.appActiveClassDuration);
  }

}
