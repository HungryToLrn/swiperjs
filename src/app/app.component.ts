import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  slides = [
    { title: 'Slide 1', content: 'This is the first slide' },
    { title: 'Slide 2', content: 'This is the second slide' },
    { title: 'Slide 3', content: 'This is the third slide' },
    { title: 'Slide 4', content: 'This is the fourth slide' },
    { title: 'Slide 11',content: 'This is the first slide' },
    { title: 'Slide 21',content: 'This is the second slide' },
    { title: 'Slide 31',ontent: 'This is the third slide' },
    { title: 'Slide 41',content: 'This is the fourth slide' }
  ];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: { clickable: true },
    loop: true,
    modules: [Navigation, Pagination]
  };

  private swiperInstance!: Swiper;

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  initializeSwiper() {
    const swiperEl = this.swiperRef.nativeElement;
    this.swiperInstance = new Swiper(swiperEl, this.swiperConfig);
    console.log('Swiper initialized:', this.swiperInstance);
  }

  updateSwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
    }
    this.initializeSwiper();
  }
}