"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
          ],
          dest: "docs"
        }]
      }
    },

    clean: {
      build: ["docs"]
    },

    sass: {
      style: {
        files: {
          "docs/css/style.css": "source/sass/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "docs/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "docs/css/style.min.css": ["docs/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
          "docs/img/sprite.svg": ["source/img/icon-*.svg"]
        }
      }
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source/",
          src: ["*.html"],
          dest: "docs"
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "docs/index.html": ["docs/index.html"],
          "docs/gallery.html": ["docs/gallery.html"],
          "docs/form.html": ["docs/form.html"]
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          "docs/js/mobile-nav.min.js": ["source/js/mobile-nav.js"],
          "docs/js/video-player.min.js": ["source/js/video-player.js"],
          "docs/js/gallery.min.js": ["source/js/gallery.js"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q:90
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg}"]
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "docs/*.html",
            "docs/css/*.css",
            "docs/js/*.js"
          ]
        },
        options: {
          server: "docs/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml"]
      },
      style: {
        files: ["source/sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"]
      },
      js: {
        files: ["source/js/*.js"],
        tasks: ["uglify"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "postcss",
    "csso",
    "svgstore",
    "posthtml",
    "htmlmin",
    "uglify"
  ]);
};
