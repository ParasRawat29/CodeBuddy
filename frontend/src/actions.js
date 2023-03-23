const ACTIONS = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  LEAVE: "leave",
  CODE_CHANGED: "code-changed",
  SYNC_CODE: "sync-code",
  OUTPUT_CHANGED: "output-changed",
  LANGUAGE_CHANGED: "language-changed",
  ROOM_FULL: "room-full",
  ALL_USERS: "all-users",
  OFFER: "offer",
  GET_OFFER: "get-offer",
  ANSWER: "answer",
  GET_ANSWER: "get-answer",
  CANDIDATE: "candidate",
  GET_CANDIDATE: "get-candidate",
  //
  SET_PEER_ID: "set-peer-id",
  GET_ALL_USERS_PEERID: "get-all-users_peerid",
  ALL_USERS_PEERID: "all-users-peerid",
  NEW_USER_PEER: "new-user-peer",
  NEW_PEER_JOINED_CALL_ME_FOR_PEER_LIST:
    "NEW_PEER_JOINED_CALL_ME_FOR_PEER_LIST",
};
module.exports = ACTIONS;
