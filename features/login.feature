@login
Feature: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero iniciar sesión con mis credenciales
  Para acceder al catálogo de productos

  Background:
    Given el usuario está en la página de inicio de sesión

  @smoke @positive
  Scenario: Inicio de sesión exitoso con usuario estándar
    When el usuario inicia sesión con usuario "standard_user" y contraseña "secret_sauce"
    Then el usuario debería ver la página de productos

  @negative @locked
  Scenario: Usuario bloqueado no puede iniciar sesión
    When el usuario inicia sesión con usuario "locked_out_user" y contraseña "secret_sauce"
    Then el usuario debería ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."

  @negative
  Scenario Outline: Inicio de sesión fallido con credenciales inválidas - <caso>
    When el usuario inicia sesión con usuario "<usuario>" y contraseña "<contrasena>"
    Then el usuario debería ver el mensaje de error "<mensaje>"

    Examples:
      | caso                  | usuario       | contrasena     | mensaje                                                                   |
      | contraseña incorrecta | standard_user | clave_invalida | Epic sadface: Username and password do not match any user in this service |
      | usuario inexistente   | usuario_falso | secret_sauce   | Epic sadface: Username and password do not match any user in this service |
      | usuario vacío         |               | secret_sauce   | Epic sadface: Username is required                                        |
      | contraseña vacía      | standard_user |                | Epic sadface: Password is required                                        |