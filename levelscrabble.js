var level = require('level')

exports.init = init
exports.query = query

function init(db, words, ready) {
  var to_insert = {},
      word,
      key

  for (var i = 0, l = words.length; i < l; ++i) {
    word = words[i].toUpperCase()
    db.put(word.length + word, word)
  }
  ready()
}

function query(db, word, cb) {
  var len = word.length,
      asterisk = word.indexOf('*'),
      key = asterisk > -1 ? word.slice(0, asterisk) : word,
      end_key = asterisk > -1 ? key.replace(/[a-zA-Z]$/, function (letter) {
        return String.fromCharCode(letter.charCodeAt(0) + 1)
      }) : key,
      results = [],
      dbs

  dbs = db.createReadStream({ start: len + key, end: len + end_key })
  dbs.on('data', check_word)
  dbs.on('error', cb)
  dbs.on('finish', return_results)

  function check_word(data) {
    var db_word = data.value
    if (!asterisk) return results.push(db_word)
    for (var i = 0, l = db_word.length; i < l; ++i) {
      if (word[i] !== '*' && db_word[i] !== word[i]) return
    }
    results.push(db_word)
  }

  function return_results() {
    cb(null, results)
  }
}
