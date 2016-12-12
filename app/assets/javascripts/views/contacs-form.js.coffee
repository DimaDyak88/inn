class App.ContactsForm
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
    inputValue = $target.find('input, textarea').val()
    $target.removeClass('selected') if inputValue is ''





class App.SendWorkForm extends App.ContactsForm
  baseTextareaHeight: null
  constructor: (el) ->
    super(el)
    @baseTextareaHeight = $('textarea').height()

  bindEvents: ->
    super()
    @$el.on 'keyup', 'textarea', (event) => # по возможности сделать что бы не было лишнего отступа снизу
      $target = $(event.currentTarget)
      if $target.val() == ''
        $target.height(@baseTextareaHeight)
        return
      $target.height('auto')
      $target.height($target.get(0).scrollHeight);


$ ->
  new App.ContactsForm('.js-contacts-form')
