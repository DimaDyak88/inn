#= require ./contacts-form

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
      $target.height($target.get(0).scrollHeight)
