var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: new Date()
  }
}

module.exports = {generateMessage};
