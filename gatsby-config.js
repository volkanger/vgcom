const contentful = require('contentful');
const manifestConfig = require('./manifest-config');
require('dotenv').config();

const { ACCESS_TOKEN, SPACE_ID, ANALYTICS_ID, DETERMINISTIC, GTM_ID } = process.env;

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const getAboutEntry = entry => entry.sys.contentType.sys.id === 'about';

const plugins = [
  'gatsby-plugin-react-helmet',

  //added for additional pages. source: https://www.gatsbyjs.org/packages/gatsby-plugin-routes/?=route
  {
    resolve: `gatsby-plugin-routes`,
    options: {
      // this is the path to your routes configuration file
      path: `${__dirname}/src/routes.js`,
    },
  },


  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: ['Cabin', 'Open Sans'],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: manifestConfig,
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    },
  },
  'gatsby-transformer-remark',
  'gatsby-plugin-offline',
];

module.exports = client.getEntries().then(entries => {
  const { mediumUser } = entries.items.find(getAboutEntry).fields;

  plugins.push({
    resolve: 'gatsby-source-medium',
    options: {
      username: mediumUser || '@medium',
    },
  });

  if (ANALYTICS_ID) {
    plugins.push({
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: ANALYTICS_ID,
      },
    });
  }

  if (GTM_ID) {
    plugins.push({
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: GTM_ID,
        // DETAILS ON: https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/


        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
  
        // Specify optional GTM environment details.
        //gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        //gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        //dataLayerName: "YOUR_DATA_LAYER_NAME",
      },


    })
  }

  return {
    siteMetadata: {
      isMediumUserDefined: !!mediumUser,
      deterministicBehaviour: !!DETERMINISTIC,
    },
    plugins,
  };
});
