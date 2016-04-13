import { MongoClient } from 'mongodb'

class DBService {
  boot (config) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.url + config.dbName, (err, db) => {
        if (err) {
          console.error('Connection failed', err)
          reject(err)
        }
        console.log('DB connection successful')
        this.registerDbConnection(db)
        resolve(db)
      })
    })
  }

  registerDbConnection (db) {
    this.db = db
    this.db.collection('tests').insert({'message': 'message from app'}, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        console.log(res)
      }
    })
  }
}

export default DBService
