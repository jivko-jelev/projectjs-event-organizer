/*
Основни задачи
*/

/*
1. Ако на метода createEvent не се подаде име на събитието, той извежда съобщение за грешка
и излиза от него.
createEvents може да получи много аргументи, които да съставляват свойства за създаване на събитие
При създаването на събитие се генерира уникален идентификатор "id"
*/
console.log('---------------create event---------------------------')
createEvent('Download', true);
createEvent('No Sense', false);
console.log('---------------create group of events---------------------------')
createEvents(['Grand opening of new Club', true],
    ['Grand opening of Mohito Club', true],
    ['Grand opening of Beach Bar', false]);

/*
2. Методът printEventList изписва свойствата на събитията, като може да му се подаде и
параметър списък със събития, като тогава ще изведе информацията само за тях
 */
console.log('---------------show list with events---------------------------')
printEventsList();

/*
3. На метода deleteEvent подававам аргумент, текстов низ който да представлява уникалния
идентификатор на събитието.
 */

console.log('---------------delete event from list---------------------------')
deleteEvent(eventsList[1].id);
printEventsList();

/*
4. Ако потребителят не подаде име на събитието се показва съобщение за грешка, а ако не подаде
флаг дали събитието е подходящо за непоплнолетни, то по подразбиране е подходящо
 */
console.log('---------------create event without set age permission flag---------------------------')
createEvent();
createEvent('Morandi Bar');
createEvent('Morandi Bar', true);
console.log('---------------show list with events---------------------------')
printEventsList();


/*
5. Ако при актуализиране на събитие липсва някой от задължителните аргументи като ID и име,
или ако подаденият аргумент не отговаря на типа, от който трябва да е, се извежда
съобщение за грешка
 */

console.log('---------------update event---------------------------')
updateEvent(eventsList[1].id);
updateEvent();
updateEvent(eventsList[1].id, 'Ladies Night', 'asd');
updateEvent(eventsList[1].id, 'Ladies Night', true);


/*
6. Добавям клиент към събитие и ако възрастта не му позволява извеждам съобщение за грешка
 */

console.log('---------------add consumers---------------------------')
var johnDoe = addCustomer('John Doe', 'male', 16);
addCustomerToEvent(johnDoe, eventsList[1])
var johnDoe1 = addCustomer('John Doe', 'male', 22);
addCustomerToEvent(johnDoe1, eventsList[1])
var samuel = addCustomer('Samuel Edisson', 'female', 18);
addCustomerToEvent(samuel, eventsList[1]);

/* 7
. Извеждане на списък с клиентите на едно събитие. Ако не подам параметър 'male'/'female
за пол се показват клиентите и от 2-та пола
 */

console.log('---------------show consumers---------------------------')
printCustomers(eventsList[1].id);

/*
8. Премахване на клиент от дадено събитие като трябва да бъде подаден уникалния идентификатор
на събитието, а за клиента трябва да бъде изпратен индексът му в дадената колекция
*/

console.log('---------------remove consumers---------------------------')
removeCustomerFromEvent(eventsList[1].id, 0);
printCustomers(eventsList[1].id);


/*
Допълнителни задачи част 1
 */


/*
1. Създал съм 2 глобални променливи canAddEvents и canAddCustomers, които при установена стойност
true, позволяват създаването на събития и клиенти, а при false - забраняват
 */

console.log('---------------block events and consumers adding ---------------------------')
canAddEvents = false;
createEvent('Atomic Bar');
canAddEvents = true;
createEvent('Atomic Bar');

canAddCustomers = false;
var adam = addCustomer('Adam Stone', 'male', 18);
addCustomerToEvent(adam, eventsList[1])
canAddCustomers = true;
addCustomerToEvent(adam, eventsList[1])

/*
2. В метода за създаване на събития съм добавил опционален аргумент за дата, като датата трябва
да бъде подадена във формата dd.mm.yyyy. Ако се подаде невалидна дата като 29.02.2019 или 'асдасдса'
се изписва съобщение за грешка. Проверката става с методите isValidDate и daysInMonth.
Датата я запазват като инстанция на обект от класа Date и при изписване на информация за събития
я преобразувам в текстов низ с метода dateToString. Числата отговарящи за деня от месеца и месеца
се изписват с водеща нула.
 */

console.log('---------------add date to event---------------------------')
createEvent('No Sense', false, '1.1.2019');


/*
3. Извеждане на събитието с най-много клиенти, а ако има такива с еднакъв максимален брой
се изписва съобщение
 */

console.log('---------------show event with most consumers---------------------------')
showEventWithMostCustomers();

