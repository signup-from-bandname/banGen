

function inner(value) {
  return Object.keys(value).map((key) => {
    const className = value[key] ? 'available' : 'taken'
    return `<li class=${className}>${key}</li>`
  }).join('')
}

function render(result) {
  $('#output').html(Object.keys(result).map((key) => {
    return `<li>${key}<ul>${inner(result[key])}</ul></li>`
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

$('form').on('submit', (event) => {
  event.preventDefault()
  $('#output').html('<li>loading...</li>')
  const url = $(event.target).attr('action')
  const bandname = $(event.target).find('[name=bandname]').val()
  $.get(url, {
    bandname,
  }).then(render)
})

// const fixture = JSON.parse('{"domains":{"com":false,"org":false,"net":true,"info":false},"socials":{"facebook":true,"twitter":false,"github":false}}')
// render(fixture)
