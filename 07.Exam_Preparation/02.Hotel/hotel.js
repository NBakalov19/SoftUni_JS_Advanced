class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;

        this.roomPricing = {
            single: 50,
            double: 90,
            maisonette: 135,
        };

        this.servicesPricing = {
            food: 10,
            drink: 15,
            housekeeping: 25,
        };

        this.availablesRooms = {
            single: Math.floor(this.capacity * 0.5),
            double: Math.floor(this.capacity * 0.3),
            maisonette: Math.floor(this.capacity * 0.2),
        }
    }

    rentARoom(clientName, roomType, nights) {
        let output = [];

        if (this.availablesRooms[roomType] <= 0) {

            output.push(`No ${roomType} rooms available!`);

            let rooms = Object.keys(this.availablesRooms)
                .filter(x => this.availablesRooms[x] > 0);

            for (const room of rooms) {
                output.push(`Available ${room} rooms: ${this.availablesRooms[room]}.`)
            }

            return output.join(' ')
        }

        output.push(`Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber}.`);

        let book = {
            clientName,
            roomType,
            nights,
            roomNumber: this.currentBookingNumber,
        };

        this.bookings.push(book);
        this.availablesRooms[roomType]--;
        this.currentBookingNumber++;


        return output.join(' ');
    }

    roomService(currentBookingNumber, serviceType) {

        let currentRoom = this.bookings.filter(x => x.roomNumber === currentBookingNumber);

        if (currentRoom.length === 0) {
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        if (!this.servicesPricing.hasOwnProperty(serviceType)) {
            return `We do not offer ${serviceType} service.`;
        }

        if (!currentRoom[0].hasOwnProperty('services')) {
            currentRoom[0]['services'] = [];

        }

        currentRoom[0]['services'].push(serviceType);

        return `Mr./Mrs. ${currentRoom[0]['clientName']}, Your order for ${serviceType} service has been successful.`;

    }

    checkOut(currentBookingNumber) {

        let currentRoom = this.bookings.filter(x => x.roomNumber === currentBookingNumber)[0];

        if (currentRoom.length === 0) {
            return `The booking ${currentBookingNumber} is invalid.`
        }
        let totalMoney = 0;

        let roomType = currentRoom['roomType'];
        this.availablesRooms[roomType] += 1;

        this.bookings = this.bookings
            .filter(x => x.roomNumber !== currentBookingNumber);


        totalMoney += this.roomPricing[roomType] * currentRoom['nights'];

        if (!currentRoom['services']) {
            return `We hope you enjoyed your time here, Mr./Mrs. ${currentRoom['clientName']}.` +
                ` The total amount of money you have to pay is ${totalMoney} BGN.`
        }
        let paidForServices = 0;

        for (const service of currentRoom['services']) {
            paidForServices += this.servicesPricing[service];
        }

        totalMoney = totalMoney + paidForServices;

        return `We hope you enjoyed your time here, Mr./Mrs. ${currentRoom['clientName']}.` +
            `The total amount of money you have to pay is ${totalMoney} BGN.` +
            `You have used additional room services, costing ${paidForServices} BGN.`
    }

    report() {
        let output = [];
        const bigSeparator = '-'.repeat(20);
        const smallSeparator = '-'.repeat(10);
        output.push(`${this.name.toUpperCase()} DATABASE:`);
        output.push(bigSeparator);

        if (this.bookings.length === 0) {
            output.push('There are currently no bookings.');
        } else {
            let middleOutput = [];
            for (const room of this.bookings) {
                let curr = [];
                curr.push(`bookingNumber - ${room['roomNumber']}`);
                curr.push(`clientName - ${room['clientName']}`);
                curr.push(`roomType - ${room['roomType']}`);
                curr.push(`nights - ${room['nights']}`);
                if (room.hasOwnProperty('services')) {
                    curr.push(`services: ${room['services'].join(', ')}`);
                }

                middleOutput.push(curr.join('\n'));
            }
            output.push(middleOutput.join(`\n${smallSeparator}\n`));
        }

        return output.join('\n');
    }
}

// 81/100