<!DOCTYPE html>
<html>
  <head>
    <title>Hogan template benchmark</title>
  </head>
  <body>
    <table>
      {% for message in messages %}
        {% include 'message.swig' %}
      {% endfor %}
    </table>
  </body>
</html>
