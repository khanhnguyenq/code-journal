/* global data */

const $photoUrl = document.querySelector('#url');
const $image = document.querySelector('.image');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

const $entryForm = document.querySelector('.form');

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing === null) {
    const submittedData = {};
    submittedData.title = $entryForm.title.value;
    submittedData.url = $entryForm.url.value;
    submittedData.notes = $entryForm.notes.value;
    submittedData.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(submittedData);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryForm.reset();
    const $newData = renderEntry(submittedData);
    $unorderedList.prepend($newData);
  } else {
    const edittedDataObj = {};
    edittedDataObj.entryId = data.editing.entryId;
    edittedDataObj.title = $entryForm.title.value;
    edittedDataObj.url = $entryForm.url.value;
    edittedDataObj.notes = $entryForm.notes.value;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === edittedDataObj.entryId) {
        data.entries[i] = edittedDataObj;
      }
    }
    const $edittedDataDOM = renderEntry(edittedDataObj);
    const $liToReplace = document.querySelector(
      `[data-entry-id="${data.editing.entryId}"]`
    );
    $liToReplace.replaceWith($edittedDataDOM);
    $headingTitle.textContent = 'New Entry';
    data.editing = null;
  }
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  const $newLi = document.createElement('li');
  const $rowDiv = document.createElement('div');
  const $columnHalfDiv = document.createElement('div');
  const $imgElement = document.createElement('img');
  const $secondColumnHalf = document.createElement('div');
  const $titleContainer = document.createElement('div');
  const $titleElement = document.createElement('h3');
  const $pencil = document.createElement('i');
  const $noteElement = document.createElement('p');

  $newLi.setAttribute('data-entry-id', entry.entryId);
  $rowDiv.setAttribute('class', 'row');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $imgElement.setAttribute('class', 'image');
  $imgElement.setAttribute('src', entry.url);
  $imgElement.setAttribute('alt', entry.notes);
  $secondColumnHalf.setAttribute('class', 'column-half');
  $titleContainer.setAttribute('class', 'row space-between');
  $titleElement.textContent = entry.title;
  $titleElement.setAttribute('class', 'inline-block');
  $pencil.setAttribute('class', 'fa fa-pencil margin-top');
  $noteElement.textContent = entry.notes;

  $newLi.appendChild($rowDiv);
  $rowDiv.appendChild($columnHalfDiv);
  $columnHalfDiv.appendChild($imgElement);
  $rowDiv.appendChild($secondColumnHalf);
  $secondColumnHalf.appendChild($titleContainer);
  $titleContainer.appendChild($titleElement);
  $titleContainer.appendChild($pencil);
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

const $noEntryText = document.querySelector('.no-entry');

function toggleNoEntries() {
  if (data.entries.length !== 0) {
    $noEntryText.className = 'no-entry hidden';
  } else {
    $noEntryText.className = 'no-entry';
  }
}

const $entriesView = document.querySelector('[data-view=entries]');
const $entryFormView = document.querySelector('[data-view=entry-form]');

function viewSwap(name) {
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

const $entriesText = document.querySelector('#entries');
const $entryFormButton = document.querySelector('#entry-form');

$entriesText.addEventListener('click', function () {
  viewSwap('entries');
});
$entryFormButton.addEventListener('click', function () {
  viewSwap('entry-form');
});

const $headingTitle = document.querySelector('.heading-title');

$unorderedList.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    const $clickedEntryId = parseInt(
      event.target.closest('li').getAttribute('data-entry-id')
    );
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $clickedEntryId) {
        data.editing = data.entries[i];
      }
    }
    $entryForm.title.value = data.editing.title;
    $entryForm.url.value = data.editing.url;
    $entryForm.notes.value = data.editing.notes;
    $image.setAttribute('src', data.editing.url);
    $headingTitle.textContent = 'Edit Entry';
  }
});
