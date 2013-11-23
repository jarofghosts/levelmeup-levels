var level = require('level'),
    stuff = require(process.argv[3]),
    db = level(process.argv[2], { valueEncoding: 'json' }),
    ws = db.createWriteStream({ type: 'put' })

for (var i = 0, l = stuff.length; i < l; ++i) {
  var obj = stuff[i]
  var key = obj.type == 'user' ? obj.name : obj.user + '!' + obj.name,
      value = obj

  ws.write({ key: key, value: value })
}
