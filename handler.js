const handler = (event, context) => {
  return JSON.parse(event.body);
  
};

module.exports = handler;
