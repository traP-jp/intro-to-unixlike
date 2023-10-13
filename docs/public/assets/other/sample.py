import datetime

name = input("What is your name? ")
age = int(input("What is your age? "))
current_year = datetime.datetime.now().year
year_of_100 = current_year + (100 - age)

print(f"Hi {name}, you will turn 100 years old in the year {year_of_100}.")
