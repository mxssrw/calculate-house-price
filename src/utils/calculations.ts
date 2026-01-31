export interface ScheduleItem {
  month: number;
  payment?: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface AmortizationScheduleResult {
  schedule: ScheduleItem[];
  summary: {
    finalBalance: number;
    totalInterest: number;
    years: number;
    monthlyPayment: number;
  };
}

export interface AmortizationByPaymentResult {
  schedule: ScheduleItem[];
  summary: {
    months: number;
    years: number;
    totalInterest: number;
  };
}

export interface RemainingBalanceResult {
  schedule: ScheduleItem[];
  summary: {
    remainingBalance: number;
    totalInterest: number;
  };
}

/**
 * แสดงตารางผ่อนแบบลดต้นลดดอก
 */
export const calculateAmortizationSchedule = (
  principal: number,
  annualRate: number,
  years: number
): AmortizationScheduleResult => {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / totalMonths;
  } else {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  let balance = principal;
  let totalInterest = 0;
  const schedule: ScheduleItem[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyRate;
    let principalPaid = monthlyPayment - interest;
    balance -= principalPaid;
    totalInterest += interest;

    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      principalPaid,
      interestPaid: interest,
      remainingBalance: balance,
    });
  }

  return {
    schedule,
    summary: {
      finalBalance: balance,
      totalInterest,
      years,
      monthlyPayment,
    },
  };
};

/**
 * คำนวณตารางผ่อนแบบลดต้นลดดอก โดยกำหนด 'ค่างวดต่อเดือน'
 */
export const calculateAmortizationByPayment = (
  principal: number,
  annualRate: number,
  monthlyPayment: number
): AmortizationByPaymentResult => {
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  let totalInterest = 0;
  let month = 0;
  const schedule: ScheduleItem[] = [];

  // Safety break to prevent infinite loops if payment is too low (though we check below)
  // or if it takes too long (e.g. > 100 years? let's stick to logic but add check)
  
  // Existing logic: while balance > 0
  while (balance > 0) {
    month += 1;
    const interest = balance * monthlyRate;
    let principalPaid = monthlyPayment - interest;

    if (principalPaid <= 0) {
       throw new Error("ค่างวดต่ำกว่าดอกเบี้ย ไม่สามารถปิดหนี้ได้");
    }

    balance -= principalPaid;
    totalInterest += interest;

    if (balance < 0) {
      principalPaid += balance; // Adjust last payment details if needed, logic says pPaid = pPaid + negative_balance = pPaid - overpay
      balance = 0;
    }

    schedule.push({
      month,
      payment: monthlyPayment,
      principalPaid,
      interestPaid: interest,
      remainingBalance: balance,
    });
    
    // Safety guard
    if (month > 12 * 100) { 
        throw new Error("Payment plan exceeds 100 years, please increase payment.");
    }
  }

  const years = month / 12;

  return {
    schedule,
    summary: {
      months: month,
      years,
      totalInterest,
    },
  };
};

/**
 * จำลองการผ่อนแบบลดต้นลดดอก ระบุจำนวนเดือน
 */
export const calculateRemainingBalance = (
  principal: number,
  annualRate: number,
  monthlyPayment: number,
  months: number
): RemainingBalanceResult => {
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  let totalInterest = 0;
  const schedule: ScheduleItem[] = [];

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    let principalPaid = monthlyPayment - interest;

    if (principalPaid <= 0) {
      throw new Error("ค่างวดต่ำกว่าดอกเบี้ย → หนี้เพิ่ม");
    }

    balance -= principalPaid;
    totalInterest += interest;

    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      principalPaid,
      interestPaid: interest,
      remainingBalance: balance,
    });

    if (balance === 0) break;
  }

  return {
    schedule,
    summary: {
      remainingBalance: balance,
      totalInterest,
    },
  };
};
