var eventsList = [];
var canAddEvents = true;
var canAddCustomers = true;

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

var daysInMonth = function (m, y) {
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 :
        case 3 :
        case 5 :
        case 10 :
            return 30;
        default :
            return 31
    }
};

var isValidDate = function (d, m, y) {
    m = parseInt(m, 10) - 1;
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};

// adultOnly = true ако събитието е само за лица над 18 години
// ако не се подаде adultOnly, или adultOnly = false няма ограничение на възрастта
function Event(name, adultOnly, date, price) {
    function getUniqueId() {
        while (true) {
            var id = Math.random(100).toString().substr(2, 4);
            var foundEventWithThisId = false;
            eventsList.forEach(function (element) {
                if (element.id == id) {
                    foundEventWithThisId = true;
                }
            });
            if (foundEventWithThisId === false) {
                return id;
            }
        }
    }

    this.id = getUniqueId();
    this.name = name;
    this.adultOnly = adultOnly ? adultOnly : false;

    if (date !== undefined) {
        var from = date.split(".");
        this.date = new Date(from[2], from[1] - 1, from[0]);
    }
    this.price = price !== undefined ? price : 0;
    this.rating = 0;
    this.ratingCounter = 0;

    this.customers = [];
}

function createEvent(name, adultOnly, date, price) {
    if (!canAddEvents) {
        console.log('The system is closed and you can\'t add events to the list!');
        return;
    }
    if (name == undefined || name == '') {
        console.log('Name can not be undefined or empty string.');
        return;
    }

    if (adultOnly !== undefined && typeof adultOnly !== "boolean") {
        console.log('Age restriction must be boolean type.');
        return;
    }

    var tempDate;
    if (date !== undefined && date.split(".").length == 3) {
        var from = date.split(".");
        if (date != undefined && !isValidDate(from[0], from[1], from[2])) {
            console.log('Invalid Date: ' + date);
            return;
        }
    }

    if (price !== undefined && typeof price != 'number') {
        console.log('Price must be number.');
        return;
    }

    var event = new Event(name, adultOnly, date, price);
    eventsList.push(event);
    console.log('Successfully added: \n' + printEvent(event));
}

function createEvents() {
    for (let j = 0; j < arguments.length; j++) {
        createEvent(arguments[j][0], arguments[j][1], arguments[j][2], arguments[j][3]);
    }
}

function dateToString(date) {
    return pad(date.getDate(), 2) + '.' + pad((date.getMonth() + 1), 2) + '.' + date.getFullYear();
}

function printEventRating(event) {
    return event.ratingCounter > 0
        ? Math.round((((event.rating - event.ratingCounter) / (9 / 100) / event.ratingCounter) * (6 / 100)) * 100) / 100
        : 'Pending Update';
}

function printEvent(event) {
    if (event === undefined) {
        console.log('Event can not be undefined.');
        return;
    }
    return 'Index: ' + eventsList.indexOf(event) + '; ID: ' + event.id + '; ' +
        'Name: ' + (event.price ? '$' : '!') +
        (event.adultOnly === true ? '*' : '#') +
        (event.archived !== undefined ? '~' : '') +
        event.name + '; ' +
        (event.adultOnly === false ? 'Without Age Restriction' : '18+') +
        (event.date !== undefined ? '; ' + dateToString(event.date) : '') + '; ' +
        'Price: ' + (event.price != undefined ? '$' + event.price : 'FREE') + '; ' +
        (event.archived !== undefined && event.archived === true ? 'Archived' : 'NOT Archived') +
        ' ; Rating: ' + (printEventRating(event));
}

function printEventsList(list) {
    if (list !== undefined) {
        list.forEach(function (element) {
            if (element instanceof Event) {
                console.log(printEvent(element));
            }
        });
    } else {
        eventsList.forEach(function (element) {
            console.log(printEvent(element));
        });
    }
}

function deleteEvent(id) {
    if (typeof id != 'string') {
        console.log('ID must be string.');
        return;
    }
    for (let i = 0; i < eventsList.length; i++) {
        if (id == eventsList[i].id.toString()) {
            eventsList.splice(i, 1);
            console.log('Event with ID "' + id + '" was successfully deleted.');
            return;
        }
    }
    console.log('There is no event with ID: ' + id);
}

