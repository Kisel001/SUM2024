const reader = require("node:readline");

// Reads two integers and prints their sum
function basicIO() {
  const input = reader.readline().split(" ");
  const a = parseInt(input[0]);

  for (let i = 0; i < a; ++i) {
    console.log(`Case ${i + 1}:`);

    const input1 = reader.readline().split(" ");
    const b = input1[0];
    const c = input1[1];

    const input2 = reader.readline().split(" ");

    for (let j = 0; j < c; ++j) {
      const input3 = reader.readline().split(" ");
      let res = 0;

      for (let k = 0; k < b; ++k) {
        //of input2) {
        if (input2[k] >= input3[0] && input2[k] <= input3[1]) ++res;
      }

      console.log(`${res}`);
    }
  }
}

function main() {
  basicIO();
  // Your javascript code here
}

main();
