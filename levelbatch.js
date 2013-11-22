var level = require('level'),
    fs = require('fs'),
    db = level(process.argv[2]),
    ws = require('stream').Writable(),
    filename = process.argv[3],
    ready = false,
    data = []

fs.createReadStream(filename).pipe(ws)
db.on('ready', set_ready)

ws._write = function (chunk, enc, next) {
  data.push(chunk)
  next()
}

ws.on('finish', do_batch)

function do_batch() {
  if (!ready) return setTimeout(do_batch, 10)
  var statements = data.join('').toString().split('\n'),
      batch = db.batch(),
      bits

  for (var i = 0, l = statements.length; i < l; ++i) {
    bits = statements[i].split(',')
    batch[bits[0]].apply(batch, bits.slice(1))
  }
  batch.write()
}

function set_ready() {
  ready = true
}
