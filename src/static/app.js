function innerCheck(value) {
  return Object.keys(value).map((key) => {
    const className = value[key] ? 'available' : 'taken'
    return `<li class=${className}>${key}</li>`
  }).join('')
}

function renderCheck(result) {
  $('#checkOutput').html(Object.keys(result).map((key) => {
    return `<li>${key}<ul>${innerCheck(result[key])}</ul></li>`
  }).join(''))
}

function innerSuggestion(value) {
  return Object.values(value).map((key) => {
    return `<li>${key}</li>`
  }).join('')
}

const checkInput = $('#check input[name=bandname]')

function addSuggestionHandler() {
  $('.suggestionList li').on('click', event => {
    const sibling = $(event.target).parent().find('.active')
    sibling.removeClass('active')
    $(event.target).addClass('active')
    checkInput.val(checkInput.val().replace(sibling.text(), $(event.target).text()))
  })
}

function renderSuggestions(result) {
  const existing = document.querySelector('[name=bandname]').value.split(' ')
  $('#suggestionsOutput').html(Object.keys(result).map((value, idx) => {
    return `<li class="suggestionList"><ul><li class="active">${existing[idx]}</li>${innerSuggestion(result[value])}</ul></li>`
  }).join(''))
  addSuggestionHandler()
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
  $('#check input[name=bandname]').val($(event.target).text())
})

$('#check').on('submit', (event) => {
  event.preventDefault()
  $('#checkOutput').html('<li>loading...</li>')
  const url = $(event.target).attr('action')
  const bandname = $(event.target).find('[name=bandname]').val()
  $.get(url, {
    bandname,
  }).then(renderCheck)
})

$('#names').on('submit', (event) => {
  event.preventDefault()
  $('#suggestionsOutput').html('<li>loading...</li>')
  const url = $(event.target).attr('action')
  const bandname = $(event.target).find('[name=bandname]').val()
  $.get(url, {
    bandname,
  }).then(renderSuggestions)
})

// const fixture = JSON.parse('{"domains":{"com":false,"org":false,"net":true,"info":false},"socials":{"facebook":true,"twitter":false,"github":false}}')
// renderCheck(fixture)
