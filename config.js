const LEADERBOARD_LOAD_INTERVAL = (parseInt(process.env.LEADERBOARD_LOAD_INTERVAL) || 60) * 1000; // Default: 60 seconds
const GOOGLE_FORM_ID = process.env.GOOGLE_FORM_ID;

function config({node_env = "development"}) {
  return {
    'process.env.NODE_ENV': JSON.stringify(node_env),
    'LEADERBOARD_LOAD_INTERVAL': JSON.stringify(LEADERBOARD_LOAD_INTERVAL),
    'GOOGLE_FORM_ID': JSON.stringify(GOOGLE_FORM_ID),
  }
}

export { config };
export default config;
