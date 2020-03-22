const LEADERBOARD_LOAD_INTERVAL = (parseInt(process.env.LEADERBOARD_LOAD_INTERVAL) || 60) * 1000; // Default: 60 seconds

function config({node_env = "development"}) {
  return {
    'process.env.NODE_ENV': JSON.stringify(node_env),
    'process.env.LEADERBOARD_LOAD_INTERVAL': JSON.stringify(LEADERBOARD_LOAD_INTERVAL),
  }
}

export { config };
export default config;
