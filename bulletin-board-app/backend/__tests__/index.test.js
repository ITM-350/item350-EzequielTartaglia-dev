// index.test.js
const indexController = require('../index'); 

describe('Index Controller', () => {
  let res;

  beforeEach(() => {
    res = {
      render: jest.fn(), 
    };
  });

  it('should render the index view', () => {
    const req = {}; 

    indexController.index(req, res);

    expect(res.render).toHaveBeenCalledWith('index');
  });
});