function updateEvent(id, name, adultOnly, price, archived) {
    if (id === undefined) {
        console.log('Yout must send ID of event.');
        return;
    }
    if (name == undefined || typeof name !== 'string' || name == '') {
        console.log('Name must be string different from empty one.');
        return;
    }
    if (adultOnly !== undefined && typeof adultOnly !== "boolean") {
        console.log('Age restriction must be boolean type.');
        return;
    }
    if (archived !== undefined && typeof archived !== 'boolean') {
        console.log('Archived must be boolean type.');
        return;
    }

    for (let i = 0; i < eventsList.length; i++) {
        if (id == eventsList[i].id.toString()) {
            var text = 'Event: ' + printEvent(eventsList[i]) + '\n';
            eventsList[i].name = name;
            eventsList[i].adultOnly = adultOnly ? adultOnly : false;
            console.log(text + 'Changed To: ' + printEvent(eventsList[i]));
            return;
        }
    }
    console.log('There is no event with ID: ' + id);
}

function Customer(fullName, sex, age, wallet) {
    this.fullName = fullName;
    this.sex = sex;
    this.age = age;
    this.wallet = wallet !== undefined ? wallet : 0;
    this.vipCounter = 0;
}

function isValidGender(sex) {
    return sex == 'male' || sex == 'female';
}

function addCustomer(fullname, sex, age, wallet) {
    if (age == undefined) {
        console.log('Age can not be undefined.');
        return;
    } else if (!Number.isInteger(age)) {
        console.log('Age must be valid integer.');
        return;
    } else if (!isValidGender(sex)) {
        console.log('Gender should be "male" or "female".');
        return;
    }

    var customer = new Customer(fullname, sex, age, wallet);
    return customer;
}

function addCustomerToEvent(customer, event) {
    if (!canAddCustomers) {
        console.log('The system is closed and you can\'t add customers to the events!');
        return;
    }

    if (customer instanceof Customer == false) {
        console.log('You must send instance of Customer.');
        return;
    }

    if (event.adultOnly === true && customer.age < 18) {
        console.log('The event "' + event.name + '" is for 18+ consumers.');
        return;
    }

    if (isArchivedEvent(event)) {
        console.log('The event "' + printEvent(event) + '" is archived.');
        return;
    }

    if (customer.wallet < event.price && !isVipCustomer(customer)) {
        console.log('The customer has $' + customer.wallet + ' in the wallet and the entrance for "' +
            event.name + '" is $' + event.price);
        return;
    } else if (event.price > 0) {
        customer.vipCounter++;
    }

    var freeTicket = false;
    if (customer.vipCounter == 6 && event.price > 0) {
        customer.vipCounter = 0;
        freeTicket = true;
    } else if (!isVipCustomer(customer)) {
        var eventPrice = event.price !== undefined ? event.price : 0;
        customer.wallet = Math.round((customer.wallet - eventPrice) * 100) / 100;
    }

    event.customers.push(customer);
    console.log('Successfully added customer "' + customer.fullName + '" to the event "' + event.id + ': ' + event.name + '"' + (freeTicket === true ? ' with free ticket for VIP' : ''));
}

function printCustomer(customer) {
    console.log(
        'Name: ' + customer.fullName + '; ' +
        'Sex: ' + customer.sex + '; ' +
        'Age: ' + customer.age + '; ' +
        'Wallet: $' + (customer.wallet !== undefined ? customer.wallet : 0) + '; ' +
        'VIP: ' + (isVipCustomer(customer) == true ? 'YES' : 'NO'));
}

function printCustomers(eventId, sex) {
    var index = getEventById(eventId);
    if (index == undefined) {
        return;
    }

    if (eventsList[index].customers == undefined || eventsList[index].customers.length == 0) {
        console.log('No customers for event with ID "' + eventsList[index].id + '".');
        return;
    }
    console.log('Customers for event with ID "' + eventsList[index].id + '" are:')

    eventsList[index].customers.forEach(function (element) {
        if (sex == undefined || element.sex == sex) {
            console.log(
                'ID: ' + eventsList[index].customers.indexOf(element) + '; ' +
                'Name: ' + element.fullName + '; ' +
                'Sex: ' + element.sex + '; ' +
                'Age: ' + element.age + '; ' +
                'Wallet: $' + element.wallet + '; ' +
                'VIP: ' + (isVipCustomer(element) == true ? 'YES' : 'NO'));
        }
    });
}

function getEventById(id) {
    for (let i = 0; i < eventsList.length; i++) {
        if (id == eventsList[i].id.toString()) {
            return i;
        }
    }
}

