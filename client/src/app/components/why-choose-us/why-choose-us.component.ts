import { Component, HostBinding, Input } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { BenefitBoxComponent } from '../benefit-box/benefit-box.component';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [SectionComponent, BenefitBoxComponent],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss',
})
export class WhyChooseUsComponent {
  title = 'Why Choose Us';

  benefits = [
    {
      icon: '../../../assets/images/Add shopping cart.svg',
      title: 'Fast Shipping',
      description:
        'Orders with multiple items can be shipped quickly for a speedy delivery.',
    },
    {
      icon: '../../../assets/images/Local shipping.svg',
      title: 'Fast Delivery',
      description: 'Get your products delivered to your doorstep in no time.',
    },
    {
      icon: '../../../assets/images/shopping-bag.svg',
      title: 'Best Prices',
      description: 'Get the best prices for your online shopping experience.',
    },
  ];

  // @HostBinding('class') classes = 'why-choose-us col l-4 m-6 c-12';

  sectionTitle: string = 'Why Choose Us';
  sectionSubTitle: string =
    'As the name fits the shoes, yes, they are sneakers, but it is also the reason to make your ankles look slender';
}
