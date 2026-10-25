import { Component, computed, signal } from '@angular/core';

interface Policy {
  id: string;
  name: string;
  type: string;
  coverage: number;
  premium: number;
  status: 'Active' | 'Expired' | 'Pending';
  renewalDate: string;
}

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [],
  templateUrl: './policies.html',
  styleUrl: './policies.scss',
})
export class Policies {
  searchTerm = signal('');
  selectedStatus = signal('All');

  policies = signal<Policy[]>([
    {
      id: 'POL-10021',
      name: 'Health Secure Plus',
      type: 'Health Insurance',
      coverage: 500000,
      premium: 2500,
      status: 'Active',
      renewalDate: '25 Oct 2026',
    },
    {
      id: 'POL-10035',
      name: 'Vehicle Protection',
      type: 'Vehicle Insurance',
      coverage: 300000,
      premium: 1800,
      status: 'Active',
      renewalDate: '12 Dec 2026',
    },
    {
      id: 'POL-10042',
      name: 'Family Health Plan',
      type: 'Health Insurance',
      coverage: 800000,
      premium: 3200,
      status: 'Pending',
      renewalDate: '15 Nov 2026',
    },
    {
      id: 'POL-10008',
      name: 'Travel Protect',
      type: 'Travel Insurance',
      coverage: 200000,
      premium: 900,
      status: 'Expired',
      renewalDate: '01 Sep 2026',
    },
  ]);

  filteredPolicies = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.policies().filter((policy) => {
      const matchesSearch =
        policy.name.toLowerCase().includes(search) ||
        policy.id.toLowerCase().includes(search) ||
        policy.type.toLowerCase().includes(search);

      const matchesStatus = status === 'All' || policy.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
}
