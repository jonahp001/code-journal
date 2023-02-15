var $userPhotoUrl = document.querySelector('#photo-url');
var $placeHolderImg = document.querySelector('#placeholder');
var $form = document.querySelector('form');
var $ulElement = document.querySelector('ul');

$userPhotoUrl.addEventListener('input', function (event) {
  $placeHolderImg.setAttribute('src', event.target.value);
  if ($placeHolderImg.getAttribute('src') === '') {
    $placeHolderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

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

  var $newDomTreeEntry = renderEntry(formValueObject);
  $ulElement.prepend($newDomTreeEntry);

  viewSwap('entries');

  if (data.entries.length === 1) {
    toggleNoEntries();
  }
});

function renderEntry(entry) {
  var $newLiElement = document.createElement('li');
  $newLiElement.setAttribute('class', 'row');
  $newLiElement.setAttribute('data-entry-id', entry.entryID);

  var $entryPhoto = document.createElement('img');
  $entryPhoto.setAttribute('src', entry.photoUrlKey);
  $entryPhoto.setAttribute('class', 'column-half');
  $newLiElement.appendChild($entryPhoto);

  var $entryTextDiv = document.createElement('div');
  $entryTextDiv.setAttribute('class', 'column-half');
  $newLiElement.appendChild($entryTextDiv);

  var $editRowDiv = document.createElement('div');
  $editRowDiv.setAttribute('class', 'edit-row');
  $entryTextDiv.appendChild($editRowDiv);

  var $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.titleKey;
  $editRowDiv.appendChild($entryTitle);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fa-solid fa-pen');
  $editRowDiv.appendChild($editIcon);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notesKey;
  $entryTextDiv.appendChild($entryNotes);

  return $newLiElement;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ulElement.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data['data.view']);

  if (data.entries.length > 0) {
    toggleNoEntries();
  }
});

function toggleNoEntries() {
  var $noEntryText = document.querySelector('#no-entry-text');
  if ($noEntryText.classList.contains('hidden')) {
    $noEntryText.classList.remove('hidden');
  } else {
    $noEntryText.classList.add('hidden');
  }
}

function viewSwap(view) {
  var $dataViewEntryForm = document.querySelector('[data-view=entry-form]');
  var $dataViewEntries = document.querySelector('[data-view=entries]');
  if (view === 'entry-form') {
    $dataViewEntryForm.setAttribute('class', '');
    $dataViewEntries.setAttribute('class', 'hidden');
    data['data.view'] = view;
  } else if (view === 'entries') {
    $dataViewEntries.setAttribute('class', '');
    $dataViewEntryForm.setAttribute('class', 'hidden');
    data['data.view'] = view;
  }
}

var $entriesAnchor = document.querySelector('#entries-link');
$entriesAnchor.addEventListener('click', function (event) {
  if (event.target.getAttribute('href')) {
    viewSwap('entries');
  }
});

var $newEntryAnchor = document.querySelector('#new-entry-link');
$newEntryAnchor.addEventListener('click', function (event) {
  if (event.target.getAttribute('href')) {
    viewSwap('entry-form');
  }
});

$ulElement.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];

        $placeHolderImg.setAttribute('src', data.editing.photoUrlKey);
        $userPhotoUrl.value = data.editing.photoUrlKey;

        var $titleBox = document.querySelector('#title-box');
        $titleBox.value = data.editing.titleKey;

        var $notesBox = document.querySelector('#notes-box');
        $notesBox.value = data.editing.notesKey;

        var $editH2 = document.querySelector('h2');
        $editH2.value = 'Edit Entry';
      }
    }
  }
});
