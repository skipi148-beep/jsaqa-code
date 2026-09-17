Feature: Booking movie tickets
  
  Scenario: Happy Path - Successfully book a ticket for tomorrow
    Given пользователь заходит на страницу кинотеатра
    When пользователь выбирает день сеанса номер 2
    And выбирает первый доступный сеанс и свободное место
    Then открывается страница подтверждения с билетом

  Scenario: Happy Path 2 - Successfully book a ticket for another day
    Given пользователь заходит на страницу кинотеатра
    When пользователь выбирает день сеанса номер 3
    And выбирает первый доступный сеанс и свободное место
    Then открывается страница подтверждения с билетом

  Scenario: Sad Path - Cannot book a ticket when seat is already taken
    Given пользователь заходит на страницу кинотеатра
    When пользователь выбирает день сеанса номер 2
    And пытается выбрать занятое кресло
    Then кнопка бронирования остается заблокированной
