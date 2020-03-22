import axios from 'axios';

class Leaderboard {
  // Leaderboard.DEFAULT_TIMEOUT = 60000; // 60 Seconds
  // Leaderboard.MIN_TIMEOUT = 1000; // 1 Second

  constructor({onLoad, timeout}) {
    this.data = null;
    this.loading = false;
    this.onLoad = onLoad;

    this.load();
    this.interval = setInterval(() => this.load(), this.effectiveTimeout(timeout));
  }

  /**
   * Determine effective interval timeout
   * @param {Number} timeout
   * @returns {Number}
   */
  effectiveTimeout(timeout) {
    const effective_time = parseInt(timeout);

    if (isNaN(effective_time)) {
      return this.DEFAULT_TIMEOUT;
    }

    return (timeout < this.MIN_TIMEOUT) ? this.MIN_TIMEOUT : timeout;
  }

  /**
   * Load Data
   */
  load() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    axios
      .get('/.netlify/functions/leaderboard')
      .then(res => {
        this.data = res.data;
        this.loading = false;
        this.onLoad(this);
      })
      ;
  }

  /**
   * Calculate Possible Points
   * @returns {Number}
   */
  possiblePoints() {
    if (!this.data) {
      return null;
    }

    return this.data.points
      .filter(x => x !== '')
      .reduce((acc, x) => acc + parseInt(x), 0)
      ;
  }

  /**
   * Sort Scores
   * @returns {Array}
   */
  sortedScores() {
    if (!this.data) {
      return [];
    }

    return this.data.scores
      .map(score => [
        new Date(score[0]),
        score[1],
        ...score.slice(-2)
      ])
      .sort((a, b) => a[0] - b[0])
      .sort((a, b) => b[2] - a[2])
      ;
  }
}

Leaderboard.DEFAULT_TIMEOUT = 60000; // 60 Seconds
Leaderboard.MIN_TIMEOUT = 1000; // 1 Second

export { Leaderboard };
export default Leaderboard;
