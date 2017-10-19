function getParameters() {
  return {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight
//      height: window.innerHeight < 851 ? window.innerHeight : 851
    },
    constantRun: window.innerWidth / 3,
    maximumSteps: 1024, // 1024
    stepSize: 40
  };
}