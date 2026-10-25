import { Component, computed, signal } from '@angular/core';

type PaymentStatus = 'Success' | 'Pending' | 'Failed';

interface Payment {
  id: string;
  policyId: string;
  policyName: string;
  amount: number;
  paymentDate: string;
  method: string;
  status: PaymentStatus;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
})
export class Payments {
  searchTerm = signal('');
  selectedStatus = signal('All');

  payments = signal<Payment[]>([
    {
      id: 'TXN-50021',
      policyId: 'POL-10021',
      policyName: 'Health Secure Plus',
      amount: 2500,
      paymentDate: '08 Oct 2026',
      method: 'UPI',
      status: 'Success',
    },
    {
      id: 'TXN-50020',
      policyId: 'POL-10035',
      policyName: 'Vehicle Protection',
      amount: 1800,
      paymentDate: '01 Oct 2026',
      method: 'Credit Card',
      status: 'Success',
    },
    {
      id: 'TXN-50019',
      policyId: 'POL-10021',
      policyName: 'Health Secure Plus',
      amount: 2500,
      paymentDate: '25 Sep 2026',
      method: 'Net Banking',
      status: 'Pending',
    },
    {
      id: 'TXN-50018',
      policyId: 'POL-10008',
      policyName: 'Travel Protect',
      amount: 900,
      paymentDate: '20 Sep 2026',
      method: 'UPI',
      status: 'Failed',
    },
  ]);

  filteredPayments = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.payments().filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(search) ||
        payment.policyId.toLowerCase().includes(search) ||
        payment.policyName.toLowerCase().includes(search);

      const matchesStatus = status === 'All' || payment.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  getPaymentCount(status: PaymentStatus): number {
    return this.payments().filter((payment) => payment.status === status).length;
  }

  getSuccessfulTotal(): number {
    return this.payments()
      .filter((payment) => payment.status === 'Success')
      .reduce((total, payment) => total + payment.amount, 0);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
}
