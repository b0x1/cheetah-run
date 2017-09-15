function getParameters() {
  return {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight < 851 ? window.innerHeight * 0.7 : 851
    },
    constantRun: window.innerWidth / 3,
    maximumSteps: 32, // 1024
    rightMargin: 32,
    stepSize: 40
  };
}