<!DOCTYPE html>
<html>
  <head>
    <title>SWIG template benchmark</title>
  </head>
  <body>
    <table>
      {% for message in messages %}
        {% include 'message.swig' with message only %}
      {% endfor %}
    </table>
  </body>
</html>
