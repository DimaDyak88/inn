#= require jquery
#= require jquery_ujs
#= require_tree .

$ ->
  state = 'close'
  SIDEBAR_WIDTH = 256

  $('.js-mobile-menu-trigger').on 'click', (event) ->
    $target = $(event.currentTarget)
    if state is 'close'
      $target.addClass('fixed').text('Закрыть')
      $('.b-sidebar').css('left', 0)
      $('.fade-layout').show()
      state = 'open'
    else
      $target.removeClass('fixed').text('Меню')
      $('.b-sidebar').css('left', -SIDEBAR_WIDTH)
      $('.fade-layout').hide()
      state = 'close'
