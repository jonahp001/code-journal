var $userPhotoUrl = document.querySelector('#photo-url');
var $placeHolderImg = document.querySelector('#placeholder');

$userPhotoUrl.addEventListener('input', function (event) {
  $placeHolderImg.setAttribute('src', event.target.value);
});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var formValueObject = {};

  var titleKey = event.target.elements[0];
  var photoUrlKey = event.target.elements[1];
  var notesKey = event.target.elements[2];

  formValueObject.titleKey = titleKey.value;
  formValueObject.photoUrlKey = photoUrlKey.value;
  formValueObject.notesKey = notesKey.value;

  formValueObject.entryID = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(formValueObject);

  $placeHolderImg.setAttribute('src', 'images/placeholder-image-square.jpg');

  event.target.reset();
});
