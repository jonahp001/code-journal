/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var jsonData = JSON.stringify(data);
  this.localStorage.setItem('jsonData', jsonData);
});

if (localStorage.getItem('jsonData') === JSON.stringify(data)) {
  data = JSON.parse(JSON.stringify(data));
}
