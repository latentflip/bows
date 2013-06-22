logger = require('andlog')

nColors = (n) ->
  i = 360 / (n)
  r = []
  
  r.push(i*x) for x in [0..n]
  r

colors = []
id = 0

numKeys = 0
prefixes = {}

updateArrays = ->
  colors = nColors(numKeys)
  lengths = Object.keys(prefixes).map( (p) -> p.length )
  maxLength = Math.max.apply({}, lengths)
  updateArray(key, maxLength) for key,array of prefixes

updateArray = (fullkey, padlength) ->
  [key,id] = fullkey.split('-')
  
  #pad message
  msg = "%c#{key}"
  msg += Array(padlength + 2 - msg.length).join(' ') + '|'

  prefixes[fullkey][0] = msg
  prefixes[fullkey][1] = "color: hsl(#{colors[id]},50%,50%); font-weight: bold"

bows = (str) ->
  numKeys += 1
  fullkey = "#{str}-#{id}"
  prefixes[fullkey] = ['','']
  updateArrays()
  id++

  log = logger.log.apply.bind(logger.log, logger)
  log.wrap = (args...) ->
      if bows.color
        prefixes[fullkey].concat(args)
      else
        args

  log.w = log.wrap
  return log

bows.color = true
bows.log = logger.log.apply.bind(logger.log, logger)

if typeof module != 'undefined'
  module.exports = bows
else
  window.bows = bows

