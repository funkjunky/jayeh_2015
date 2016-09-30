const destructurer = (key) => (obj) => obj[key];

//ie. connect(data)(Blog)
//render({ articles })
export default destructurer;
export const data = destructurer('data');
