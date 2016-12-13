class App.ContactsForm
  el: null
  isValidForm: false
  targetInputs: 'input, textarea'
  emailValidatePattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor: (el) ->
    @$el = $(el)
    @$requiredFields = @$el.find('input.required, textarea.required')
    @$emailField = @$el.find('.js-email')
    @bindEvents()


  bindEvents: =>
    @$el.on 'focus', '.input',  @onFocus
    @$el.on 'blur', '.input', @onBlur
    @$el.on 'keyup', @targetInputs, @onKeyUp


  onKeyUp: (event) =>
    emptyRequiredFields = _.reject @$requiredFields, (el, i) -> $(el).val() != ''
    @isValidForm = _.isEmpty(emptyRequiredFields) && @validateEmail(@$emailField.val())
    @validateForm()

  validateForm: ->
    if @isValidForm
      @$el.addClass 'valid'
    else
      @$el.removeClass 'valid'

  validateEmail: (value) -> @emailValidatePattern.test(value)
  onFocus: (event) -> $(event.currentTarget).addClass('selected')

  onBlur: (event) ->
    $target = $(event.currentTarget)
    inputValue = $target.find('input, textarea').val()
    $target.removeClass('selected') if inputValue is ''


$ ->
  new App.ContactsForm('.js-contacts-form')
