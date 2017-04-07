let initial = {
  people: [
    {
      name: 'John',
      age: 25,
    },
  ],
};

export function reduce(state = initial, action) {
  switch (action.type) {
    case 'ADD_PERSON':
      return addPerson(state, action);
    default:
      return state;
  }
}

export function addPerson(state, action) {
  console.log('state:', state);
  console.log('action:', action);

  state.people.push(action.payload);

  return state;
}
