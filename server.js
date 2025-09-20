#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  lcd.clear();
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);
  delay(1000);
  lcd.setCursor(0, 0);
  lcd.print("GREENDREAM");
  lcd.setCursor(0, 1);
  lcd.print("SYSTEM IS ON ");
  delay(3000);
  lcd.clear();
} 

void loop() { 
  int value = analogRead(A0);
  
  // Send raw sensor value to computer (for server to process)
  Serial.println(value);

  // Optional: Control pump (you can remove this if not needed)
  digitalWrite(2, value > 950 ? LOW : HIGH);
  
  // Display on LCD
  lcd.setCursor(0, 0);
  lcd.print("Water Pump: ");
  lcd.print(value > 950 ? "ON " : "OFF");

  int moisturePercentage = map(value, 1020, 0, 0, 100);

  lcd.setCursor(0, 1);
  lcd.print("Moisture : ");
  lcd.print(moisturePercentage);
  lcd.print("% ");
  
  delay(1000); // Send data every second
}
