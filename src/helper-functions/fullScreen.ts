export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen({navigationUI: "hide"})
  } else if (document.exitFullscreen) document.exitFullscreen()
}
