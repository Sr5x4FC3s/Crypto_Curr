const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017`;

const insertData = (data) => {
  MongoClient.connect(url, async (err, client) => {
    if (err) throw err;
    db = client.db('prices');
    
    for (let date in data) {
      let entry = {
        date: date,
        value: data[date]
      };
      db.collection("prices").insert(entry, function(err, res) {
        if (err) throw err;
      });
    }

    await client.close();
    console.log(`this insert function has been invoked`);
  });
}

const searchData = (query) => {
  if (typeof query !== 'object') {
    console.log(`there was an error`);
  } else {
    MongoClient.connection(url, async (err, client) => {
      if (err) throw err;
      db = client.db('prices');

      db.collection('prices').find(query, (err, res) => {
        if (err) throw err;
        let data = res;

        //needs callback or promise to return a value to the place it's invoked so it can be sent back to client when searched.
      });
    });
  }
}

module.exports.insertData = insertData;