const colors = ['coral','sky','gold','mint'];
export const Board = () => <div className="project-visual" aria-hidden="true">
  <div className="board">{colors.map(color => <div key={color} className={'yard '+color}><i/><i/><i/><i/></div>)}<span className="board-center">✦</span></div>
</div>;
