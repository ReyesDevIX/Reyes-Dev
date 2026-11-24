const colours = ['coral', 'sky', 'gold', 'mint'];
const lanes = ['north', 'east', 'south', 'west'];

export const Board = () => (
  <div className="project-visual" aria-hidden="true">
    <div className="board">
      {colours.map(colour => (
        <div key={colour} className={'yard ' + colour}>
          <div className="nest"><i /><i /><i /><i /></div>
        </div>
      ))}
      {lanes.map(side => <div key={side} className={'board-lane ' + side} />)}
      <span className="board-center" />
    </div>
  </div>
);
