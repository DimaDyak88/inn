$ ->
  $schedules = $('.b-festival-program__content').find('.b-schedule')
  $('.js-days-list').on 'click', '.days-list__item', (event) ->
    $target = $(event.currentTarget)
    num = $target.index() - 1
    $target.addClass('active').siblings().removeClass 'active'
    $schedules.hide().eq(num).fadeIn(200)
