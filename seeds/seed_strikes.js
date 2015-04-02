'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('strikes').del(),

        // Inserts seed entries
        knex('strikes').insert({id: 1, url: 'http://www.buzzfeed.com/candicedarden/16-cereal-box-prizes-that-will-take-you-back-to-yo-11x6s#.hdyy7Yq6j'}),
        knex('strikes').insert({id: 2, url: 'http://www.rollingstone.com/culture/features/ringside-at-wrestlemania-we-bought-in-for-better-or-worse-20150330'}),
        knex('strikes').insert({id: 3, url: 'https://www.upworthy.com/his-navajo-clan-is-all-about-water-hes-using-film-to-figure-out-what-that-means?c=hpstream'})
    );
};