var janeDoe1 = addCustomer('Jane Doe', 'female', 18);
addCustomerToEvent(janeDoe1, eventsList[2]);
var amanda = addCustomer('Amanda Pat', 'male', 18);
addCustomerToEvent(amanda, eventsList[2]);
showEventWithMostCustomers();

/*
4. Извеждане на събития подходящи за малолетни
 */

console.log('---------------show events for minors---------------------------')
eventsSuitableForMinors();

/*
5. Групиране на събитията по това дали са за пълнолетни или не като се съответно се изпише
знакът * и # пред името
 */

console.log('--------Show list with events grouped by age restrictions-------------');
groupEventsForMinorsAndAdults();


/*
6. Филтриране на събитията по име
 */

console.log('----------------FILTER EVENTS LIST BY NAME--------------------------');
printEventByName(eventsList[0].name);


/*
Допълнителни задачи част 2
 */

/*
1. и 2.
 */

console.log('----------------ADD PRICE TO EVENT--------------------------');
createEvent('No Sense #1', false, '1.12.2019', 5);
printEventsList();

/*
3. Показване на знака $ пред всички платени събития, и ! пред безплатните
 */

console.log('----------------PUT SPECIAL SYMBOLS BEFORE EVENTS--------------------------');
printEventsList();

/*
4. Досега създаваните клиенти нямаха портфейл. Оттук нататък може да се добавят пари в портфейла
им. Ако не се укаже каква сума да има в него се установява стойност по подразбиране равна на 0
 */

console.log('----------------CREATE CUSTOMER WITH WALLET--------------------------');
var alanis = addCustomer('Alanis Gilbourd', 'female', 28, 50);
addCustomerToEvent(alanis, eventsList[2]);

/*
5.
 */

console.log('----------------CREATE CUSTOMER WITH WALLET--------------------------');
var butters = addCustomer('Butters', 'male', 17, 10);
createEvent('Event #1', false, '12.1.2019', 3);
createEvent('Event #2', false, '22.2.2019', 3);
createEvent('Event #3', false, '12.2.2019', 3);
createEvent('Event #4', false, '12.2.2019', 3);
createEvent('Event #5', false, '22.1.2019', 3);
createEvent('Event #6', false, '30.3.2019', 3);
addCustomerToEvent(alanis, eventsList[8]);
addCustomerToEvent(alanis, eventsList[9]);
addCustomerToEvent(alanis, eventsList[10]);
addCustomerToEvent(alanis, eventsList[11]);
addCustomerToEvent(alanis, eventsList[12]);
addCustomerToEvent(alanis, eventsList[13]);
addCustomerToEvent(butters, eventsList[13]);
printCustomer(alanis);


/*
Допълнителни задачи част 3
 */

/*
1. С методът archiveEvent установявам свойство archived на даденото събитие, като архивираните
събития не могат да приемат гости
 */

console.log('----------------EVENT ARCHIVE--------------------------');
archiveEvent(eventsList[13]);
addCustomerToEvent(alanis, eventsList[1]);

/*
2. Изписване на символа ~ пред името на събитието ако то е архивирано
 */

console.log('----------------PRINT EVENTS LIST--------------------------');
printEventsList();


/*
3. Листинг на архивираните събития по определн критерии
 */

console.log('----------------PRINT EVENTS BY CRITERIA--------------------------');
showEventsByCriteria('');
showEventsByCriteria('date');
showEventsByCriteria('archived');


/*
4. Показване на приходите от определено събитие
 */

console.log('----------------SHOW EARNINGS OF EVENT--------------------------');
earningsPerEvent(eventsList[13]);

/*
5. Само клиентите които са записани на дадено събитие, могат да дадат оценка за него.
Ако се подаде оценка за събитие различна от цифрите от 1 до 10 се връща съобщение за грешка.
Ако клиент който не е записан за дадено присъствие гласува се изписва съобщение за грешка.
Ако събитието не е архивано се връща съобщение за грешка. Принципа на изчисляването за това,
когато клиентите гласуват с оценки от 1 до 10 да го сведа до резултат от 0 до 6, го направих
със свеждане на дадения рейтинг до 0-9, изчислявам колко процента от 0 до 9 е дадения вот
и го преубразувам в проценти към оценките от 0 до 6. И отрязвам полученото число до дължина "1.23",
за да не се изписват рейтинги от рода на "4.5345435345".
 */

console.log('----------------RATING EVENTS--------------------------');
var george = addCustomer('George Vins', 'male', 19, 20);
addCustomerToEvent(george, eventsList[1]);
eventsList[1].archived = true;
getEventRating(eventsList[1], alanis, 1);
getEventRating(eventsList[1], george, 10);
printCustomers(eventsList[1].id);

/*
6. Изписване на рейтинга на събитието или дали предстои актуализация
 */

console.log('----------------PRINTS EVENTS--------------------------');
printEventsList();

