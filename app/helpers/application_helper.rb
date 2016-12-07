module ApplicationHelper
  def sidebar_link_to(body, url, html_options = {})
    html_options[:class] = ['item', ('current' if current_page?(url))].join(' ')
    link_to body, url, html_options
  end
end
