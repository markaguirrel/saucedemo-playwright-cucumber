@purchase
Feature: Compra de productos en Sauce Demo
  Como cliente de Sauce Demo
  Quiero agregar productos al carrito y completar una compra
  Para poder adquirir los productos que necesito

  Background:
    Given el usuario ha iniciado sesión como "standard_user"

  @smoke
  Scenario: Agregar un producto al carrito desde la página de productos
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Then el contador del carrito debería mostrar "1"

  @cart
  Scenario: Visualizar los productos agregados en el carrito
    When el usuario agrega los siguientes productos al carrito:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    And el usuario accede al carrito de compras
    Then el usuario debería ver los siguientes productos en el carrito:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |

  @smoke @e2e
  Scenario: Completar el proceso de compra hasta la confirmación
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    And el usuario accede al carrito de compras
    And el usuario procede al checkout
    And el usuario ingresa sus datos de envío con nombre "Mark", apellido "Aguirre" y código postal "13013"
    And el usuario finaliza la compra
    Then el usuario debería ver el mensaje de confirmación "Thank you for your order!"