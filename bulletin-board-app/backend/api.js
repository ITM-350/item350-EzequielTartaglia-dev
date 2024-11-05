var eventsData = [
  { date: "2017-11-21", detail: "Linuxing in London", id: 1, title: "Docker Workshop" },
  { date: "2017-11-21", detail: "WinOps London", id: 2, title: "WinOps #17" },
  { date: "2017-11-13", id: 3, title: "Docker London" }
];

exports.events = function (req, res) {
  res.json(eventsData); 
};

exports.event = function (req, res) {
  const eventId = req.params.eventId; 
  const event = eventsData[eventId]; 
  if (event) {
    res.json(event);
  } else {
    res.json(undefined); 
  }
};
