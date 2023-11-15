/* global data */

const $photoUrl = document.querySelector('#url');
const $image = document.querySelector('.image');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

const $entryForm = document.querySelector('.form');

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

  const newData = renderEntry(submittedData);
  $unorderedList.prepend(newData);
  toggleNoEntries();
  viewSwap('entries');
});

function renderEntry(entry) {
  const $newLi = document.createElement('li');
  const $rowDiv = document.createElement('div');
  const $columnHalfDiv = document.createElement('div');
  const $imgElement = document.createElement('img');
  const $secondColumnHalf = document.createElement('div');
  const $titleElement = document.createElement('h3');
  const $noteElement = document.createElement('p');

  $rowDiv.setAttribute('class', 'row');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $imgElement.setAttribute('class', 'image');
  $imgElement.setAttribute('src', entry.url);
  $secondColumnHalf.setAttribute('class', 'column-half');
  $titleElement.textContent = entry.title;
  $noteElement.textContent = entry.notes;

  $newLi.appendChild($rowDiv);
  $rowDiv.appendChild($columnHalfDiv);
  $columnHalfDiv.appendChild($imgElement);

  $rowDiv.appendChild($secondColumnHalf);
  $secondColumnHalf.appendChild($titleElement);
  $secondColumnHalf.appendChild($noteElement);

  return $newLi;
}

const $unorderedList = document.querySelector('.no-bullets');

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $unorderedList.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries() {
  const $noEntryText = document.querySelector('.no-entry');
  if (data.entries.length !== 0) {
    $noEntryText.className = 'no-entry hidden';
  } else {
    $noEntryText.className = 'no-entry';
  }
}

function viewSwap(name) {
  const $entriesView = document.querySelector('[data-view=entries]');
  const $entryFormView = document.querySelector('[data-view=entry-form]');
  if (name !== 'entries' && name !== 'entry-form') {
    name = name.target.getAttribute('id');
  }
  if (name === 'entries') {
    $entryFormView.className = 'hidden';
    $entriesView.className = 'row';
    data.view = name;
  } else if (name === 'entry-form') {
    $entriesView.className = 'row hidden';
    $entryFormView.className = '';
    data.view = name;
  }
}

const $mainContainer = document.querySelector('.main');

$mainContainer.addEventListener('click', viewSwap);
