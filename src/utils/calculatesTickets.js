function getSelectedTicketsWithPrices(ticketTypes, ticketData) {
  const selectedTickets = [];
  let totalCost = 0;

  for (const ticket of ticketTypes) {
    const quantity = ticketData?.[ticket.name] || 0;

    if (quantity > 0) {
      const cost = ticket.cost;
      const total = quantity * cost;

      selectedTickets.push({
        name: ticket.name,
        quantity,
        cost,
        total,
      });
      totalCost += total;
    }
  }
  return { selectedTickets, totalCost };
}
export default getSelectedTicketsWithPrices;
