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
      case 'Depositar':
        deposit()
        break;
      default:
        console.log(chalk.rgb(10, 255, 10)("Obrigado por usar o bank!"))
        process.exit()
    }
  })
  .catch((error) => console.log(error))
}
operation()

// Create account
function createAccount(){
  console.log(chalk.rgb(10, 255, 10)("Obrigado por escolher nosso banco. \nVamos dar início a criação da sua conta."))

  buildAccount()

  // Build account
  function buildAccount(){
    prompt([
      {
        name: "accoutName",
        message: "Digite um nome para sua conta:"
      }
    ])
    .then((answers) => {
      const accountName = answers['accountName']; 
      
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
    })
    .catch((error) => console.log(error))
  }
}

// Deposit
async function deposit(){
  function accountName(){
    prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta",
      },
    ])
    .then((answers) => {
      const accountName = answers['accountName']
  
      if(!checkIfTheAccountExists(accountName)){
        return false;
      }else{
        return true
      }
    })
    .catch((error) => console.log(error))
  }

  await accountName()
  console.log("ioi")
}

// Verifications
function checkIfTheAccountExists(accountName){
  if(!fs.existsSync(`accounts/${accountName}.json`)){
    console.log(chalk.bgRgb(255, 0, 0).rgb(0, 0, 0).bold("Essa conta não existe, tente novamente!"))
    return false;
  }
  return true;
}