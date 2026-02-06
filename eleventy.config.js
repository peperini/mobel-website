// Essential module imports for the configuration
import path from 'path'
import htmlmin from 'html-minifier'
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'
import pugPlugin from '@11ty/eleventy-plugin-pug'
import { VitePWA } from 'vite-plugin-pwa'
import glslifyPlugin from 'vite-plugin-glslify'

export default async function (eleventyConfig) {
  // Configuring the Eleventy server to run on port 3000
  eleventyConfig.setServerOptions({
    port: 3000,
    showAllHosts: true,
  })
  // Integrate Pug with 11ty using the 11ty Pug Plugin (Pug was moved out of Eleventy core in v3)
  eleventyConfig.addPlugin(pugPlugin);
  // Integrate Vite with 11ty using the 11ty Vite Plugin
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    // Specify the directory where Vite-specific temporary files will be stored
    tempFolderName: '.11ty-vite',
    // Options tailored for the Vite build tool
    viteOptions: {
      // Directory to serve static assets from
      publicDir: 'public',
      // Set the root directory for Vite
      root: 'src',
      // List of Vite plugins to use
      plugins: [
        // PWA (Progressive Web App) settings using VitePWA plugin
        VitePWA({
          injectRegister: 'script',
          registerType: 'autoUpdate',
          includeAssets: [],
          workbox: {
            globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff,woff2}'],
          },
        }),
        // GLSL (OpenGL Shading Language) support using glslifyPlugin
        glslifyPlugin(),
      ],

      // Module resolve options
      resolve: {
        // Create alias for directories, simplifying import paths
        alias: {
          '@styles': path.resolve('.', 'src', 'styles'),
          '@app': path.resolve('.', 'src', 'app'),
          '@utils': path.resolve('.', 'src', 'app', 'utils'),
          '@components': path.resolve('.', 'src', 'app', 'components'),
          '@shaders': path.resolve('.', 'src', 'app', 'shaders'),
          '@classes': path.resolve('.', 'src', 'app', 'classes'),
          '@animations': path.resolve('.', 'src', 'app', 'animations'),
          '@pages': path.resolve('.', 'src', 'app', 'pages'),
          '@canvas': path.resolve('.', 'src', 'app', 'components', 'Canvas'),
        },
      },
    },
  });

  // Specify directories and files that should bypass Eleventy's processing and be copied "as-is"
  eleventyConfig.addPassthroughCopy('public');
  eleventyConfig.addPassthroughCopy('src/app');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/styles');
  eleventyConfig.setServerPassthroughCopyBehavior('copy');

  // Minify HTML files before writing to the output directory
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Define input and output directories for Eleventy, set passthrough copy, and set template engine to Pug
  return {
    dir: {
      input: 'src/views',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'pug',
  };
};
