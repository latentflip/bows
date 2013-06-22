nColors = (n) ->
  i = 360 / (n)
  r = []
  
  r.push(i*x) for x in [0..n]
  r

colors = []
id = 0

numKeys = 0
prefixes = {}
window.prefixes = prefixes

updateArrays = ->
  colors = nColors(numKeys)
  lengths = Object.keys(prefixes).map( (p) -> p.length ).max()
  maxLength = Array.prototype.max.apply(lengths)
  updateArray(key, maxLength) for key,array of prefixes

updateArray = (fullkey, padlength) ->
  [key,id] = fullkey.split('-')
  
  #pad message
  msg = "%c#{key}"
  msg += Array(padlength + 2 - msg.length).join(' ') + '|'

  prefixes[fullkey][0] = msg
  prefixes[fullkey][1] = "color: hsl(#{colors[id]},50%,50%); font-weight: bold"

module.exports = (str) ->
  numKeys += 1
  fullkey = "#{str}-#{id}"
  prefixes[fullkey] = ['','']
  updateArrays()
  id++
  return prefixes[fullkey]
