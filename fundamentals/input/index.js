const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.question('Qual sua linguagem preferida?', (language) => {
  console.log(language);
  readline.close()
})