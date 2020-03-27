import axios from 'axios';

class Leaderboard {
  constructor({onLoad, timeout}) {
    this.onLoad = onLoad;
    this.timeout = this.effectiveTimeout(timeout);

    this.categorized_items_index = {};
    this.data = null;
    this.interval = null;
    this.loading = false;
    this.scores = [];

    this.start()
  }

  /**
   * Getter for Category Names
   *
   * @returns {string[]}
   */
  get category_names() {
    return this._category_names || (
      this._category_names = Object.keys(this.categorized_items_index)
    );
  }

  /**
   * Start the leaderboard
   *
   * - Stops any existing load interval
   * - Runs initial load
   * - Starts auto-refresh load interval
   */
  start() {
    this.stop();
    this.load();
    this.interval = setInterval(() => this.load(), this.timeout);
  }

  /**
   * Stop the leaderboard
   */
  stop() {
    clearInterval(this.interval);
  }

  /**
   * Make a categorized items index from the categories row
   *
   * This is useful for when we want to know what category an item belongs to.
   *
   * @param {string[]} categories There is a row in the sheet that declares the category for that column
   */
  makeCategorizedItemsIndex(categories) {
    return categories.reduce((acc, cur, idx) => {
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
   *
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
        this.categorized_items_index = this.makeCategorizedItemsIndex(this.data.categories);
        this.scores = this.data.scores
          .map(score => new Score({score, leaderboard: this}))
          .sort((a, b) => b.timestamp - a.timestamp) // sorted by finished time in descending order (most recent finisher wins)
          ;
        this.loading = false;
        this.onLoad(this);
      })
      ;
  }

  /**
   * Scores ranked by total score
   *
   * @returns {Score[]}
   */
  rankedScores() {
    return [...this.scores].sort((a, b) => b.total_score - a.total_score)
  }

  /**
   * The most recently completed hunt
   *
   * @returns {Score|null}
   */
  mostRecentScore() {
    return this.scores.length ? this.scores[0] : null;
  }

  /**
   * Statistics
   * - Completed: Number of times a category had full completion
   * - Cumulative: Sum of all scores for each category
   *
   * @returns {{completed: Object.<string, number>, cumulative: Object.<string, number>}}
   */
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

  /**
   * Scores for each category
   *
   * @returns {Object.<string, number>}
   */
  makeCategoryScores() {
    return Object.entries(this.leaderboard.categorized_items_index)
      .reduce((acc, [category, columns]) => {
        acc[category] = columns.reduce((acc, cur) => acc + this.score[cur], 0);
        return acc;
      }, {});
  }

  /**
   * Make a completion object to represent completion of each category
   *
   * @returns {{best, count: number, completion}}
   */
  makeCompletion() {
    /** @constant {Object.<string, >} completion  */
    const completion = this.leaderboard.category_names.reduce((acc, cur) => {
      acc[cur] = { items: 0, completed: 0, completion: false };
      return acc;
    }, {});

    // Set the completion flag for each category.
    // - Do not include bonus point items
    for (let [category, columns] of Object.entries(this.leaderboard.categorized_items_index)) {
      columns
        .filter(cur => !Boolean(this.leaderboard.data.columns[cur].match(/bonus/i)))
        .forEach(cur => {
          completion[category].items++;
          if (this.score[cur] > 0) {
            completion[category].completed++;
          }
        });
      completion[category].completion = completion[category].items == completion[category].completed;
    }

    /** @constant {number} count The count of completed categories */
    const count = Object.entries(completion).reduce((acc, [_category, {completion}]) => {
      return acc + Number(completion);
    }, 0);

    /**
     * Sort categorized completion by completed ratio
     *
     * @param {[string, {completed: number, items: number}]} sort_a
     * @param {[string, {completed: number, items: number}]} sort_b
     */
    function completionSorter([_a_category, a], [_b_category, b]) {
      return (b.completed / b.items) - (a.completed / a.items);
    }

    /** @constant {string|null} best The category with the highest completion ratio */
    const best = !completion.length ? null : Object.entries(completion).sort(completionSorter)[0][0];
    // - first [0] is guarded by !completion.length
    // - second [0] is the object key from Object.entries

    return {best, count, completion};
  }
}

export { Leaderboard, Score };
export default Leaderboard;
