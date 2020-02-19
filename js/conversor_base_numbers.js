
let objMessage = {
  message: "No base selected!!! Please check one of the options for base."
}

function converter_numbers() {
  let number = document.querySelector('#number').value;
  let base = checkradiobutton();

  if (base === 0) {
    alert(objMessage.message);
    return;
  }

  if (!number.includes(".")) {
    if (base === "10") convert_integer(number, base);
    if (base === "16") convert_integer(number, base);
    if (base === "8") convert_integer(number, base);
    if (base === "2") convert_integer(number, base);
  } else {

    if (base === "16") {
      document.querySelector('#result16').value = number;
      number = convert_hex_to_decimal(number);
      document.querySelector('#result10').value = number;
      document.querySelector('#result8').value = convert_from_float_decimal(number, "8");
      document.querySelector('#result2').value = convert_from_float_decimal(number, "2");
    }

    if (base === "10") {
      document.querySelector('#result16').value = convert_from_float_decimal(number, "16");
      document.querySelector('#result10').value = number;
      document.querySelector('#result8').value = convert_from_float_decimal(number, "8");
      document.querySelector('#result2').value = convert_from_float_decimal(number, "2");
    }

    if (base === "8") {
      document.querySelector('#result8').value = number;
      number = convert_octal_to_decimal(number);
      document.querySelector('#result10').value = number;
      document.querySelector('#result16').value = convert_from_float_decimal(number, "16");
      document.querySelector('#result2').value = convert_from_float_decimal(number, "2");
    }

    if (base === "2") {
      document.querySelector('#result2').value = number;
      number = convert_float_binary_to_decimal(number);
      document.querySelector('#result10').value = number;
      document.querySelector('#result16').value = convert_from_float_decimal(number, "16");
      document.querySelector('#result8').value = convert_from_float_decimal(number, "8");
    }

  }
};

//=================================================

function checkradiobutton() {
  if (document.querySelector('#base16').checked) {
    return document.querySelector('#base16').value;
  }
  if (document.querySelector('#base10').checked) {
    return document.querySelector('#base10').value;
  }
  if (document.querySelector('#base8').checked) {
    return document.querySelector('#base8').value;
  }
  if (document.querySelector('#base2').checked) {
    return document.querySelector('#base2').value;
  }
  return 0;
}

function convert_integer(value, base) {

  document.querySelector("#result10").value = parseInt(value, base).toString(10);;
  document.querySelector("#result16").value = parseInt(value, base).toString(16);
  document.querySelector("#result8").value = parseInt(value, base).toString(8);
  document.querySelector("#result2").value = parseInt(value, base).toString(2);

}

//=================================================

function convert_from_float_decimal(value, base) {
  value = value.toString();
  base = parseInt(base);
  let fistTerm = "";
  let lastTerm = "";
  let count = 0;
  let arr2 = Array.from(value.split(".")[1]);
  let arr = Array.from(value.split(".")[0]);

  let value1 = parseInt(arr.join(""));
  let value2 = parseInt(arr2.join(""));
  let remainder = 0;
  let resultCalc = 0;

  while (value1 > 0) {
    remainder = value1 % base;
    resultCalc = Math.floor(value1 / base);
    value1 = resultCalc;

    if (remainder.toString() === "10") {
      fistTerm += 'A';
    } else if (remainder.toString() === "11") {
      fistTerm += 'B';
    } else if (remainder.toString() === "12") {
      lfistTerm += 'C';
    } else if (remainder.toString() === "13") {
      fistTerm += 'D';
    } else if (remainder.toString() === "14") {
      fistTerm += 'E';
    } else if (remainder.toString() === "15") {
      fistTerm += 'F';
    } else {
      fistTerm += remainder.toString();
    }

  }

  let reversedFirstTerm = fistTerm.split("").reverse().join("");

  value2 = parseFloat("0." + value2);
  count = -1;
  let result = 0.0;
  let resultInteiro = 0;
  while (count > -6) {
    result = value2 * base;

    if (result.toString().split(".")[0] === "10") {
      lastTerm += 'A';
    } else if (result.toString().split(".")[0] === "11") {
      lastTerm += 'B';
    } else if (result.toString().split(".")[0] === "12") {
      lastTerm += 'C';
    } else if (result.toString().split(".")[0] === "13") {
      lastTerm += 'D';
    } else if (result.toString().split(".")[0] === "14") {
      lastTerm += 'E';
    } else if (result.toString().split(".")[0] === "15") {
      lastTerm += 'F';
    } else if (!result.toString().includes(".")) {
      lastTerm += result.toString();
      break;
    } else {
      lastTerm += result.toString().split(".")[0];
    }

    resultInteiro = Math.floor(value2 * base);
    value2 = result - resultInteiro;
    count -= 1;
  }

  return reversedFirstTerm + "." + lastTerm;

}

//=================================================

function convert_hex_to_decimal(value) {
  let fistTerm = 0;
  let lastTerm = 0;
  let count = 0;
  let arr2 = Array.from(value.split(".")[1]);
  let arr = Array.from(value.split(".")[0]);

  let aux = 0;
  arr.reverse().forEach(digit => {
    digit = transform_hex_char_to_number(digit);
    aux = Math.pow(16, count);
    fistTerm += digit * aux;
    count += 1;
  });

  count = -1;
  arr2.forEach(digit => {
    digit = transform_hex_char_to_number(digit);
    aux = Math.pow(16, count)
    lastTerm += digit * aux;
    count -= 1;
  });

  result = fistTerm + lastTerm;

  return result;
}

//=================================================

function convert_octal_to_decimal(value) {
  let fistTerm = 0;
  let lastTerm = 0;
  let count = 0;
  let arr2 = Array.from(value.split(".")[1]);
  let arr = Array.from(value.split(".")[0]);
  let aux = 0;

  arr.reverse().forEach(digit => {
    aux = Math.pow(8, count);
    fistTerm += digit * aux;
    count += 1;
  });

  count = -1;
  arr2.forEach(digit => {
    aux = Math.pow(8, count);
    lastTerm += digit * aux;
    count -= 1;
  });

  result = fistTerm + lastTerm;

  return result;
}

//=================================================

function convert_float_binary_to_decimal(value) {
  let sum = 0;
  let count = 0;

  let arr2 = Array.from(value.split(".")[1]);
  let arr = Array.from(value.split(".")[0]);


  arr = arr.reverse();
  arr.forEach(digit => {
    if (digit === "1") {
      sum += Math.pow(2, count);
    }
    count += 1;
  });

  count = -1;
  arr2.forEach(digit => {
    if (digit === "1") {
      sum += Math.pow(2, count);
    }
    count -= 1;
  });

  return sum;

}

//=================================================

function transform_hex_char_to_number(char) {
  if (char.toLowerCase() === "a") {
    char = 10;
  } else if (char.toLowerCase() === "b") {
    char = 11;
  } else if (char.toLowerCase() === "c") {
    char = 12;
  } else if (char.toLowerCase() === "d") {
    char = 13;
  } else if (char.toLowerCase() === "e") {
    char = 14;
  } else if (char.toLowerCase() === "f") {
    char = 15;
  }

  return char;

}