var level = require('level'),
    db = level(process.argv[2]),
    ts = require('stream').Transform({ objectMode: true })

ts._transform = function (data, enc, next) {
  this.push(data.key + '=' + data.value + '\n')
  next()
}

db.createReadStream().pipe(ts).pipe(process.stdout)
