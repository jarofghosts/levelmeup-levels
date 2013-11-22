var x = process.argv[2],
    y = process.argv[3]

return all_your(x, y)

function all_your(x, y) {
  if (!(x || y)) return console.log('')
  console.log(['ALL YOUR', x, 'ARE BELONG TO', y].join(' '))
}
