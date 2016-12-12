#= require jquery
#= require jquery_ujs
#= require jquery.onepage-scroll
#= require map
#= require map_init
#= require places_data
#= require_self
#= require_tree ./views


window.App = {}

$ ->
  state = 'close'
  SIDEBAR_WIDTH = 256

  $('.js-mobile-menu-trigger').on 'click', (event) ->
    $target = $(event.currentTarget)
    if state is 'close'
      $target.addClass('fixed').text('Закрыть')
      $('.b-sidebar').css('left', 0)
      $('.l-popup-layout').show()
      state = 'open'
    else
      $target.removeClass('fixed').text('Меню')
      $('.b-sidebar').css('left', -SIDEBAR_WIDTH)
      $('.l-popup-layout').hide()
      state = 'close'



  if $('.b-success-story').length > 0
    $(".main").onepage_scroll({
      loop: false,
      sectionContainer: '.b-success-story__person',
      animationTime: 650,
      keyboard: false
    });



  $('.js-link-to-popup').on 'click', (event) ->
    event.preventDefault();
    $target = $(event.currentTarget)
    url = $target.data('url')
    $popupLayout = $('.l-popup-layout')
    $('body').css({'overflowY': 'hidden'})
    $popup = $popupLayout.find('.b-popup')
    $popupLayout.show()
    $.get url, (data) ->
      $popup.html(data)
      new App.SendWorkForm('.js-contacts-form')

  $('body').on 'click', '.js-close', ->
    $('.l-popup-layout').hide()
    $('body').css({'overflowY': 'auto'})

  if $('#map').length
    window.draw(placesData, 'map');



  $schedules = $('.b-festival-program__content').find('.b-schedule')
  $('.js-days-list').on 'click', '.days-list__item', (event) ->
    $target = $(event.currentTarget)
    num = $target.index() - 1
    $target.addClass('active').siblings().removeClass 'active'
    $schedules.hide().eq(num).fadeIn(200)


