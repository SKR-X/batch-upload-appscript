function createTimeDrivenTrigger() {
  // Создаем триггер, который будет запускать функцию start() каждые 5 минут
  ScriptApp.newTrigger('start')
           .timeBased()
           .everyMinutes(5)
           .create();
}
