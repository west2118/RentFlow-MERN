/**
 * Generates an array of simulated payment objects from lease start up to the specified target date.
 * These payments are NOT saved to the database. They use a custom _id format:
 * `simulated-${leaseId}-${year}-${month}` (where month is 0-indexed).
 */
export const getSimulatedPayments = (lease, upToDate) => {
  if (!lease || !lease.isActive) return [];

  const payments = [];
  let current = new Date(lease.leaseStart);
  current.setDate(1);

  const leaseEndDate = new Date(lease.leaseEnd);

  // Set targetDate to the 1st of the month of the provided upToDate
  let targetDate = new Date(upToDate.getFullYear(), upToDate.getMonth(), 1);

  while (
    (current.getFullYear() < targetDate.getFullYear() || 
    (current.getFullYear() === targetDate.getFullYear() && current.getMonth() <= targetDate.getMonth())) 
    && current <= leaseEndDate
  ) {
    const leaseStartDay = new Date(lease.leaseStart).getDate();
    const daysInCurrentMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
    const actualDay = Math.min(leaseStartDay, daysInCurrentMonth);

    const dueDate = new Date(current.getFullYear(), current.getMonth(), actualDay);
    
    let amount = lease.rentAmount;

    const isFirstMonth =
      current.getMonth() === new Date(lease.leaseStart).getMonth() &&
      current.getFullYear() === new Date(lease.leaseStart).getFullYear();

    if (isFirstMonth) {
      const daysInMonth = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0
      ).getDate();

      const proratedDays = daysInMonth - leaseStartDay + 1;
      amount = (lease.rentAmount / daysInMonth) * proratedDays;
    }

    payments.push({
      _id: `simulated-${lease._id}-${current.getFullYear()}-${current.getMonth()}`,
      leaseId: lease._id,
      unitId: lease.unitId,
      landlordId: lease.landlordId,
      tenantId: lease.tenantId,
      dueDate: new Date(dueDate),
      amount: Math.round(amount),
      status: "Pending",
    });

    current.setMonth(current.getMonth() + 1);
  }

  return payments;
};

/**
 * Gets a specific simulated payment for a given year and month.
 */
export const getSpecificSimulatedPayment = (lease, targetYear, targetMonth) => {
  const upToDate = new Date(targetYear, targetMonth, 1);
  const payments = getSimulatedPayments(lease, upToDate);
  
  return payments.find(p => {
    const d = new Date(p.dueDate);
    return d.getFullYear() === Number(targetYear) && d.getMonth() === Number(targetMonth);
  });
};
