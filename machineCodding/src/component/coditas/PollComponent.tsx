const PollComponent = () => {
  return (
    <div className="text-white">
      PollComponent
      <div>
        <Poll
          pollConfig={{
            title: "Which one question is correct",
            id: "o1",
            totalVotes: 5,
            polls: [
              { id: 1, title: "Option1", poll: 10, votes: 3 },
              { id: 1, title: "Option2", poll: 20, votes: 2 },
            ],
          }}
        />
      </div>
    </div>
  );
};

const Poll = ({ pollConfig }) => {
  const { title, id, polls } = pollConfig;
  return (
    <div>
      Poll
      <h2>{title}</h2>
      <div className="w-[400px] bg-white">
        <PollProgress bgColor="" progress={10} />
      </div>
    </div>
  );
};

const PollProgress = ({
  otionTitle = "",
  vote = 0,
  progress = 0,
  bgColor = "white",
  progressColor = "blue",
  showResult = false,
}) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>{otionTitle}</h3>
      <div style={{ background: "white", padding: "3px" }}>
        <div
          style={{
            backgroundColor: progressColor,
            paddingTop: "2px",
            paddingBottom: "2px",
            width: `${showResult ? progress : 0}%`,
          }}
        ></div>
      </div>
      {showResult && (
        <div className="text-black">
          {`Votes : ${vote} Progress : ${progress}`}
        </div>
      )}
    </div>
  );
};

export default PollComponent;
