/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

const previousDataJSON = localStorage.getItem('data-object');

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-object', dataJSON);
});

if (localStorage.getItem('data-object') !== null) {
  data = JSON.parse(previousDataJSON);
}
