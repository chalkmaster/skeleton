import { EqualizationSummary } from '../entity/equalization-summary';

export class EqualizationService {
  constructor() {
  }
  getSummarry(sessionId: string) {
    if (!sessionId) return;

    return [
      new EqualizationSummary(
        4518371.52,
        0,
        52509.84,
        61880.40,
        212545.98,
        4296454.97,
        'https://localhost:4002/api/v1/equalization/a38cf526-5bb2-5df7-b3ff-b97bd2c8e6d2/payments',
        'https://localhost:4002/api/v1/equalization/a38cf526-5bb2-5df7-b3ff-b97bd2c8e6d2/creditRateRevenue',
        'https://localhost:4002/api/v1/equalization/a38cf526-5bb2-5df7-b3ff-b97bd2c8e6d2/interestAndArrearsRevenue',
        'https://localhost:4002/api/v1/equalization/a38cf526-5bb2-5df7-b3ff-b97bd2c8e6d2/operatingExpensesReimbursement',
        'https://localhost:4002/api/v1/equalization/a38cf526-5bb2-5df7-b3ff-b97bd2c8e6d2/taxRefunds',
        'SAMPLE',
        'Fevereiro de 2020',
        'a38cf526-5bb2-5df7-b3ff-b97bd2c8e6d2'
      ),
      new EqualizationSummary(
        34234234.52,
        0,
        23122.84,
        3212.40,
        654534.98,
        32234234.97,
        'https://localhost:4002/api/v1/equalization/c38cf526-5bb2-5df7-b3ff-b97bd2c8e6d3/feeRevenue',
        'https://localhost:4002/api/v1/equalization/c38cf526-5bb2-5df7-b3ff-b97bd2c8e6d3/creditRateRevenue',
        'https://localhost:4002/api/v1/equalization/c38cf526-5bb2-5df7-b3ff-b97bd2c8e6d3/interestAndArrearsRevenue',
        'https://localhost:4002/api/v1/equalization/c38cf526-5bb2-5df7-b3ff-b97bd2c8e6d3/operatingExpensesReimbursement',
        'https://localhost:4002/api/v1/equalization/c38cf526-5bb2-5df7-b3ff-b97bd2c8e6d3/taxRefunds',
        'SAMPLE',
        'Março de 2020',
        'c38cf526-5bb2-5df7-b3ff-b97bd2c8e6d3'
      ),
      new EqualizationSummary(
        18371.52,
        12312.1,
        2509.84,
        1880.40,
        12545.98,
        96454.97,
        'https://localhost:4002/api/v1/equalization/f38cf526-5bb2-5df7-b3ff-b97bd2c8e6d4/feeRevenue',
        'https://localhost:4002/api/v1/equalization/f38cf526-5bb2-5df7-b3ff-b97bd2c8e6d4/creditRateRevenue',
        'https://localhost:4002/api/v1/equalization/f38cf526-5bb2-5df7-b3ff-b97bd2c8e6d4/interestAndArrearsRevenue',
        'https://localhost:4002/api/v1/equalization/f38cf526-5bb2-5df7-b3ff-b97bd2c8e6d4/operatingExpensesReimbursement',
        'https://localhost:4002/api/v1/equalization/f38cf526-5bb2-5df7-b3ff-b97bd2c8e6d4/taxRefunds',
        'SAMPLE',
        'Abril de 2020',
        'f38cf526-5bb2-5df7-b3ff-b97bd2c8e6d4'
      ),
    ];
  }
}