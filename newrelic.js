/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['Clickshame'],
  /**
   * Your New Relic license key.
   */
 rules : {
    ignore : [
      '^\/health'
    ]
  },
  license_key: 'b5ba70c3c0aed01c515632f8208ded43c9dd3598',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
};