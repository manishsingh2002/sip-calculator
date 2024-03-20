import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.css'],
})
export class SipCalculatorComponent implements OnInit {
  principal: any;
  sip_rate: number = 0;
  year: number = 0;
  chart: any;
  totalprinciples: any;
  futureValue: number | null = null;
  profit: any;

  ngOnInit() {}

  calculateFutureValue(): any {
    const monthlyContribution = this.principal;
    const annualInterestRate = this.sip_rate;
    const investmentTenureInYears = this.year;

    // Validate inputs
    if (
      monthlyContribution <= 0 ||
      annualInterestRate <= 0 ||
      investmentTenureInYears <= 0
    ) {
      this.futureValue = null;
      return 0; // Assuming the function returns a number (optional)
    }

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = investmentTenureInYears * 12;

    let futureValue = 0;
    for (let i = 0; i < totalMonths; i++) {
      futureValue =
        (futureValue + monthlyContribution) * (1 + monthlyInterestRate);
    }

    this.futureValue = futureValue;
    this.totalprinciples = this.principal * this.year * 12;
    this.profit = this.futureValue - this.totalprinciples;
  }

  getMoneyInvestedVsProfitDifference(): number {
    return this.profit - this.totalprinciples;
  }

  createPieChart() {
    const chartCanvas = document.getElementById(
      'pieChart'
    ) as HTMLCanvasElement;
    const context = chartCanvas.getContext('2d');
    if (chartCanvas) {
      this.chart = new Chart(chartCanvas, {
        type: 'pie',
        data: {
          labels: ['Principal', 'Profit Value'],
          datasets: [
            {
              data: [this.totalprinciples, this.profit ?? 0], // Using principal and futureValue properties
              backgroundColor: [
                'rgba(255, 159, 64, 0.6)', // Principal color
                'rgba(54, 162, 235, 0.6)', // Profit Value color
              ],
            },
          ],
        },
      });
    } else {
      console.error('Canvas element with id "pieChart" not found');
    }
  }

  view() {
    this.calculateFutureValue();
    this.createPieChart();
  }
}
