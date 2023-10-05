import { useState } from 'react';
import './App.css';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';

const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
}

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  }

  const Icon = icons[action];
  return (<Icon {...props} />);
}

function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className='player'>
      <div className='score'>{`${name} : ${score}`}</div>
      <div className='action'>
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  )
}

function ActionButton({ action = "rock", onActionSelected }) {
  return (
    <button className='round-btn' onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const CheckWinner = (playerAction, computerAction) => {
    if (actions[playerAction] === computerAction) {
      setPlayerScore(playerScore + 1)
    } else if (actions[computerAction] === playerAction) {
      setComputerScore(computerScore + 1);
    }
  }

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();
    setPlayerAction(selectedAction);

    setComputerAction(newComputerAction);
    CheckWinner(selectedAction, newComputerAction);
  }
  return (
    <div className="center">
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className='container'>
          <Player name='Player' score={playerScore} action={playerAction} />
          <Player name='Computer' score={computerScore} action={computerAction} />
        </div>
        <div>
          <ActionButton action='rock' onActionSelected={onActionSelected} />
          <ActionButton action='paper' onActionSelected={onActionSelected} />
          <ActionButton action='scissors' onActionSelected={onActionSelected} />
        </div>
        {playerScore !== computerScore && <h2>{playerScore > computerScore ? 'Player wins' : 'Computer wins'}</h2>}
      </div>
    </div>
  );
}

export default App;
