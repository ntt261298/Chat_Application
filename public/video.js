const openStream = function() {
    return navigator.mediaDevices.getUserMedia({  video: true, audio: false });
}
const playStream = function(idVideoTag, stream) {
  const video = document.getElementById(idVideoTag);
  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
}
const closeStream = function(idVideoTag) {
  const video = document.getElementById(idVideoTag);
  video.pause();
  video.srcObject = null;
  console.log("before off cam, offed video");
  window.localStream.getTracks().forEach((track) => track.stop());
  setTimeout(()=>{
    console.log("In queue");
  }, 0)
  console.log("after off cam");
}
