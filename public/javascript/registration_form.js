$('#language_other').change(function() {
  // if ($('#language_other').checked) {
  if ($('#language_other').is(':checked')) {
    console.log('show');
    $('#other-language-container').show();
  }
  else {
    console.log('hide');
    // TODO remove the value
    $('#other-language-container').hide();
  }
});

$('select[name=affiliation]').change(function () {
    if ($(this).val() == 'other') {
        console.log('show');
        $('#other-affiliation-container').show();
    } else {
        console.log('hide');
        $('#other-affiliation-container').hide();
    }
});

$('select[name=hear_about]').change(function () {
    if ($(this).val() == 'other') {
        $('#other-hear-about-container').show();
    } else {
        $('#other-hear-about-container').hide();
    }
});