function removeCustomerFromEvent(id, customer_id) {
    var eventIndex = getEventById(id);
    if (eventIndex !== undefined) {
        var customerNameForDelete = eventsList[eventIndex].customers[customer_id].fullName;
        var eventName = eventsList[eventIndex].name;
        eventsList[eventIndex].customers.splice(customer_id, 1);
        console.log('Successfully was deleted customer: "' + customerNameForDelete + '", from event: "' + eventName + '"');
    }
}

function printEventByName(name) {
    var list = eventsList.filter(function (element) {
        return element.name == name;
    });
    printEventsList(list);
}

function showEventWithMostCustomers() {
    var mostCustomer = 0;
    var sameNumberOfCustomers = false;

    if (eventsList.length === 0) {
        console.log('The list of events is empty.');
        return;
    }

    for (let i = 0; i < eventsList.length; i++) {
        if (eventsList[i].customers.length > eventsList[mostCustomer].customers.length && i !== 0) {
            sameNumberOfCustomers = false;
            mostCustomer = i;
        } else if (eventsList[i].customers.length == eventsList[mostCustomer].customers.length) {
            sameNumberOfCustomers = true;
        }
    }
    if (sameNumberOfCustomers == true) {
        console.log('There is more than one event with max number of customers!');
        return;
    } else {
        console.log('The Event with most customers is: ' + printEvent(eventsList[mostCustomer]) + ' with ' +
            eventsList[0].customers.length + ' customers for it.');
    }

}

function eventsSuitableForMinors() {
    var eventsForMinorsList = eventsList.filter(function (element) {
        return element.adultOnly == false;
    });
    eventsForMinorsList.forEach(function (element) {
        console.log(printEvent(element));
    });
}

function groupEventsForMinorsAndAdults() {
    var eventsForMinorsList = eventsList.filter(function (element) {
        return element.adultOnly == false;
    });
    console.log('-----------------------FOR MINORS---------------------------------');
    eventsForMinorsList.forEach(function (element) {
        console.log(printEvent(element));
    });

    console.log('-----------------------FOR ADULTS---------------------------------');
    var eventsForAdultsList = eventsList.filter(function (element) {
        return element.adultOnly == true;
    });
    eventsForAdultsList.forEach(function (element) {
        console.log(printEvent(element));
    });
}

function isVipCustomer(customer) {
    return customer.vipCounter == 5;
}

function showEventsByCriteria(criteria) {
    switch (criteria) {
        case 'date':
            console.log('---------------Show upcoming events----------------');
            var list = eventsList.filter(function (item) {
                if (item.date > Date.now()) {
                    console.log(printEvent(item));
                }
            });
            break;
        case 'archived':
            console.log('---------------Show archived events----------------');
            var list = eventsList.filter(function (item) {
                if (item.archived != undefined && item.archived == true) {
                    console.log(printEvent(item));
                }
            });
            break;
        default :
            console.log('---------------Show all events----------------');
            printEventsList();
            break;
    }
}

function archiveEvent(event) {
    event.archived = true;
}

function isArchivedEvent(event) {
    return event.archived != undefined && event.archived == true;
}

function earningsPerEvent(event) {
    var eventForLook;
    if (Number.isInteger(event)) {
        eventForLook = eventsList[event];
    } else if (!(event instanceof Event)) {
        console.log('You must send Event class instance.');
        return;
    } else if (!isArchivedEvent(event)) {
        console.log('You can only look at the revenue only of archived events.');
        return;
    } else {
        eventForLook = event;
    }
    console.log('Event with ID "' + event.id + '" has $' + (price = eventForLook.customers.length * eventForLook.price) + ' earnings.');
}

function getEventRating(event, customer, rating) {
    if (!isArchivedEvent(event)) {
        console.log('The event must be archived.');
        return;
    }

    if (customer === undefined) {
        console.log('Undefined customer.');
        return;
    }

    var isCustomerRegisteredForEvent = false;
    for (let i = 0; i < event.customers.length; i++) {
        if (event.customers[i] == customer) {
            isCustomerRegisteredForEvent = true;
            break;
        }
    }

    if (isCustomerRegisteredForEvent == false) {
        console.log('This consumer is not registered for the event.');
        return;
    }

    if (rating < 1 || rating > 10) {
        console.log('The rating should be between 1 and 10.');
        return;
    }

    event.rating += rating;
    event.ratingCounter++;
    console.log('Customer "' + customer.fullName + '" successfully gave his rating.')
    console.log(printEvent(event));

}

