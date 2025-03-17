import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('dateSwiperRef') dateSwiperRef!: ElementRef;
  @ViewChild('prevButton') prevButton!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;

  selectedInputDate: string = '2025-03-18';
  dateFares: { date: string; price: number; fareType: string }[] = [];
  selectedDateFare: { date: string; price: number; fareType: string } | null = null;

  dateSwiperConfig: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
      nextEl: '.date-swiper-button-next',
      prevEl: '.date-swiper-button-prev'
    },
    pagination: { clickable: true },
    modules: [Navigation, Pagination]
  };

  private dateSwiperInstance!: Swiper;

  ngOnInit() {
    this.updateDateFares(); // Populate dateFares
    this.selectedDateFare = this.dateFares[6]; // Set initial selection (middle date)
  }

  ngAfterViewInit() {
    this.initializeDateSwiper();
  }

  initializeDateSwiper() {
    const swiperEl = this.dateSwiperRef.nativeElement;
    if (this.dateSwiperInstance) {
      this.dateSwiperInstance.destroy();
    }
    this.dateSwiperConfig.navigation = {
      nextEl: this.nextButton.nativeElement,
      prevEl: this.prevButton.nativeElement
    };
    this.dateSwiperInstance = new Swiper(swiperEl, this.dateSwiperConfig);
    this.dateSwiperInstance.on('slideChange', () => {
      const activeIndex = this.dateSwiperInstance.activeIndex;
      this.selectedDateFare = this.dateFares[activeIndex];
    });
    this.dateSwiperInstance.slideTo(6, 0); // Center the selected date
    console.log('Navigation initialized:', this.dateSwiperInstance.navigation);
    console.log('Slides per view:', this.dateSwiperInstance.params.slidesPerView);
    this.dateSwiperInstance.update();
  }

  updateDateFares() {
    this.dateFares = this.generateDateFares(this.selectedInputDate);
    this.selectedDateFare = this.dateFares[6]; // Update selection when dates change
    if (this.dateSwiperInstance) {
      this.initializeDateSwiper();
    }
  }

  updateDateSwiper() {
    this.initializeDateSwiper();
  }

  generateDateFares(selectedDate: string): { date: string; price: number; fareType: string }[] {
    const dateFares = [];
    const baseDate = new Date(selectedDate);
    const baseFares = [
      { price: 150, fareType: 'Economy' },
      { price: 160, fareType: 'Economy' },
      { price: 145, fareType: 'Economy' },
      { price: 155, fareType: 'Economy' },
      { price: 170, fareType: 'Economy' },
      { price: 165, fareType: 'Economy' },
      { price: 180, fareType: 'Economy' },
      { price: 175, fareType: 'Economy' },
      { price: 160, fareType: 'Economy' },
      { price: 155, fareType: 'Economy' },
      { price: 170, fareType: 'Economy' },
      { price: 165, fareType: 'Economy' },
      { price: 180, fareType: 'Economy' }
    ];

    for (let i = -6; i <= 6; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      dateFares.push({
        date: formattedDate,
        price: baseFares[i + 6].price,
        fareType: baseFares[i + 6].fareType
      });
    }
    return dateFares;
  }

  bookFlight() {
    if (this.selectedDateFare) {
      alert(`Booking confirmed!\nDate: ${this.selectedDateFare.date}\nFare: ${this.selectedDateFare.fareType} - $${this.selectedDateFare.price}`);
    } else {
      alert('Please select a date and fare.');
    }
  }
}