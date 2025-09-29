import CafeInfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";
import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const handleVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };
  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
  const totalVotes = (): number => {
    return votes.bad + votes.good + votes.neutral;
  };
  const total = totalVotes();
  const positiveRate = (): number => {
    return total ? Math.round((votes.good / total) * 100) : 0;
  };
  const render = () => {
    if (total > 0) {
      return (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes()}
          positiveRate={positiveRate()}
        />
      );
    } else {
      return <Notification />;
    }
  };
  const canReset = () => {
    if (total > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset()}
      />
      {render()}
    </div>
  );
}