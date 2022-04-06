// External
import pkg from "inquirer";
import chalk from "chalk";

// Internal
import fs from "fs";
import inquirer from "inquirer";



// Variables
const {prompt } = pkg;



// Functions
// Operation
function operation(){
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair']
    },  
  ])
  .then((answers) => {
    const action = answers['action'];

    switch(action){
      case 'Criar conta':
        createAccount()
        break;
      case 'Consultar saldo':
        getAccountBalance()
        break;
      case 'Depositar':
        deposit()
        break;
      case "Sacar":
        withdraw()
        break;
      default:
        console.log(chalk.bgRgb(10, 80, 255).white.bold("Obrigado por usar o bank!"))
        process.exit()
    }
  })
  .catch((error) => console.log(error))
}
operation()

// Create account
function createAccount(){
  console.log(chalk.rgb(10, 255, 10)("Obrigado por escolher nosso banco. \nVamos dar início a criação da sua conta."))

  // Ask for account name
  prompt([
    {
      name: "accountName",
      message: "Digite um nome para sua conta:"
    }
  ])
  .then((answers) => {
    const accountName = answers['accountName'].split(" ").join("_"); 

    // Check if the user typed something
    if(accountName == "") return buildAccount()
    
    // Accounts folder exists?
    if(!fs.existsSync('accounts')) fs.mkdirSync('accounts');
    
    // Account name exists?
    if(fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRgb(255, 0, 0).rgb(0, 0, 0).bold("Esta conta já existe!"))

      // Restart
      return buildAccount();
    }

    // Create archive
    fs.writeFileSync(
      `accounts/${accountName}.json`,
      '{"balance": 0}',

      (error) => console.log(error)
    )

    // Success message
    console.log(chalk.bgRgb(10, 255, 10).rgb(0, 0, 0).bold("Parabéns! Sua conta foi criada!"))
    
    setTimeout(() => operation(), 1500)
  })
  .catch((error) => console.log(error))
}

// Deposit
async function deposit(){
  let amountToDeposit;
  const accountName = await askForAccountName()
  if(!accountName) return deposit()

  const accountData = await getAccount(accountName)
  if(!accountData) return deposit()

  // What amount to deposit
  await prompt([
    {
      name: "amountToDeposit",
      message: "Quanto você quer depositar?",
    },
  ])
  .then((answers) => {
    amountToDeposit = answers['amountToDeposit'];
  })

  if(!amountToDeposit) return deposit()

  // Calculate
  accountData.balance = parseFloat(accountData.balance) + parseFloat(amountToDeposit);

  // Save file
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (error) => console.log(error)
  )

  console.log(chalk.bgRgb(10, 255, 10).rgb(0, 0, 0).bold(`Sucesso! Foi depositado o valor de $${amountToDeposit} na conta ${accountName.split("_").join(" ")}.`))

  operation()
}

// Show balance
async function getAccountBalance(){
  const accountName = await askForAccountName();
  if(!accountName) return getAccountBalance()

  const accountData = await getAccount(accountName)
  if(!accountData) return getAccountBalance();

  console.log(chalk.bgRgb(10, 80, 255).white.bold(`O seu saldo é de $${accountData.balance}`))
  
  operation()
}

// Withdraw money
async function withdraw(){
  let withDrawAmount;
  const accountName = await askForAccountName()
  if(!accountName) return withdraw()

  const accountData = await getAccount(accountName)
  if(!accountData) return withdraw()

  // Ask how much you want to withdraw
  await prompt([
    {
      name: "howMuchToWithdraw",
      message: "Quanto você quer sacar?"
    },
  ]).then((answers) => {
    withDrawAmount = answers['howMuchToWithdraw'];
    
  }).catch((error) => console.log(error))

  accountData.balance = parseFloat(accountData.balance) - parseFloat(withDrawAmount);

  // Save file
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (error) => console.log(error)
  )

  console.log(chalk.bgRgb(10, 255, 10).rgb(0, 0, 0).bold(`Você sacou um valor de $${withDrawAmount} na conta ${accountName.split("_").join(" ")}.`))

  operation()
}



// Reusable functions
async function askForAccountName(){
  let result = await prompt([
    {
      name: "accountName",
      message: "Digite o nome da sua conta:"
    }
  ])
  .then((answers) => {
    const accountName = answers['accountName'].split(" ").join("_"); 
    
    if(!checkIfTheAccountExists(accountName)){
      return false;
    }

    return accountName;
  })
  .catch((error) => console.log(error))

  return result;
}

function checkIfTheAccountExists(accountName){
  if(!fs.existsSync(`accounts/${accountName}.json`)){
    console.log(chalk.bgRgb(255, 0, 0).rgb(0, 0, 0).bold("Essa conta não existe, tente novamente!"))
    return false;
  }
  return true;
}

async function getAccount(accountName){
  const account = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r"
  })

  return JSON.parse(account)
}

