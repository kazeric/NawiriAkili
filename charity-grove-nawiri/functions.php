<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );
         
if ( !function_exists( 'child_theme_configurator_css' ) ):
    function child_theme_configurator_css() {
        wp_enqueue_style( 'chld_thm_cfg_separate', trailingslashit( get_stylesheet_directory_uri() ) . 'ctc-style.css', array( 'fontawesome','animatecss','charity-grove-style','charity-grove-style' ) );
    }
endif;
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );

function nawiri_fonts() {
  wp_enqueue_style('nawiri-fonts',
    'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@300;400;600;700&display=swap',
    array(), null
  );
}
add_action('wp_enqueue_scripts', 'nawiri_fonts');

function nawiri_scripts() {
  $nawiri_js = get_stylesheet_directory() . '/js/nawiri.js';
  wp_enqueue_script('nawiri-animations',
    get_stylesheet_directory_uri() . '/js/nawiri.js',
    array(),
    file_exists( $nawiri_js ) ? filemtime( $nawiri_js ) : wp_get_theme()->get( 'Version' ),
    true
  );
}
add_action('wp_enqueue_scripts', 'nawiri_scripts');

/**
 * Global Nawiri stylesheet (design tokens + shared site-wide styles).
 * Lives in the child theme style.css; loaded after the parent theme stylesheet.
 */
function nawiri_global_styles() {
  $theme_dir = get_stylesheet_directory();
  wp_enqueue_style(
    'nawiri-global',
    get_stylesheet_directory_uri() . '/style.css',
    array( 'charity-grove-style' ),
    file_exists( $theme_dir . '/style.css' ) ? filemtime( $theme_dir . '/style.css' ) : wp_get_theme()->get( 'Version' )
  );
}
add_action( 'wp_enqueue_scripts', 'nawiri_global_styles', 20 );

/**
 * Resolve the current page to a Nawiri page slug used for per-page assets.
 * The static front page maps to "home".
 */
function nawiri_current_page_slug() {
  if ( is_front_page() ) {
    return 'home';
  }
  if ( is_page() ) {
    $queried = get_queried_object();
    if ( $queried instanceof WP_Post ) {
      return $queried->post_name;
    }
  }
  return '';
}

/**
 * Conditionally enqueue per-page CSS/JS based on the page slug.
 * Files live in assets/css/pages/<slug>.css and js/pages/<slug>.js.
 */
function nawiri_page_assets() {
  $slug = nawiri_current_page_slug();
  if ( ! $slug ) {
    return;
  }

  $theme_dir = get_stylesheet_directory();
  $theme_uri = get_stylesheet_directory_uri();
  $version   = wp_get_theme()->get( 'Version' );

  $css_rel = '/assets/css/pages/' . $slug . '.css';
  if ( file_exists( $theme_dir . $css_rel ) ) {
    wp_enqueue_style(
      'nawiri-page-' . $slug,
      $theme_uri . $css_rel,
      array( 'nawiri-global' ),
      filemtime( $theme_dir . $css_rel )
    );
  }

  $js_rel = '/js/pages/' . $slug . '.js';
  if ( file_exists( $theme_dir . $js_rel ) ) {
    wp_enqueue_script(
      'nawiri-page-' . $slug,
      $theme_uri . $js_rel,
      array( 'nawiri-animations' ),
      file_exists( $theme_dir . $js_rel ) ? filemtime( $theme_dir . $js_rel ) : $version,
      true
    );
  }
}
add_action( 'wp_enqueue_scripts', 'nawiri_page_assets', 30 );

/**
 * Load the global Nawiri stylesheet inside the block editor so patterns and
 * blocks preview with the correct tokens, typography, and layout.
 */
function nawiri_editor_styles() {
  add_theme_support( 'editor-styles' );
  add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'nawiri_editor_styles' );

// END ENQUEUE PARENT ACTION
