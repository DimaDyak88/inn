class ContactsForm
  el: null
  $el: null
  emailValidatePattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor: (el) ->
    @$el = $(el)
    @$nameField = @$el.find('.js-contacts-form__name')
    @$emailField = @$el.find('.js-contacts-form__email')
    @bindEvents()


  bindEvents: =>
    @$el.on 'focus', '.input',  @onFocus
    @$el.on 'blur', '.input', @onBlur
    @$el.on 'keyup', '.input input', @checkValidForm


  checkValidForm: =>
    if @$nameField.val() != '' && @validateEmail(@$emailField.val())
      @$el.addClass 'valid'
    else
      @$el.removeClass 'valid'


  validateEmail: (value) -> @emailValidatePattern.test(value)

  onFocus: (event) ->
    $(event.currentTarget).addClass('selected')

  onBlur: (event) ->
    $target = $(event.currentTarget)
    inputValue = $target.find('input').val()
    $target.removeClass('selected') if inputValue is ''


$ ->
  new ContactsForm('.js-contacts-form')
