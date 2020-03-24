import axios from 'axios';

class Leaderboard {
  // Leaderboard.DEFAULT_TIMEOUT = 60000; // 60 Seconds
  // Leaderboard.MIN_TIMEOUT = 1000; // 1 Second

  constructor({onLoad, timeout}) {
    this.data = null;
    this.loading = false;
    this.onLoad = onLoad;
    this.scores = [];
    this.categorized_items_index = {};

    this.load();
    this.interval = setInterval(() => this.load(), this.effectiveTimeout(timeout));
  }

  get category_names() {
    return this._category_names || (
      this._category_names = Object.keys(this.categorized_items_index)
    );
  }

  makeCategorizedItemsIndex(row) {
    return row.reduce((acc, cur, idx) => {
      if (cur) {
        if (!(cur in acc)) {
          acc[cur] = [idx];
        } else {
          acc[cur].push(idx);
        }
      }

      return acc;
    }, {});
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
    const leaderboard = this;

    if (this.loading) {
      return;
    }

    this.loading = true;

    axios
      .get('/.netlify/functions/leaderboard')
      .then(res => {
        this.data = res.data;
        this.categorized_items_index = this.makeCategorizedItemsIndex(this.data.categories);
        this.scores = this.data.scores
          .map(score => new Score({score, leaderboard}))
          .sort((a, b) => a.timestamp - b.timestamp) // sorted by finished time in ascending order
          ;
        this.loading = false;
        this.onLoad(this);
      })
      ;
  }

  rankedScores() {
    return [...this.scores].sort((a, b) => b.total_score - a.total_score)
  }

  mostRecentScore() {
    if (!this.scores.length) {
      return null;
    }

    return this.scores[this.scores.length-1];
  }

  stats() {
    const stats = {
      completed: this.category_names.reduce((acc, cur) => { acc[cur] = 0; return acc; }, {}),
      cumulative: this.category_names.reduce((acc, cur) => { acc[cur] = 0; return acc; }, {}),
    };

    return this.scores.reduce((acc, cur) => {
      this.category_names.forEach(category => {
        acc.cumulative[category] += cur.category_scores[category];
        if (cur.completion.completion[category].completion) {
          acc.completed[category]++;
        }
      })
      return acc;
    }, stats);
  }
}

Leaderboard.DEFAULT_TIMEOUT = 60000; // 60 Seconds
Leaderboard.MIN_TIMEOUT = 1000; // 1 Second

class Score {
  constructor({leaderboard, score}) {
    this.leaderboard = leaderboard;
    this.score = score;
    this.finished = new Date(score[0]);
    this.timestamp = this.finished.getTime();
    this.name = score[1];
    this.total_score = parseInt(score[score.length-2]);
    this.total_percent = parseFloat(score[score.length-1]);
    this.completion = this.makeCompletion();
    this.category_scores = this.makeCategoryScores();
  }

  makeCategoryScores() {
    return Object.entries(this.leaderboard.categorized_items_index)
      .reduce((acc, [category, columns]) => {
        acc[category] = columns.reduce((acc, cur) => acc + this.score[cur], 0);
        return acc;
      }, {});
  }

  makeCompletion() {
    const completion = this.leaderboard.category_names.reduce((acc, cur) => {
      acc[cur] = { items: 0, completed: 0, completion: false };
      return acc;
    }, {});

    for (let [category, columns] of Object.entries(this.leaderboard.categorized_items_index)) {
      columns.forEach(cur => {
        completion[category].items++;
        if (this.score[cur] > 0) {
          completion[category].completed++;
        }
      });
      completion[category].completion = completion[category].items == completion[category].completed;
    }

    const count = Object.entries(completion).reduce((acc, [_category, {completion}]) => {
      return acc + Number(completion);
    }, 0);

    const best = Object.entries(completion).sort((a, b) => {
      return (b[1].completed / b[1].items) - (a[1].completed / a[1].items);
    })[0][0];

    return {best, count, completion};
  }
}

export { Leaderboard };
export default Leaderboard;
