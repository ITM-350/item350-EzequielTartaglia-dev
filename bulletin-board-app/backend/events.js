// events.js
const events = [
  {
    id: 1,
    title: 'Docker Workshop',
    detail: 'Linuxing in London',
    date: '2017-11-21',
  },
  {
    id: 2,
    title: 'WinOps #17',
    detail: 'WinOps London',
    date: '2017-11-21',
  },
  {
    id: 3,
    title: 'Docker London',
    date: '2017-11-13',
  },
];

exports.events = function (req, res) {
  res.json(events);
};

exports.event = function (req, res) {
  const eventId = parseInt(req.params.eventId, 10); 
  const event = events.find((event) => event.id === eventId);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
};
