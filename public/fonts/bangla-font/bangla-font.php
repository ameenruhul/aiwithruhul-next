<?php
/**
 * Plugin Name:       Bangla Font
 * Plugin URI:        https://wordpress.org/plugins/bangla-font/
 * Description:       You know what? With this plugin installed, the Bengali text on your website will be as clear as the text in a book. The texts of the website will become clear and beautiful. As a result, the content of the website will be neat and clean. Visitors will visit the website with ease.
 * Version:           2.2
 * Stable tag:        2.2
 * Requires at least: 5.2
 * Requires PHP:      5.6
 * Tested up to:      6.9
 * Author:            ThemeForen
 * Author URI:        https://nexgrowix.com/
 * License:           GPL v3 or later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt 
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('BANGLA_FONT_FILE', __FILE__);
define('BANGLA_FONT_URL', plugin_dir_url(__FILE__));

require_once plugin_dir_path(__FILE__) . 'admin/settings.php';

// Function to enqueue the selected font's CSS file
function bangla_fonts_enqueue_style() {
    $selected_font = get_option('bangla_font', 'SolaimanLipi'); // Default font is SolaimanLipi

    // Based on the selected font, enqueue the respective CSS file
    if ($selected_font === 'SolaimanLipi') {
        wp_enqueue_style('bangla-fonts-solaimanlipi', BANGLA_FONT_URL . 'assets/css/solaimanlipi.css');
    } elseif ($selected_font === 'Kalpurush') {
        wp_enqueue_style('bangla-fonts-kalpurush', BANGLA_FONT_URL . 'assets/css/kalpurush.css');
    } elseif ($selected_font === 'Siyam Rupali') {
        wp_enqueue_style('bangla-fonts-siyamrupali', BANGLA_FONT_URL . 'assets/css/siyamrupali.css');
    } elseif ($selected_font === 'AdorshoLipi') {
        wp_enqueue_style('bangla-fonts-adorsholipi', BANGLA_FONT_URL . 'assets/css/adorsholipi.css');
    }
}
add_action('wp_enqueue_scripts', 'bangla_fonts_enqueue_style');
