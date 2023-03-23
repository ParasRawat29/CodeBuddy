import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Peer from "peerjs";
const PeerContext = createContext(null);

export const usePeer = () => useContext(PeerContext);
export const PeerProvider = (props) => {
  return (
    <PeerContext.Provider
      value={
        {
          // peer,
          // createOffer,
          // createAnswer,
          // setRemoteDesc,
          // sendStream,
          // remoteStream,
        }
      }
    >
      {props.children}
    </PeerContext.Provider>
  );
};
