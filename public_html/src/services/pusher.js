import Pusher from 'pusher-js';

const pusher = new Pusher('c10b7f3116579c4a7995', {
  cluster: 'ap1',
  encrypted: true,
});

export default pusher;