const fs = require('fs')
const path = require('path')
const faker = require('faker')

//;email;cardNumber;Address
const address = `${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.secondaryAddress()}`
const fullName = faker.name.findName()
const email = faker.internet.email()
const creditCard = faker.finance.creditCardNumber()
const date = faker.date.past()
const filePath = path.join(__dirname, '..', '..', 'data', 'data-source.csv')
const rowData = `${fullName};${address};${email};${creditCard};${date}\r\n`

fs.truncateSync(filePath, 0)
for (let i = 0; i < 100000; i++) {
  fs.appendFileSync(filePath, rowData)
}
