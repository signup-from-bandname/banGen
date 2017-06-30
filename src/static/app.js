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

function addSuggestionHandler() {
  const check = $('#check input[name=bandname]')
  $('.suggestionList li').on('click', event => {
    const sibling = $(event.target).parent().find('.active')
    sibling.removeClass('active')
    $(event.target).addClass('active')
    check.val(check.val().replace(sibling.text(), $(event.target).text()))
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

function renderLogo(result) {
  const out = document.querySelector('#logo')
  if (out.childElementCount > 0) {
    out.removeChild(out.childNodes[0])
  }
  const elem = document.createElement('img')
  elem.setAttribute('alt', 'Logo')
  elem.setAttribute('src', result.src)
  out.appendChild(elem)
}

function createLogo() {
  const imageGenUrl = 'http://flamingtext.com/net-fu/image_output.cgi'
  const text = document.querySelector('#check input[name=bandname]').value
  const fonts = [
    'Aegis',
    'Aladdin',
    'Antikythera',
    'Bizarre',
    'Blood Crow',
    'Bloodlust',
    'Colossus',
    'Cro-Magnum',
    'Cry Uncial',
    'Cyrus the Virus',
    'Dark Garden',
    'Diablo Heavy',
    'Dragon Order',
    'GoodCityModern',
    'Holy Empire',
    'Judge Hard',
    'Mael',
    'Metal Lord',
    'Monsterama',
    'Odinson',
    'Riot Act',
    'Squealer Embossed',
    'Timberwolf',
    'War Priest',
    'Wetworks',
    'Wolf\'s Bane',
  ]

  const fontname = fonts[Math.floor(Math.random() * (fonts.length))]
  $.get(imageGenUrl, {
    _comBuyRedirect: 'false',
    script: 'heavy-metal-logo',
    text,
    symbol_tagname: 'popular',
    fontsize: '85',
    fontname,
    fontname_tagname: 'cool',
    textBorder: '15',
    growSize: '0',
    antialias: 'on',
    hinting: 'on',
    justify: '2',
    letterSpacing: '0',
    lineSpacing: '0',
    textSlant: '0',
    textVerticalSlant: '0',
    textAngle: '0',
    textOutline: 'off',
    textOutlineSize: '2',
    textGradient: 'Default',
    textGradient_tagname: 'standard',
    useClouds: 'off',
    cloudColor: '#0B1F21',
    bevelDepth: '15',
    rainSize: '15',
    rainAngle: '130',
    satinOpacity: '50',
    opacity1: '100',
    opacity2: '30',
    shadowType: '3',
    shadowXOffset: '4',
    shadowYOffset: '4',
    shadowBlur: '8',
    shadowColor: '#000000',
    shadowOpacity: '80',
    reflectOpacity: '50',
    reflectTiltX: '0',
    reflectPercent: '66',
    reflectScaleYPercent: '100',
    reflectXOffset: '0',
    reflectYOffset: '0',
    shadowGlowColor: '#FFFFFF',
    shadowGlowSize: '4',
    shadowGlowFeather: '5',
    shadowNormalColor: '#3C3C3C',
    shadowNormalFeather: '2',
    shadowNormalOpacity: '50',
    shadowNormalTiltX: '40',
    shadowNormalScaleYPercent: '65',
    shadowNormalXOffset: '0',
    shadowNormalYOffset: '0',
    shadowSelfXOffset: '10',
    shadowSelfYOffset: '10',
    shadowSelfBlur: '0',
    shadowSelfOpacity: '50',
    backgroundResizeToLayers: 'on',
    backgroundRadio: '1',
    backgroundColor: '#000000',
    backgroundPattern: 'Wood',
    backgroundPattern_tagname: 'standard',
    backgroundGradient: 'Full saturation spectrum CCW',
    backgroundGradient_tagname: 'standard',
    backgroundStarburstColorAlt: '#ED2400',
    backgroundStarburstColor1: '#BD2409',
    backgroundStarburstNum: '25',
    backgroundStarburstRayPercentage: '50',
    backgroundStarburstUseColor2: 'on',
    backgroundStarburstColor2: '#000000',
    backgroundStarburstOffsetAngle: '0',
    backgroundStarburstXOffset: '0',
    backgroundStarburstYOffset: '0',
    backgroundStarburstCenterPercentage: '2',
    backgroundStarburstRadiusX: '300',
    backgroundStarburstRadiusY: '300',
    backgroundUseOverlay: 'off',
    backgroundOverlayMode: '5',
    backgroundOverlayPattern: 'Parque #1',
    backgroundOverlayPattern_tagname: 'standard',
    backgroundOverlayOpacity: '100',
    backgroundImageUrl: 'http%3A%2F%2Fwww.flamingtext.com%2Fimages%2Ftextures%2Ftexture3.jpg',
    useFixedSize: 'off',
    imageWidth: '400',
    imageHeight: '150',
    imageAlignment: '4',
    autocrop: 'off',
    autocropPadding: '0',
    watermark: 'none',
    ext: 'png',
    jpgQuality: '85',
    doScale: 'off',
    scaleWidth: '240',
    scaleHeight: '120',
    _: '1498808280322',
  }).then(renderLogo)
}

$('#ideas').on('click', 'li', (event) => {
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
  createLogo()
})

$('#logocreator').on('click', createLogo)

$('#names').on('submit', (event) => {
  event.preventDefault()
  const out = $('#suggestionsOutput')
  out.html('<li>loading...</li>')
  const url = $(event.target).attr('action')
  const bandname = $(event.target).find('[name=bandname]').val()
  $.get(url, {
    bandname,
  }).then(renderSuggestions)
  .fail(e => {
    out.html('<li>Something went wrong, sorry...</li>')
    console.error(e) // eslint-disable-line no-console
  })
})

// const fixture = JSON.parse('{"domains":{"com":false,"org":false,"net":true,"info":false},"socials":{"facebook":true,"twitter":false,"github":false}}')
// renderCheck(fixture)
