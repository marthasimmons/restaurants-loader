const { TestScheduler } = require('jest')
const load = require('./loader')
const restaurants = require('./restaurants.json')
const menus = require('./menus.json')
const items = require('./items.json')
const tables = require('./tables.json')
const bookings = require('./bookings.json')

describe('Can seed database', () => {

    test('Restraunts are loaded into database', (done) => {

        const callback = (db) => {
            db.all('SELECT * FROM restaurants;', function (err, rows) {
                expect(rows.length).toBe(8)
                done()
            })
        }

        load("restaurants", restaurants, callback)
    })

    test('Menus are loaded into database', (done) => {

        const callback = (db) => {
            db.all('SELECT * FROM menus;', function (err, rows) {
                expect(rows.length).toBe(26)
                done()
            })
        }

        load("menus", menus, callback)
    })

    test('Items are loaded into database', (done) => {

        const callback = (db) => {
            db.all('SELECT * FROM items;', function (err, rows) {
                expect(rows.length).toBe(64)
                done()
            })
        }

        load("items", items, callback)
    })

    test('Tables are loaded into database', (done) => {

        const callback = (db) => {
            db.all('SELECT * FROM tables;', function (err, rows) {
                expect(rows.length).toBe(16)
                done()
            })
        }

        load("tables", tables, callback)
    })

    test('Bookings are loaded into database', (done) => {

        const callback = (db) => {
            db.all('SELECT * FROM bookings;', function (err, rows) {
                expect(rows.length).toBe(5)
                done()
            })
        }

        load("bookings", bookings, callback)
    })

})