const cliProgress = require('cli-progress');

const createProgressBar = (total) => {
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(total, 0);
  return progressBar;
};

module.exports = { createProgressBar };
