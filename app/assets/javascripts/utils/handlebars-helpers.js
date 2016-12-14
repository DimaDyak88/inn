Handlebars.registerHelper('wrappedLink', function(url) {
  var url = Handlebars.escapeExpression(url),
    text = Handlebars.escapeExpression(url);

  return new Handlebars.SafeString(
    "<div class='link'><a href='" + url + "'>"+ text + "</a></div>"
  );
});

Handlebars.registerHelper('image', function(url) {
  var pic_url = Handlebars.escapeExpression(url);

  return new Handlebars.SafeString(
    "<img src='" + pic_url + "' />"
  );
});