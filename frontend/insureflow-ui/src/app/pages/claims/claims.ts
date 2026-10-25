import { Component, computed, signal } from '@angular/core';

type ClaimStatus = 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';

interface Claim {
  id: string;
  policyName: string;
  policyId: string;
  claimType: string;
  amount: number;
  submittedDate: string;
  status: ClaimStatus;
}

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [],
  templateUrl: './claims.html',
  styleUrl: './claims.scss',
})
export class Claims {
  searchTerm = signal('');
  selectedStatus = signal('All');
  notice = signal('');

  claims = signal<Claim[]>([
    {
      id: 'CLM-20014',
      policyName: 'Health Secure Plus',
      policyId: 'POL-10021',
      claimType: 'Medical Expenses',
      amount: 18500,
      submittedDate: '06 Oct 2026',
      status: 'Under Review',
    },
    {
      id: 'CLM-20012',
      policyName: 'Vehicle Protection',
      policyId: 'POL-10035',
      claimType: 'Vehicle Damage',
      amount: 32000,
      submittedDate: '28 Sep 2026',
      status: 'Approved',
    },
    {
      id: 'CLM-20009',
      policyName: 'Health Secure Plus',
      policyId: 'POL-10021',
      claimType: 'Hospitalization',
      amount: 45000,
      submittedDate: '15 Sep 2026',
      status: 'Submitted',
    },
    {
      id: 'CLM-20005',
      policyName: 'Travel Protect',
      policyId: 'POL-10008',
      claimType: 'Travel Delay',
      amount: 6500,
      submittedDate: '02 Sep 2026',
      status: 'Rejected',
    },
  ]);

  filteredClaims = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.claims().filter((claim) => {
      const matchesSearch =
        claim.id.toLowerCase().includes(search) ||
        claim.policyName.toLowerCase().includes(search) ||
        claim.claimType.toLowerCase().includes(search);

      const matchesStatus = status === 'All' || claim.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  getClaimCount(status: ClaimStatus): number {
    return this.claims().filter((claim) => claim.status === status).length;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  showNewClaimMessage(): void {
    this.notice.set('Claim submission form will be available in the next step.');
  }
}
