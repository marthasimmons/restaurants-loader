const {Database} = require('sqlite3')
const db = new Database(':memory:')

const load = (tableName,data,callback) => {
    const datum = data[0]
    const fields = Object.keys(datum)
    const fieldDefinitions = []

    fields.forEach(field => {
        var type = ""
        if (field === "id") {
            type = ' INTEGER PRIMARY KEY'
        }
        else if (typeof(field) === 'integer') {
            type = ' INTEGER'
        }
        else if (typeof(field) === 'string') {
            type = ' TEXT'
        }
        else if (typeof(field) === 'float') {
            type = ' FLOAT'
        }
        
        fieldDefinitions.push(field + type)
    })

    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${fieldDefinitions.join(',')});`, function (err) {
        if (err) throw new Error(err)
        insert(tableName,data,callback)
    })

}

const insert = (tableName,data,callback) => {
    if (data.length === 0) return callback(db)

    const datum = data.pop()
    const fields = Object.keys(datum)
    const questions = fields.map(x => "?")
        

    db.run(`INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${questions.join(',')});`,Object.values(datum), function (err) {
        if (err) throw new Error(err)
        insert(tableName,data,callback)
    })
}

module.exports = load 