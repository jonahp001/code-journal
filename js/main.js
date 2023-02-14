var $userPhotoUrl = document.querySelector('#photo-url');
var $placeHolderImg = document.querySelector('#placeholder');

$userPhotoUrl.addEventListener('input', function (event) {
  $placeHolderImg.setAttribute('src', event.target.value);
});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var formValueObject = {};

  formValueObject.titleKey = event.target.elements[0].value;
  formValueObject.photoUrlKey = event.target.elements[1].value;
  formValueObject.notesKey = event.target.elements[2].value;

  formValueObject.entryID = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(formValueObject);

  $placeHolderImg.setAttribute('src', 'images/placeholder-image-square.jpg');

  event.target.reset();
});

function renderEntry(entry) {
  var $newLiElement = document.createElement('li');
  $newLiElement.setAttribute('class', 'row');

  var $entryPhoto = document.createElement('img');
  $entryPhoto.setAttribute('src', entry.photoUrlKey);
  $entryPhoto.setAttribute('class', 'column-half');
  $newLiElement.appendChild($entryPhoto);

  var $entryTextDiv = document.createElement('div');
  $entryTextDiv.setAttribute('class', 'column-half');
  $newLiElement.appendChild($entryTextDiv);

  var $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.titleKey;
  $entryTextDiv.appendChild($entryTitle);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notesKey;
  $entryTextDiv.appendChild($entryNotes);

  return $newLiElement;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $ulElement = document.querySelector('ul');
    $ulElement.appendChild(renderEntry(data.entries[i]));
  }
});
