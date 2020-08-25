const GUILD_URL = 'https://cors-anywhere.herokuapp.com/http://armory.warmane.com/api/guild/Corre+Que+Eu+Agrei/Lordaeron/summary'
// const GUILD_URL = 'summary.json'
var origin = window.location.protocol + '//' + window.location.host;

function setTextForClass(response, elementId, clazz) {
  const paladinsCount = response.roster.filter(element => element.class == clazz).length;
  document.getElementById(elementId).innerText = paladinsCount
}

function createLinkElement(value) {
  var memberUrl = `http://armory.warmane.com/character/${value}/Lordaeron/summary`

  var a = document.createElement("A")
  var link = document.createTextNode(value)
  a.appendChild(link)
  a.title = value
  a.href = memberUrl;

  return a
}

function createTdLink(value) {
  var td = document.createElement("TD")
  td.appendChild(createLinkElement(value))
  return td
}

function createTd(value) {
  var td = document.createElement("TD")
  td.innerHTML = value
  return td
}

function addOnlineMembers(onlineMembers) {
  onlineMembers.forEach( member => {
    var tr = document.createElement("TR");

    var tdLevel = createTd(member.level)
    tr.appendChild(tdLevel)
    var tdNick = createTdLink(member.name)
    tr.appendChild(tdNick)
    var tdClass = createTd(member.class)
    tr.appendChild(tdClass)
    var tdProf1 = createTd(member.professions.professions[0].name + " (" + member.professions.professions[0].skill + ")")
    tr.appendChild(tdProf1)
    var tdProf2 = createTd(member.professions.professions[1].name + " (" + member.professions.professions[1].skill + ")")
    tr.appendChild(tdProf2)

    document.getElementById("members-table-body").appendChild(tr);
  })
}

fetch(GUILD_URL, { 
  method: 'GET',  
  headers: {
    'origin': origin
  }
})
.then(response => response.json())
.then(response => {
  var leader = createLinkElement(response.leader.name)
  leader.classList.add("h5") 
  document.getElementById('leader-name').append(leader)

  document.getElementById('leader-class').innerText = response.leader.class

  document.getElementById('total-members-count').innerText = response.membercount
  const onlineMembers = response.roster.filter(element => element.online);
  document.getElementById('online-members-count').innerText = onlineMembers.length

  const lvl80sCount = response.roster.filter(element => element.level == "80").length;
  document.getElementById('level-80-count').innerText = lvl80sCount

  setTextForClass(response, 'warriors-count', 'Warrior')
  setTextForClass(response, 'death-knights-count', 'Death Knight')
  setTextForClass(response, 'mages-count', 'Mage')
  setTextForClass(response, 'druids-count', 'Druid')
  setTextForClass(response, 'shamans-count', 'Shaman')
  setTextForClass(response, 'rogues-count', 'Rogue')
  setTextForClass(response, 'hunters-count', 'Hunter')
  setTextForClass(response, 'warlocks-count', 'Warlock')
  setTextForClass(response, 'paladins-count', 'Paladin')

  addOnlineMembers(onlineMembers)
});