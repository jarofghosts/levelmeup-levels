var level = require('level')

module.exports = horse_day

function horse_day(db, date, cb) {
  var tweets = [],
      horse_stream = db.createReadStream({ start: date, end: date + '\xff' })

  horse_stream.on('error', cb)
  horse_stream.on('data', check_tweet)
  horse_stream.on('finish', return_tweets)

  function check_tweet(data) {
    tweets.push(data.value)
  }
  function return_tweets() {
    cb(null, tweets)
  }
}
