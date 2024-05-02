// chatUtils.js
export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return "Unknown";
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const isSameSender = (messages, m, i, userId) => {
  if (!messages || !m || i >= messages.length - 1) return false;
  return (
    messages[i + 1].sender._id !== m.sender._id &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  if (!messages || i >= messages.length) return false;
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (!messages || !m) return "auto";
  
  if (i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== userId)
    return 0;
  else if ((i < messages.length - 1 && messages[i + 1].sender._id !== m.sender._id && messages[i].sender._id !== userId) ||
           (i === messages.length - 1 && messages[i].sender._id !== userId))
    return 0;
  else 
    return "auto";
};

export const isSameUser = (messages, m, i) => {
  if (!messages || !m || i === 0) return false;
  return messages[i - 1].sender._id === m.sender._id;
};
