// events.test.js
const api = require('../events'); 

const eventsData = [ 
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

describe('Events Controller', () => {
  let res;

  beforeEach(() => {
    res = {
      json: jest.fn(), 
      status: jest.fn().mockReturnThis(), 
    };
  });

  it('should return all events', () => {
    const req = {}; 
    api.events(req, res);

    expect(res.json).toHaveBeenCalledWith(eventsData); 
  });

  it('should return a specific event by ID', () => {
    const eventId = 1;
    const req = { params: { eventId } }; 

    api.event(req, res);

    expect(res.json).toHaveBeenCalledWith(eventsData[eventId - 1]); 
  });

  it('should return 404 for an invalid event ID', () => {
    const invalidEventId = 999; 
    const req = { params: { eventId: invalidEventId } };

    api.event(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Event not found' });
  });
});
