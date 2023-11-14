/* global data */

const $photoUrl = document.querySelector('#url');
const $image = document.querySelector('.image');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

const $entryForm = document.querySelector('.entry-form');

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const submittedData = {};
  submittedData.title = $entryForm.title.value;
  submittedData.url = $entryForm.url.value;
  submittedData.notes = $entryForm.notes.value;
  submittedData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(submittedData);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
