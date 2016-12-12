#= require jquery
#= require jquery_ujs
#= require jquery.onepage-scroll
#= require map
#= require map_init
#= require places_data
#= require_tree ./views


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



  if $('.b-success-story').length > 0
    $(".main").onepage_scroll({
      loop: false,
      sectionContainer: '.b-success-story__person',
      animationTime: 650,
      keyboard: false
    });


#  if $('#map-holder').length
#    window.drawMarkers(placesData) # placesData from require places_data


  if $('#map').length
    window.draw(placesData, 'map');
