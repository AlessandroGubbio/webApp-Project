import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription, debounceTime, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { News, NewsDto } from 'src/app/dto/user.dto';
import { NewsService } from '../../service/news.service';
import { co } from '@fullcalendar/core/internal-common';

@Component({
    templateUrl: './dashboard.component.html',

})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    news: News[] | undefined;
    
    singleNews: NewsDto = new NewsDto;

    responsiveOptions: any[] | undefined;

    visible: boolean = false;

    isLoading: boolean = true;

    @ViewChild('skeletonTemplate') skeletonTemplate: any;
    @ViewChild('skeletonTemplate2') skeletonTemplate2: any;
    @ViewChild('skeletonTemplate3') skeletonTemplate3: any;

    
    constructor(public layoutService: LayoutService, private newsService: NewsService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }
    showDialog(id: number) {
        this.newsService.findById(id).subscribe(
            (data) => { this.singleNews = data}
        )
        console.log(this.singleNews)
        this.visible = true;
    }

    hideSkeleton() {
        if (this.skeletonTemplate && this.news.length > 0) {
            this.skeletonTemplate.nativeElement.style.display = 'none';
            this.skeletonTemplate2.nativeElement.style.display = 'none';
            this.skeletonTemplate3.nativeElement.style.display = 'none';
        }
    }

    ngOnInit() {
        this.initChart();
        this.newsService.getAllNews().subscribe(
            news => {this.news = news;
                console.log(this.news),
                this.hideSkeleton()},
            error => console.error(error)
          );
          
    
            this.responsiveOptions = [
                {
                    breakpoint: '1199px',
                    numVisible: 1,
                    numScroll: 1
                },
                {
                    breakpoint: '991px',
                    numVisible: 2,
                    numScroll: 1
                },
                {
                    breakpoint: '767px',
                    numVisible: 1,
                    numScroll: 1
                }
            ];

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    limitLines(text: string, maxLines: number) {
        if (text.length <= maxLines * 10) {
          return text;
        }
      
        const words = text.split(' ');
        const truncatedText = words.slice(0, maxLines).join(' ') + '...';
        return truncatedText;
      }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
