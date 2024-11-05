const api = require('../api.js');

const eventsData = [
  { date: "2017-11-21", detail: "Linuxing in London", id: 1, title: "Docker Workshop" },
  { date: "2017-11-21", detail: "WinOps London", id: 2, title: "WinOps #17" },
  { date: "2017-11-13", id: 3, title: "Docker London" }
];

describe('API Controller', () => {
  let res;

  beforeEach(() => {
    res = {
      json: jest.fn(), 
    };
  });

  it('should return all events', () => {
    const req = {}; 
    api.events(req, res);

    expect(res.json).toHaveBeenCalledWith(eventsData);
  });

  it('should return a specific event by ID', () => {
    const eventId = 0; 
    const req = { params: { eventId } }; 

    api.event(req, res);

    expect(res.json).toHaveBeenCalledWith(eventsData[eventId]); 
  });

  it('should return undefined for an invalid event ID', () => {
    const invalidEventId = 999;
    const req = { params: { eventId: invalidEventId } };

    api.event(req, res);

    expect(res.json).toHaveBeenCalledWith(undefined); 
  });
});
