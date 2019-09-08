function ticket(tickets, sortingCriteria) {
    class Tickets {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let unsortedTickets = [];

    for (const ticket of tickets) {
        let [destination, price, status] = ticket.split('|');

        unsortedTickets.push(new Tickets(destination, Number(price), status));
    }

    let sortedTickets = {};

    switch (sortingCriteria) {
        case 'destination':
            sortedTickets = unsortedTickets.sort((a, b) => {
                return a.destination.localeCompare(b.destination);
            });
            break;
        case 'price':
            sortedTickets = unsortedTickets.sort((a, b) => {
                return a.price - b.price;
            });
            break;
        case 'status':
            sortedTickets = unsortedTickets.sort((a, b) => {
                return a.status.localeCompare(b.status);
            });
            break;

    }
    return sortedTickets;
}

console.log(ticket(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'
));