//Data of game
const Games = [
  {
   name: 'Default training',
   desc: "This is default training. Here you can train your muscle memory. Your target is red gap. When you click on it, then you get point. You can also personalize your game in <a id='setting'><i>settings</i></a>. Good luck!"
  },
  {
  name: 'Reflex training',
  desc: "This is reflex training. You need to click the dot when it appear. It is showing in max 3 seconds. You can set the time of being red in <a id='setting'><i>settings</i></a>. Default value is 0.3 second"
  }
];

let userData = {
  points: 0,
  size: 50,
  showTime: 300,
  timeBetweenDisplays: 5000
};

let target = document.getElementById('target');

//Add points after click the target and update data
const updateData = () => {
  userData.points++;
  updatePoints();
};

//Hide one id and show other
const hideAndShow = (hide, show, game = 0) => {
  document.getElementById(hide).className = "d-none";
  document.getElementById(show).className = "";
  if(game===0){
    target.addEventListener('click', changePosition );
  } else {
    document.getElementById('startAiming').addEventListener('click', reflexGame);
  }
  showGame(game);
};

//Update points in table
const updatePoints = () => {
  document.getElementById('points').innerText = userData.points;
  document.getElementById('sizeOfGap').value = userData.size;
  document.getElementById('displayTime').value = userData.showTime;
  document.getElementById('timeBetweenGap').value = userData.timeBetweenDisplays;
};

//Show game menu depending on game type
const showGame = (gameType) => {
  document.getElementById('gameName').innerText = Games[gameType].name;
  document.getElementById('gameDesc').innerHTML = Games[gameType].desc;
};

//Start game
const startGame = () => {
  document.getElementById('target').className="";
  document.getElementById('bottom').className="d-none";
};

//Event while click on target in default game
const changePosition = () => {
  let top = Math.floor(Math.random() * 80)+8;
  let left = Math.floor(Math.random()*90)+5;
  let element = document.getElementById('target');
  element.style.top = top+"%";
  element.style.left = left+"%";
};
var repeat ='';
//Event while click on target in reflexGame
const reflexGame = () => {
  let element = document.getElementById('target');
  repeat = setInterval(
    () => {
      let breakTime = (Math.random()*5000)+2000;
      console.log(breakTime);
      element.className="";
      setTimeout(
        () => {
          element.className="d-none";
        },
        userData.showTime
      );
    },
    (Math.random()*4000)+1000
  );
};

//Going back to main menu
const backToMenu = () => {
  document.getElementById('defaultTrainingSection').className = "d-none";
  document.getElementById('creditsSection').className = "d-none";
  document.getElementById('settingsSection').className = "d-none";
  target.className = "";
  document.getElementById('mainMenu').className="";
  target.removeEventListener('click', updateData());
};
document.getElementById('defaultTraining').addEventListener('click',() => hideAndShow('mainMenu', 'defaultTrainingSection', 0) );
document.getElementById('reflexTraining').addEventListener('click',() => hideAndShow('mainMenu', 'defaultTrainingSection', 1) );
document.getElementById('settings').addEventListener('click',() => hideAndShow('mainMenu', 'settingsSection') );
document.getElementById('credits').addEventListener('click',() => hideAndShow('mainMenu', 'creditsSection') );
document.getElementById('startAiming').addEventListener('click',startGame) ;
document.getElementById('saveSettings').addEventListener('click', backToMenu);
document.getElementById('closeCredits').addEventListener('click', backToMenu);
document.getElementById('closeTab').addEventListener('click', backToMenu);
target.addEventListener('click', updateData());