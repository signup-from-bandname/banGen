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

function renderSuggestions(result) {
  let i=0
  $('#suggestionsOutput').html(Object.keys(result).map((value) => {
    i++
    return `<li num=${i} class="suggestionList"><ul>${innerSuggestion(result[value])}</ul></li>`
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
  let j = 0
  $('#originalInput').html($(event.target).text().split(' ').map((name) => {
    j++
    return `<li><ul data-current="${name}"><li num="${j}">${name}</li></ul></li>`
  }).join(''))
})

let filters = [];
let saveObject;
let checkInput = $('#check input[name=bandname]');
console.log($(["data-current"]))
$("body").on('click', 'li', (event) => {
  let newFilter = $(event.target).parent().parent().find('.active')
  let getActives = []
  newFilter.removeClass("active")
  $(event.target).addClass("active");


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
