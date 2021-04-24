const readLineSync = require('readline-sync');
const questions = require('./questions.json');
const totalQuestions = questions.length;


const greetUser = () => {
  console.log(`Hi, Welcome to the Quiz, There are total ${totalQuestions} Questions in this Quiz.`);

  readLineSync.question("Press Enter key to Start the Quiz..\n\n");
}

const displayQuestion = (index) => {
  console.log(`\n Q ${index+1}.\t${questions[index]["question"]}\n`);
  console.log(
    `Options are: 
    1. ${questions[index]["answers"][0]}
    2. ${questions[index]["answers"][1]}
    3. ${questions[index]["answers"][2]}
    4. ${questions[index]["answers"][3]}`
  );
}

const getUserChoice = (index) => {
  let choice = readLineSync.question("\nEnter your choice: ");

  if (!isNaN(choice) && Number.isInteger(Number(choice))) {
    choice = parseInt(choice);
    if (choice > 0 && choice <= 4) {
      return choice
    }
  }

  console.log("Please Enter Valid Choice..!!");
  return -1;
}

const verifyAns = (index, choice) => {
  const correctAnsIndex = questions[index]["correctIndex"] + 1
  if (choice === correctAnsIndex){
    console.log("Congratulations.. You are Correct !!!")
    return 1;
  } else {
    console.log(`Aww.. Your ans is incorrect. Correct ans is: ${questions[index]["answers"][correctAnsIndex-1]}`)
    return 0;
  }
}

const quiz = () => {
  let totalScore = 0;

  for (let i = 0; i < totalQuestions; i++) {
    displayQuestion(i);
    let userChoice = getUserChoice(i); 
    
    while (userChoice === -1) {
      userChoice = getUserChoice(i);
    }

    if (verifyAns(i, userChoice)) {
      totalScore += 1;
    } 
  }

  console.log(`Your Score is: ${totalScore} out of ${totalQuestions}`);
}

greetUser();
quiz();

console.log("Thanks for attempting the Quiz..");

