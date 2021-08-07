import random as rd
from datetime import date
from collections import namedtuple

CNP = namedtuple("CNP", 'cnp')
months = {'01': ['January', 31], '02': ['February', 28], "03": ['March', 31], '04': ['April', 30],
          '05': ['May', 31],
          '07': ['July', 30], '08': ['August', 31], '09': ['September', 30], '10': ['October', 31],
          '06': ['June', 30], '11': ['November', 30], '12': ['December', 31]}
regions = {'01': 'Alba', '02': 'Arad', '03': 'Arges', '04': 'Bacau', '05': 'Bihor', '06': 'Bistrita-Nasaud',
           '07': 'Botosani', '08': 'Brasov',
           '09': 'Braila', '10': 'Buzau', '11': 'Caras-Severin', '12': 'Cluj', '13': 'Constanta', '14': 'Covasna',
           '16': 'Dolj', '17': 'Galati', '18': 'Gorj', '19': 'Harghita', '20': 'Hunedoara', '21': 'Ialomita',
           '22': 'Iasi', '15': 'Dambovita', '29': 'Prahova', '36': 'Tulcea', '42': 'Bucuresti S.2',
           '23': 'Ilfov', '24': 'Maramures', '25': 'Mehedinti', '26': 'Mures', '27': 'Neamt', '28': 'Olt',
           '30': 'Satu Mare', '31': 'Salaj', '32': 'Sibiu', '33': 'Suceava', '34': 'Teleorman', '35': 'Timis',
           '37': 'Vaslui', '38': 'Valcea', '39': 'Vrancea', '40': 'Bucuresti', '41': 'Bucuresti S.1',
           '43': 'Bucuresti S.3', '44': 'Bucuresti S.4', '45': 'Bucuresti S.5', '46': 'Bucuresti S.6',
           '51': 'Calarasi', '52': 'Giurgiu'}
control_string = '279146358279'
valid_chars_in_cnp = '0123456789'
day = slice(5, 7)
month = slice(3, 5)
year = slice(1, 3)
region = slice(7, 9)


def build_year(s: int, year_last_digits: int) -> int:
    """
    :param s: Sex and century of birth for a human
    :param year_last_digits: last two digits of the year of birth for a human
    :return: the year of birth
    """
    if s >= 7 or s <= 2:
        return 1900 + year_last_digits
    elif s == 3 or s == 4:
        return 1800 + year_last_digits
    return 2000 + year_last_digits


def validation(cnp: str) -> str:
    """
    :param cnp: the cnp of a person
    :return: the validity of the CNP or why it's wrong
    """
    # cnp validation
    if cnp is None or len(cnp) != 13:
        return "CNP not the right length"

    if cnp[0] == '0' or not all(48 <= ord(char) <= 57 for char in cnp):
        return "Weird characters are present"

    year_actual = build_year(s=int(cnp[0]), year_last_digits=int(cnp[year]))
    actual_month = months.get(cnp[month])
    actual_day = int(cnp[day])
    actual_region = regions.get(cnp[region])

    # month validation
    if actual_month is None:
        return "Month is invalid"

    # date validation
    if year_actual > date.today().year or (year_actual == date.today().year and int(cnp[month]) > date.today().month) \
            or (year_actual == date.today().year and int(cnp[month]) > date.today().month and actual_day
                > date.today().day):
        return "Time traveler alert!"

    # day validation
    if actual_day > 31 or actual_day == 0 or actual_month[1] < actual_day:
        return "Day error"

    if actual_month[0] == 'February' and year_actual % 4 == 0:
        if actual_day > 29:
            return 'Day error February style'

    # Region validation
    if actual_region is None:
        return 'Region not found'

    control_calculation = sum((ord(i) - 48) * (ord(j) - 48) for i, j in zip(list(cnp[:-1]), control_string)) % 11

    # control validation
    if control_calculation == 10:
        control_calculation = 1

    if control_calculation != int(cnp[12]):
        return "Wrong value for control character"

    return "Good CNP"


def create_cnp() -> str:
    """
    :return: a cnp made of random characters
    """
    return "".join((rd.choice(valid_chars_in_cnp) for _ in range(13)))


def stress_test(number: int) -> [str]:
    """
    :param number: Number of random dnp to create and verify
    :return: a list of good cnp
    """
    good_cnps = (CNP(_) for _ in (create_cnp() for _ in range(number)) if validation(cnp=_) == "Good CNP")
    return good_cnps


if __name__ == "__main__":
    output = open("../../../Teme/GoogleAtelierTeme/Tema 2/output.txt", "w+")
    for x in stress_test(number=int(input("number of cnps to test\n"))):
        output.write(repr(x) + '\n')
    output.close()

    # CNP_to_Test = input("Introduce a CNP\n")
    # if validation(cnp=CNP_to_Test) == "Good CNP":
    #     print(Human(cnp=CNP_to_Test))
    # else:
    #     print("Bad CNP")
