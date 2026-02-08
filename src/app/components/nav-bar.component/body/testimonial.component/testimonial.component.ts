import { AfterViewInit, Component, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialItemComponent } from '../testimonial-item.component/testimonial-item.component';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, TestimonialItemComponent],
  templateUrl: './testimonial.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestimonialComponent implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef?: ElementRef;

  items = [1, 2, 3, 4, 5, 6];

  ngAfterViewInit(): void {
    const swiperEl = this.swiperRef?.nativeElement;
    if (!swiperEl) {
      return;
    }

    Object.assign(swiperEl, {
      slidesPerView: 1.2,
      spaceBetween: 40,
      centeredSlides: true,
      centeredSlidesBounds: true,
      initialSlide: Math.floor(this.items.length / 2),
      navigation: false,
      pagination: { clickable: true },
      breakpoints: {
        1: {
          spaceBetween: 40,
          slidesPerView: 1.2
        },
        768: {
          spaceBetween: 50,
          slidesPerView: 1.5
        },
        1024: {
          spaceBetween: 50,
          slidesPerView: 2
        }
      }
    });

    swiperEl.initialize();
  }

  slidePrev(): void {
    this.swiperRef?.nativeElement?.swiper?.slidePrev();
  }

  slideNext(): void {
    this.swiperRef?.nativeElement?.swiper?.slideNext();
  }
}
