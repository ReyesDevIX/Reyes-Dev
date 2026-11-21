type Vertex = { x: number; y: number; z: number };
type Face = { points: Vertex[]; color: string };
const grid = 32;
const halfDepth = .76;

const noise = (x: number, z: number) => {
  const value = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

// Intersecting ridges give the massif sharp crests and a flat, cutaway base.
const elevation = (x: number, z: number) => {
  const ridge = (cx: number, cz: number, height: number, width: number) =>
    height - Math.abs(x - cx) * width - Math.abs(z - cz + .22 * (x - cx)) * 1.65;
  const rock = Math.max(.035, ridge(.17,-.1,1.12,1.47), ridge(-.38,.05,.79,1.4), ridge(.58,.12,.65,1.5));
  const edge = Math.min(1, (1 - Math.abs(x)) * 6, (halfDepth - Math.abs(z)) * 7);
  return .045 + edge * (rock + .045 * Math.sin(22*x + 7*z) + .032 * Math.cos(24*z - 8*x));
};

const makeFace = (a: Vertex, b: Vertex, c: Vertex): Face => {
  const ux=b.x-a.x, uy=b.y-a.y, uz=b.z-a.z;
  const vx=c.x-a.x, vy=c.y-a.y, vz=c.z-a.z;
  const nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
  const light=(ny*.76 - nx*.58 + nz*.27)/Math.hypot(nx,ny,nz);
  const height=(a.y+b.y+c.y)/3;
  const snow=height > .63 + .09*Math.sin(16*a.z+4*a.x) - .14*light;
  const base=snow ? [197,224,237] : height < .20 ? [52,112,111] : [77,126,153];
  const shade=.67 + light*.32 + .07*noise(a.x,c.z);
  return {points:[a,b,c],color:'rgb('+base.map(value=>Math.round(value*shade)).join(',')+')'};
};

export const createTerrain = () => {
  const faces: Face[]=[];
  const vertices=Array.from({length:grid+1},(_,i)=>Array.from({length:grid+1},(_,j)=>{
    const inside=i>0 && j>0 && i<grid && j<grid;
    const x=-1+(i+(inside ? .53*(noise(i,j)-.5) : 0))*2/grid;
    const z=-halfDepth+(j+(inside ? .53*(noise(j+11,i)-.5) : 0))*2*halfDepth/grid;
    return {x,z,y:elevation(x,z)};
  }));
  const wall=(a:Vertex,b:Vertex) => {
    const levels=[a.y,-.015,-.054,-.074,-.14];
    const colors=['#446766','#284855','#759697','#1d3848'];
    colors.forEach((color,k)=>{
      const top=levels[k], bottom=levels[k+1];
      faces.push({color,points:[{...a,y:top},{...b,y:top},{...b,y:bottom},{...a,y:bottom}]});
    });
  };
  for(let i=0;i<grid;i++) {
    for(let j=0;j<grid;j++) {
      const a=vertices[i][j], b=vertices[i+1][j], c=vertices[i][j+1], d=vertices[i+1][j+1];
      faces.push(makeFace(a,c,b),makeFace(b,c,d));
    }
    wall(vertices[i][0],vertices[i+1][0]);
    wall(vertices[i][grid],vertices[i+1][grid]);
    wall(vertices[0][i],vertices[0][i+1]);
    wall(vertices[grid][i],vertices[grid][i+1]);
  }
  return faces;
};

// Orthographic projection and depth sorting keep the hidden slopes behind the visible ones.
export const drawTerrain = (ctx:CanvasRenderingContext2D, faces:Face[], width:number, height:number, degrees:number) => {
  const angle=degrees*Math.PI/180, cos=Math.cos(angle), sin=Math.sin(angle);
  const pitch=.41, up=Math.cos(pitch), tilt=Math.sin(pitch);
  const scale=Math.min(width*.35,height*.44);
  const project=(point:Vertex) => {
    const depth=point.x*sin+point.z*cos;
    return {x:width*.5+scale*(point.x*cos-point.z*sin),y:height*.61+scale*(depth*tilt-point.y*up),depth:depth*up+point.y*tilt};
  };
  ctx.clearRect(0,0,width,height);
  const projected=new Map<Vertex,ReturnType<typeof project>>();
  const cameraPoint=(vertex:Vertex) => {
    let point=projected.get(vertex);
    if(!point){point=project(vertex);projected.set(vertex,point);}
    return point;
  };
  const visible=faces.map(face=>{
    const points=face.points.map(cameraPoint);
    return {points,color:face.color,depth:points.reduce((sum,p)=>sum+p.depth,0)/points.length};
  }).sort((a,b)=>a.depth-b.depth);
  ctx.lineWidth=.55;
  ctx.lineJoin='round';
  for(const face of visible){
    ctx.beginPath();
    face.points.forEach((p,index)=>index ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
    ctx.closePath();
    ctx.fillStyle=ctx.strokeStyle=face.color;
    ctx.fill();
    ctx.stroke();
  }
};
