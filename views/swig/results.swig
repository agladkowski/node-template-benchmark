<!DOCTYPE html>
<html>
  <head>
    <title>Hogan template benchmark</title>
  </head>
  <body>
    <p><b>Number of messages to render:</b> {{ numberOfMessages }}</p>
    <p><b>Total rendering time:</b> {{ renderingTime }}</p>
    <p><b>See rendered page:</b> <a href="/hogan/template?messageCount={{ numberOfMessages }}">View</a></p>
  </body>
</html>
