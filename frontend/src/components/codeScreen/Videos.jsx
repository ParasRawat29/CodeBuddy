import React, { useCallback, useEffect, useRef, useState } from "react";
import ACTIONS from "../../actions";
import "../../styles/videos.css";
import Peer from "peerjs";
import MicOffIcon from "../../icons/MicOffIcon";
import MicOnIcon from "../../icons/MicOnIcon";
import CamOnIcon from "../../icons/CamOnIcon";
import CamOffIcon from "../../icons/CamOffIcon";
import MediaStreamControllerButton from "../buttons/mediaStreamButton";

const constraints = { audio: true, video: true };

function Videos({ socketRef, roomId }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerIdRef = useRef(null);
  const myPeerRef = useRef(null);
  const peers = useRef({});
  const localStreamRef = useRef(null);
  const [cons, setCons] = useState({ audio: true, video: true });
  const [showCard, setShowCard] = useState(false);
  const handleConnectVideo = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(async (stream) => {
        localStreamRef.current = stream;
        socketRef.current.emit(ACTIONS.GET_ALL_USERS_PEERID, { roomId });
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
        setShowCard(true);
        myPeerRef.current.on("call", async function (call) {
          // Answer the call, providing our mediaStream
          call.answer(localStreamRef.current);
          call.on("stream", (userVideoStream) => {
            remoteVideoRef.current.srcObject = userVideoStream;
            remoteVideoRef.current.play();
          });
        });

        socketRef.current.on(ACTIONS.ALL_USERS_PEERID, ({ allPeers }) =>
          handleAllUsersPeer(allPeers, localStreamRef.current)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAllUsersPeer = (allPeers, stream) => {
    const call = myPeerRef.current.call(allPeers[0], stream);

    call.on("stream", (userVideoStream) => {
      remoteVideoRef.current.srcObject = userVideoStream;
      // remoteVideoRef.current.play();
    });

    call.on("close", () => {
      remoteVideoRef.current.pause();
      remoteVideoRef.current.srcObject = null;
    });
    peers.current = { ...peers.current, [allPeers[0]]: call };
  };

  const closeCamera = () => {
    const tracks = localStreamRef.current.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  };

  const handleCamToggle = useCallback(
    (val) => {
      if (localStreamRef.current) {
        localStreamRef.current.getVideoTracks()[0].enabled = val;
        setCons((pre) => ({ ...pre, video: val }));
      }
    },
    [localStreamRef.current]
  );

  const handleMicToggle = useCallback(
    (val) => {
      if (localStreamRef.current) {
        localStreamRef.current.getAudioTracks()[0].enabled = val;
        setCons((pre) => ({ ...pre, audio: val }));
      }
    },
    [localStreamRef.current]
  );

  useEffect(() => {
    const myPeer = new Peer();
    myPeerRef.current = myPeer;
    myPeer.on("open", (id) => {
      peerIdRef.current = id;
      socketRef.current.emit(ACTIONS.SET_PEER_ID, { id, roomId });
    });

    return () => {
      closeCamera();
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ peerID }) => {
        peers.current[peerID].close();
      });
      socketRef.current.on(
        ACTIONS.NEW_PEER_JOINED_CALL_ME_FOR_PEER_LIST,
        () => {
          socketRef.current.emit(ACTIONS.GET_ALL_USERS_PEERID, { roomId });
        }
      );
      socketRef.current.on("peerId_Created", () => {
        // socketRef.current.emit(ACTIONS.GET_ALL_USERS_PEERID, { roomId });
        handleConnectVideo();
      });
    }
  }, [socketRef.current]);

  return (
    <div className="videosWrapper">
      <div className="videoContainer">
        <section className="videoCard">
          <video
            ref={localVideoRef}
            autoPlay
            style={{
              margin: 2,
            }}
          />
          {showCard && (
            <div className="micControllerBtnWrapper">
              {cons.video ? (
                <MediaStreamControllerButton
                  onClick={() => {
                    handleCamToggle(false);
                  }}
                >
                  <CamOnIcon width={"20px"} height="20px" />
                </MediaStreamControllerButton>
              ) : (
                <MediaStreamControllerButton
                  onClick={() => {
                    handleCamToggle(true);
                  }}
                >
                  <CamOffIcon width={"20px"} height="20px" />
                </MediaStreamControllerButton>
              )}
              {cons.audio ? (
                <MediaStreamControllerButton
                  onClick={() => handleMicToggle(false)}
                >
                  <MicOnIcon width={"20px"} height="20px" />
                </MediaStreamControllerButton>
              ) : (
                <MediaStreamControllerButton
                  onClick={() => handleMicToggle(true)}
                >
                  <MicOffIcon width={"20px"} height="20px" />
                </MediaStreamControllerButton>
              )}
            </div>
          )}
        </section>

        <section className="videoCard">
          <video
            ref={remoteVideoRef}
            autoPlay
            style={{
              margin: 2,
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default Videos;
