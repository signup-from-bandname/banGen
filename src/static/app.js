function inner(value) {
  return Object.keys(value).map((key) => {
    const className = value[key] ? 'available' : 'taken'
    return `<li class=${className}>${key}</li>`
  }).join('')
}

function inner2(value) {
  return Object.values(value).map((key) => {
    return `<li>${key}</li>`
  }).join('')
}

function render(result) {
  $('#output').html(Object.keys(result).map((key) => {
    return `<li>${key}<ul>${inner(result[key])}</ul></li>`
  }).join(''))
}

function render2(result) {
  $('#output2').html(Object.keys(result).map((value) => {
    return `<li>${value}<ul>${inner2(result[value])}</ul></li>`
  }).join(''))
}


function getNames() {
  $.get('/v1/name-ideas').then((result) => {
    $('#ideas').html(result.names.map((name) => {
      return `<li>${name}</li>`
    }).join(''))
  })
}
$('#moreIdeas').click(getNames)
getNames()

$('#ideas').on('click', 'li', (event) => {
  // TODO convert to valid hostname(?)
  $('#names input[name=bandname]').val($(event.target).text())
})

$('#check').on('submit', (event) => {
  event.preventDefault()
  $('#output').html('<li>loading...</li>')
  const url = $(event.target).attr('action')
  const bandname = $(event.target).find('[name=bandname]').val()
  $.get(url, {
    bandname,
  }).then(render)
})

$('#names').on('submit', (event) => {
  event.preventDefault()
  $('#output2').html('<li>loading...</li>')
  const url = $(event.target).attr('action')
  const bandname = $(event.target).find('[name=bandname]').val()
  $.get(url, {
    bandname,
  }).then(render2)
})

// const fixture = JSON.parse('{"domains":{"com":false,"org":false,"net":true,"info":false},"socials":{"facebook":true,"twitter":false,"github":false}}')
// render(fixture)
