module.exports = horse_count

function horse_count(db, date, cb) {
  var level_stream = db.createReadStream({ start: date }),
      count = 0

  level_stream.on('data', inc_count)
  level_stream.on('error', cb.bind(null))
  level_stream.on('end', finish)

  function inc_count() {
    count++
  }
  function finish() {
    cb(null, count)
  }
}
